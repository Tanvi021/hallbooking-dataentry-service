# Hall Booking Management System

## Overview

This project is a comprehensive Hall Booking Management System developed using ReactJS (frontend) and Spring Boot (backend) with a PostgreSQL database. It supports the creation, management, and deletion of hall bookings with a clean and interactive UI.

## Features

- Add new bookings.
- Update existing bookings.
- Delete bookings.
- View all bookings in a structured tabular format.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v10.9.0 or higher)
- **Java** (v17 or higher)
- **PostgreSQL**
- **Git**

## Getting Started

Follow these steps to set up and run the project:

### 1. Backend Setup

#### Clone the repository:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

#### Navigate to the backend folder:
```bash
cd backend
```

#### Create a configuration file for database credentials:

**File Path:** `external-config/application.properties`

**Example content:**
```
spring.datasource.url=jdbc:postgresql://localhost:5432/hall_booking
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

> Ensure this file is outside the source directory to avoid committing sensitive information.

#### Build the backend project:
```bash
mvn clean install
```

#### Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend will start on [http://localhost:8085](http://localhost:8085).

### 2. Frontend Setup

#### Navigate to the frontend folder:
```bash
cd frontend
```

#### Install the dependencies:
```bash
npm install
```

#### Configure the API base URL:

Open `frontend/src/services/api.js` and replace the API_BASE_URL with:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8085';
```

#### Add a `.env` file in the root directory of the frontend folder:
```
REACT_APP_API_BASE_URL=http://localhost:8085
```

#### Start the frontend:
```bash
npm run dev
```

The frontend will start on [http://localhost:5173](http://localhost:5173).

## Deployment

For deployment:

- Ensure `.env` files are configured with production server URLs and credentials.
- Use containerization tools like Docker for seamless deployment.

## Security Best Practices

### Avoid Hardcoding Sensitive Information:

Store sensitive data (e.g., database credentials, URLs) in `.env` files or external configuration files.

> Example: Database credentials are stored in `external-config/application.properties`.

### Environment-Specific Configuration:

Manage configurations for development, staging, and production using environment variables.

## Video Explanation

A detailed walkthrough of the project setup and functionality can be found here.

[Watch Video](https://drive.google.com/file/d/18yXI50Af6sXcGRbq7tn9wDVBlF17N35Q/view?usp=drive_link)
---

Feel free to replace placeholders (like `your-username`, `your-repo-name`, or `http://localhost:8085`) with your actual repository details and configuration.
