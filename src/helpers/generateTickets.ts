import { Ticket } from "../interfaces";

export const generateTickets = (count: number): Ticket[] => {
	const priorities = ["Low", "Medium", "High"] as const;
	const statuses = ["Open", "In Progress", "Closed"] as const;
	const descriptions = [
		"Issue about... ",
		"Inquiry for...",
		"Requesting a help to...",
	] as const;

	return Array.from({ length: count }, (_, id) => ({
		id,
		subject: `Ticket #${id + 1}`,
		priority: priorities[Math.floor(Math.random() * priorities.length)],
		status: statuses[Math.floor(Math.random() * statuses.length)],
		description: descriptions[Math.floor(Math.random() * descriptions.length)],
	}));
};
