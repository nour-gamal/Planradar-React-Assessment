import "./App.css";
import TicketList from "./components/TicketList/TicketList";
import { generateTickets } from "./helpers/generateTickets";

function App() {
	const tickets = generateTickets(10000); // Generate 10,000 tickets
	return (
		<div className="App">
			<h1 className="main-header">PlanRadar Ticket List</h1>
			<TicketList tickets={tickets} />
		</div>
	);
}

export default App;
