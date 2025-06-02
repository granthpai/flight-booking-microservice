# Flight Service Microservice

A microservice for managing flight-related operations in a booking system.

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

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=flight_db
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

### Flight Management
- GET `/api/v1/flights` - List all flights
- GET `/api/v1/flights/:id` - Get flight details
- POST `/api/v1/flights` - Create a new flight
- PUT `/api/v1/flights/:id` - Update flight details
- DELETE `/api/v1/flights/:id` - Delete a flight

### Seat Management
- GET `/api/v1/flights/:id/seats` - Get available seats
- PATCH `/api/v1/flights/:id/seats` - Update seat availability

## Environment Variables

The following environment variables are required:

- `PORT` - Application port
- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name

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
