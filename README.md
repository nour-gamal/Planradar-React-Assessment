# Ticket Management System

## Overview

The Ticket Management System is a web application designed to manage and track support tickets efficiently. It provides functionalities to generate, display, and search tickets, making it easier for users to keep track of issues and inquiries.

### Features

- **Dynamic Ticket Generation**: Generate tickets with random priorities, statuses, and descriptions.
- **Search Functionality**: Search for tickets based on subject, priority, and status.
- **Responsive Design**: The application is built with a responsive layout to ensure usability on various devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Jest**: A testing framework for JavaScript to ensure code quality.
- **@testing-library/react**: A testing utility for React applications.

## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nour-gamal/Planradar-React-Assessment.git
   cd Planradar-React-Assessment
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   or if you prefer yarn:

   ```bash
   yarn install
   ```

### Running the Application

To start the development server, run:

```bash
npm start
```

or for yarn:

```bash
yarn start
```

This will start the application on [http://localhost:3000](http://localhost:3000).

### Running Tests

To run the test suite, use:

```bash
npm test
```

or for yarn:

```bash
yarn test
```

This command will run all the tests in the project, including unit tests for the ticket generation and search functionalities.

## Usage

1. **Viewing Tickets**: The main page displays a list of generated tickets in a table format.
2. **Searching Tickets**: Use the search input to filter tickets by subject, priority, or status. The table will update dynamically as you type.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/YourFeature`.
3. **Make your changes** and commit them: `git commit -m 'Add some feature'`.
4. **Push to the branch**: `git push origin feature/YourFeature`.
5. **Create a Pull Request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors and the open-source community for their support and resources.
