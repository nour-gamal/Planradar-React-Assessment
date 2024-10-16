// src/utils/__tests__/generateTickets.test.ts
import { generateTickets } from "../generateTickets";

describe("generateTickets", () => {
	test("should return the correct number of tickets", () => {
		const count = 5;
		const tickets = generateTickets(count);

		expect(tickets).toHaveLength(count); // Check length
	});

	test("should generate tickets with correct structure", () => {
		const count = 3;
		const tickets = generateTickets(count);

		tickets.forEach((ticket) => {
			expect(ticket).toHaveProperty("id");
			expect(ticket).toHaveProperty("subject");
			expect(ticket).toHaveProperty("priority");
			expect(ticket).toHaveProperty("status");
			expect(ticket).toHaveProperty("description");
		});
	});

	test("should have priority as one of Low, Medium, or High", () => {
		const count = 10;
		const tickets = generateTickets(count);

		tickets.forEach((ticket) => {
			expect(["Low", "Medium", "High"]).toContain(ticket.priority);
		});
	});

	test("should have status as one of Open, In Progress, or Closed", () => {
		const count = 10;
		const tickets = generateTickets(count);

		tickets.forEach((ticket) => {
			expect(["Open", "In Progress", "Closed"]).toContain(ticket.status);
		});
	});

	test("should have description that matches defined options", () => {
		const count = 5;
		const tickets = generateTickets(count);
		const expectedDescriptions = [
			"Issue about... ",
			"Inquiry for...",
			"Requesting a help to...",
		];

		tickets.forEach((ticket) => {
			expect(expectedDescriptions).toContain(ticket.description);
		});
	});
});
