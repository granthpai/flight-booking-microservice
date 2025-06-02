# Flight Booking Microservices System

A distributed microservices-based flight booking system built with Node.js, Express, and MySQL. This project consists of two main microservices:

## Overview

### Flight Service
- Manages flight inventory and seat availability
- Real-time seat management and booking validation
- RESTful API endpoints for flight operations
- Database-driven seat allocation system

### Booking Service
- Handles flight bookings and reservations
- Payment processing integration
- RabbitMQ-based notification system
- Automatic booking cancellation for expired reservations
- Cron job for periodic maintenance

## Tech Stack

- Node.js
- Express.js
- MySQL/MariaDB
- RabbitMQ
- Sequelize ORM
- Winston logging
- Nodemon for development

## Key Features

- Distributed architecture with independent services
- Real-time seat availability updates
- Automated booking management
- Asynchronous notification system
- Robust error handling and logging
- API versioning and documentation

## Getting Started

1. Clone the repository
2. Set up environment variables
3. Initialize and migrate databases
4. Start RabbitMQ server
5. Run services in development mode

## Documentation

- [Flight Service Documentation](flight-service/README.md)
- [Booking Service Documentation](booking-service/README.md)

## License

ISC License
