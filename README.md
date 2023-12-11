# Distributed Weather App

This repository contains a distributed weather app built with microservices architecture. The app includes components for weather checking, email sending, and main app orchestration using RabbitMQ for communication.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your local machine.
- [RabbitMQ](https://www.rabbitmq.com/download.html) installed and running locally.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/charlesnnanna/distributed-weather-app.git
cd distributed-weather-app

```

### 2. Ensure your RabbitMQ server is running

### 3. Install dependencies

```bash
# Install dependencies for main app
cd main-app
npm install

# Install dependencies for weather checker
cd ../weather-checker
npm install

# Install dependencies for email sender
cd ../email-sender
npm install
```

### 4. Start Applications

```bash
# Start main app
cd ../main-app
npm start

# Start weather checker
cd ../weather-checker
npm start

# Start email sender
cd ../email-sender
npm start
```

### 5. Access App

The app runs on your terminal.

### 6. Unit Tests

```bash
# Run unit tests for weather checker
cd ../weather-checker
npm test

# Run unit tests for email sender
# Press a to run all tests on Windows OS
cd ../email-sender
npm test
```

```

```
