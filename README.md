# WHOIS Information Fetcher

This is a full-stack application built with React and Express.js that fetches WHOIS information and displays it on a React web application.

## Project Structure

```
root project repo folder
│
├── client
│   └── [React Application Files]
│
└── server
    └── [Express.js Server Files]
```

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- npm (comes with Node.js)
- nodemon (npm install -g nodemon)
- [Git](https://git-scm.com/downloads)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jam-magsuci/whois-react-express.git
   cd whois-react-express
   ```

2. **Install dependencies:**

   - Navigate to the `client` folder and install dependencies:

     ```bash
     cd client
     npm install
     ```

   - Navigate to the `server` folder and install dependencies:

     ```bash
     cd ../server
     npm install
     ```

3. **Start the application:**

   - From the `server` folder, run the application using the `concurrently` package:

     ```bash
     npm start
     ```

   This command will start both the Express server and the React client at the same time.

4. **Access the application:**

   - API URL: `http://localhost:8080`
   - React App URL: `http://localhost:5000`
