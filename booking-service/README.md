# Booking Service Microservice

A microservice for managing flight bookings and reservations in a booking system.

## Project Structure

The project follows a modular architecture with the following main directories:

- `config/` - Configuration files and environment setup
- `routes/` - API route definitions
- `controllers/` - Request handling and business logic
- `models/` - Database models and schemas
- `repositories/` - Data access layer
- `services/` - Business logic layer
- `middlewares/` - Request processing middleware
- `utils/` - Helper functions and utilities

## Prerequisites

- Node.js (v14 or higher)
- MySQL/MariaDB
- npm or yarn
- RabbitMQ (for notifications)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
PORT=4000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=booking_db
FLIGHT_SERVICE=http://localhost:3000
RABBITMQ_URL=amqp://localhost:5672
```

3. Initialize the database configuration:
```bash
cd src
npx sequelize init
```

4. Run migrations:
```bash
npx sequelize db:migrate
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Booking Management
- POST `/api/v1/bookings` - Create a new booking
- GET `/api/v1/bookings/:id` - Get booking details
- POST `/api/v1/bookings/payment` - Process booking payment
- DELETE `/api/v1/bookings/:id` - Cancel booking

### Notification Integration
- RabbitMQ integration for sending booking confirmation emails
- Automatic booking cancellation for expired bookings

## Environment Variables

The following environment variables are required:

- `PORT` - Application port
- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `FLIGHT_SERVICE` - URL of the flight service
- `RABBITMQ_URL` - RabbitMQ connection URL

## Development

The service uses nodemon for development, which automatically restarts the server on file changes.

## Error Handling

The service implements a comprehensive error handling system that returns appropriate HTTP status codes and error messages.

## Logging

All important operations are logged using Winston for better debugging and monitoring.

## Security

- Input validation using middleware
- SQL injection prevention
- Error message sanitization


## Integration Points

- Flight Service - For flight availability and seat management
- RabbitMQ - For asynchronous notifications and email sending

## Cron Jobs

- Automatic cancellation of expired bookings (after 5 minutes)
- Periodic health checks
- Database cleanup