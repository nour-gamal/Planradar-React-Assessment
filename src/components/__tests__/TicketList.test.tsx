// src/components/__tests__/TicketList.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TicketList from "../TicketList/TicketList";
import * as ticketHelper from "../../helpers/generateTickets"; // Import the entire module

jest.mock("../../helpers/generateTickets"); // Automatically mocks the module

describe("TicketList Component", () => {
	beforeEach(() => {
		// Reset the mock before each test
		jest.clearAllMocks();
		(ticketHelper.generateTickets as jest.Mock).mockImplementation(() => [
			{ id: 1, subject: "Ticket #1", priority: "Low", status: "Open" },
			{
				id: 2,
				subject: "Ticket #2",
				priority: "Medium",
				status: "In Progress",
			},
			{ id: 3, subject: "Ticket #3", priority: "High", status: "Closed" },
		]);
	});

	test("renders the ticket list with the correct number of rows", () => {
		const tickets = ticketHelper.generateTickets(3); // Call the mocked function

		render(<TicketList tickets={tickets} />);

		// Ensure the header is rendered
		expect(screen.getByText(/Subject/i)).toBeInTheDocument();
		expect(screen.getByText(/Priority/i)).toBeInTheDocument();
		expect(screen.getByText(/Status/i)).toBeInTheDocument();
		expect(screen.getByText(/Desciption/i)).toBeInTheDocument();

		// Check that the correct number of rows are rendered
		const rows = screen.getAllByRole("row");
		expect(rows.length).toBe(6); // 5 visible rows + 1 header row
	});

	test("displays correct ticket data in rows", () => {
		const tickets = ticketHelper.generateTickets(3);
		render(<TicketList tickets={tickets} />);

		// Check specific ticket rows
		expect(screen.getByText("Ticket #1")).toBeInTheDocument();
		expect(screen.getByText("Medium")).toBeInTheDocument();
		expect(screen.getByText("Open")).toBeInTheDocument();

		expect(screen.getByText("Ticket #3")).toBeInTheDocument();
		expect(screen.getByText("Medium")).toBeInTheDocument();
		expect(screen.getByText("Closed")).toBeInTheDocument();
	});

	test("filters tickets based on single search input", () => {
		const tickets = ticketHelper.generateTickets(3);

		render(<TicketList tickets={tickets} />);

		// Initially, all tickets should be visible
		expect(screen.getByText("Ticket #1")).toBeInTheDocument();
		expect(screen.getByText("Ticket #2")).toBeInTheDocument();

		// Enter search term
		fireEvent.change(screen.getByPlaceholderText(/Search Tickets/i), {
			target: { value: "Ticket #1" },
		});

		// Only Ticket #1 should be visible
		expect(screen.getByText("Ticket #1")).toBeInTheDocument();
		expect(screen.queryByText("Ticket #2")).not.toBeInTheDocument();

		// Clear search term
		fireEvent.change(screen.getByPlaceholderText(/Search Tickets/i), {
			target: { value: "" },
		});

		// All tickets should be visible again
		expect(screen.getByText("Ticket #1")).toBeInTheDocument();
		expect(screen.getByText("Ticket #2")).toBeInTheDocument();
	});

	test("handles scrolling correctly", () => {
		const tickets = ticketHelper.generateTickets(3);

		const { container } = render(<TicketList tickets={tickets} />);
		const tableContainer = container.querySelector(".table-container");

		// Simulate scroll
		if (tableContainer) {
			fireEvent.scroll(tableContainer, { target: { scrollTop: 80 } }); // Scroll down to show rows 3-3

			// Check that new tickets are rendered
			expect(screen.getByText("Ticket #3")).toBeInTheDocument();
			expect(screen.getByText("Ticket #2")).toBeInTheDocument();
			expect(screen.queryByText("Ticket #1")).not.toBeInTheDocument(); // Ticket #1 should not be visible anymore
		}
	});
	test("search functionality filters tickets correctly", () => {
		const tickets = ticketHelper.generateTickets(3);

		render(<TicketList tickets={tickets} />);

		// Search for 'Ticket #1'
		fireEvent.change(screen.getByPlaceholderText(/Search tickets.../i), {
			target: { value: "Ticket #1" },
		});

		// Expect only the first ticket to be displayed
		expect(screen.getByText("Ticket #1")).toBeInTheDocument();
		expect(screen.queryByText("Ticket #2")).not.toBeInTheDocument();
		expect(screen.queryByText("Ticket #3")).not.toBeInTheDocument();
	});

	test("search functionality updates ticket list on input change", () => {
		const tickets = ticketHelper.generateTickets(3);

		render(<TicketList tickets={tickets} />);

		// Search for 'Low'
		fireEvent.change(screen.getByPlaceholderText(/Search tickets.../i), {
			target: { value: "Low" },
		});

		// Expect the ticket with 'Low' priority to be displayed
		expect(screen.getByText("Ticket #1")).toBeInTheDocument();
		expect(screen.queryByText("Ticket #2")).not.toBeInTheDocument();
		expect(screen.queryByText("Ticket #3")).not.toBeInTheDocument();

		// Clear the search input
		fireEvent.change(screen.getByPlaceholderText(/Search tickets.../i), {
			target: { value: "" },
		});

		// Expect all tickets to be displayed again
		expect(screen.getByText("Ticket #1")).toBeInTheDocument();
		expect(screen.getByText("Ticket #2")).toBeInTheDocument();
		expect(screen.getByText("Ticket #3")).toBeInTheDocument();
	});
	test('displays "No data found" when no tickets are available', () => {
		const tickets: [] = []; // No tickets available
		render(<TicketList tickets={tickets} />);

		// Check if "No data found" message is displayed
		expect(screen.getByText(/no data found/i)).toBeInTheDocument();
	});
});
