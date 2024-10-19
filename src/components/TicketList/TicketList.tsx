import { useCallback, useEffect, useRef, useState } from "react";
import { Ticket } from "../../interfaces";
import "./TicketList.css";

const ROW_HEIGHT = 50; // Height of each row in pixels
const VISIBLE_ROWS = 20; // Number of rows to render at once

function TicketList({ tickets }: { tickets: Ticket[] }) {
	const [scrollTop, setScrollTop] = useState(0); // Track the scroll position
	const [searchValue, setSearchValue] = useState(""); // Single search input

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value.toLowerCase());
	};

	// Filter tickets based on search value across all columns
	const filteredTickets = tickets.filter((ticket) => {
		return (
			String(ticket.id).toLowerCase().includes(searchValue) ||
			ticket.subject.toLowerCase().includes(searchValue) ||
			ticket.priority.toLowerCase().includes(searchValue) ||
			ticket.status.toLowerCase().includes(searchValue)
		);
	});
	const containerRef = useRef<HTMLDivElement>(null); // Reference to the scroll container

	const totalHeight = tickets.length * ROW_HEIGHT; // Total height of the table rows

	// Calculate the first and last visible row based on the scroll position
	const startIdx = Math.floor(scrollTop / ROW_HEIGHT); // Determine the first visible row
	const endIdx = Math.min(startIdx + VISIBLE_ROWS, tickets.length); // Determine the last visible row

	// Get the visible tickets based on scroll position
	const visibleTickets = filteredTickets.slice(startIdx, endIdx);

	// Scroll handler to update the scrollTop state
	const handleScroll = useCallback(() => {
		if (containerRef.current) {
			setScrollTop(containerRef.current.scrollTop);
		}
	}, []);

	// Attach scroll event listener to the container
	useEffect(() => {
		const container = containerRef.current;
		if (container) container.addEventListener("scroll", handleScroll);

		return () => container?.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);
	return (
		<div
			className="ticket-table-container"
			ref={containerRef}
			style={{ height: "500px", overflowY: "auto" }}>
			<div className="search-container">
				<input
					type="text"
					id="search-input"
					placeholder="Search Tickets..."
					value={searchValue}
					onChange={handleSearchChange}
				/>
			</div>

			{visibleTickets?.length ? (
				<table className="ticket-table" style={{ height: totalHeight }}>
					<thead>
						<tr>
							<th>Subject</th>
							<th>Status</th>
							<th>Priority</th>
							<th>Desciption</th>
						</tr>
					</thead>
					<tbody>
						{/* Spacer row at the top to maintain the scroll height */}
						<tr style={{ height: startIdx * ROW_HEIGHT }} />

						{/* Render the visible tickets */}
						{visibleTickets.map((ticket) => (
							<tr key={ticket.id} style={{ height: ROW_HEIGHT }}>
								<td>{ticket.subject}</td>
								<td>{ticket.status}</td>
								<td>{ticket.priority}</td>
								<td>{ticket.description}</td>
							</tr>
						))}

						{/* Spacer row at the bottom to maintain the scroll height */}
						<tr style={{ height: (tickets.length - endIdx) * ROW_HEIGHT }} />
					</tbody>
				</table>
			) : (
				<h2 className="no-data-found">No Data Found</h2>
			)}
		</div>
	);
}

export default TicketList;
