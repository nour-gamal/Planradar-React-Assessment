export interface Ticket {
	id: number;
	subject: string;
	priority: "Low" | "Medium" | "High";
	status: "Open" | "In Progress" | "Closed";
	description: "Issue about... " | "Inquiry for..." | "Requesting a help to...";
}
