**Hall Booking Management System**
**Overview**
This is a full-stack Hall Booking Management System developed using ReactJS (frontend) and Spring Boot (backend) with a PostgreSQL database. The system supports creating, reading, updating, and deleting (CRUD) bookings for halls.


**Features**
Add new bookings.
Update existing bookings.
Delete bookings.
View all bookings in a tabular format.


**Prerequisites**
Before you proceed, ensure you have the following installed on your system:

Node.js (v10.9.0 or higher)
Java (v17 or higher)
PostgreSQL
Git


**How to Run the Project**
**Backend Setup**
**Clone the repository:**
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

**Navigate to the backend folder:**
cd backend

**Create a configuration file for database credentials:**
Configuration File: external-config/application.properties
Example content:
spring.datasource.url=jdbc:postgresql://localhost:5432/hall_booking
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

Ensure this file is outside the source directory to avoid committing it to the repository.


**Build the backend project:**
mvn clean install

**Run the Spring Boot application:**
mvn spring-boot:run
The backend will start on http://localhost:8085.


**Frontend Setup**
**Navigate to the frontend folder:**
cd frontend

**Install the dependencies:**
npm install

**Update the API base URL:**
Open frontend/src/services/api.js.

**Replace the API_BASE_URL with:**
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8085';

**Add a .env file in the root directory of the frontend folder:**
REACT_APP_API_BASE_URL=http://localhost:8085

**Start the frontend:**
npm run dev
The frontend will start on http://localhost:5173.


**Deployment**
**For deployment:**
Ensure the .env files are configured for production servers.
Use tools like Docker for containerization and deploying both frontend and backend.
Security Best Practices

**Avoid Hardcoding Credentials:**
Ensure all sensitive information like URLs, database credentials, and access keys are stored in .env files or external configuration files.
Example: The database credentials are stored in external-config/application.properties, not in the source files.

**Environment-Specific Configuration:**
Use environment variables to manage configurations for development, staging, and production environments.

**Video Explanation**
A detailed walkthrough of the project setup and functionality can be found here.
