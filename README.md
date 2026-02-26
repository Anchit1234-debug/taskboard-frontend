# TaskBoard Frontend

React frontend application for the TaskBoard microservice.

## Features

- Health check status display
- Real-time service status monitoring
- Responsive design with gradient UI

## Prerequisites

- Node.js 14+ and npm

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Configuration

The frontend is configured to proxy requests to the backend service running on `http://localhost:8080`. This is set in the `proxy` field in `package.json`.

## How to Use

1. Ensure the TaskBoard backend service is running on `http://localhost:8080`
2. Start the frontend: `npm start`
3. The app will automatically check the service health
4. Click "Check Status" button to manually refresh the status
