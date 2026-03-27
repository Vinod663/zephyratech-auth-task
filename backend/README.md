# ZephyraTech API — Backend

The robust, enterprise-grade backend infrastructure for the ZephyraTech Authentication system. Built with the bleeding-edge **Spring Boot 4.0** and **Java 21**, this RESTful API handles stateless JWT authentication, secure password hashing, and structured error handling.

---

## Overview

This API serves as the secure gatekeeper for the application. It utilizes the MVC architecture and Spring Security filter chains to ensure endpoints are completely protected.

---

## Features

**Stateless Authentication**  
Implements a custom `JwtAuthenticationFilter` to intercept, validate, and authorize requests using JSON Web Tokens.

**Strict Input Validation**  
Utilizes Jakarta Validation constraints (`@Pattern`, `@Email`) to ensure data integrity before it reaches the database.

**Global Exception Handling**  
Replaces standard Tomcat HTML error pages with a `@RestControllerAdvice` class that returns clean, structured JSON maps for all validation and HTTP errors.

**Native Environment Injection**  
Utilizes Spring Boot's native `classpath:env.properties` configuration for robust, monorepo-friendly secret management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Java 21 |
| Framework | Spring Boot 4.0.5 |
| Security | Spring Security 7, JJWT, BCrypt |
| Database | MySQL 8.0 & Spring Data JPA (Hibernate) |
| Build Tool | Maven |

---

## Prerequisites

- Java Development Kit (JDK) 21
- A local instance of MySQL running on port `3306`

---

## Environment Configuration

Secrets (like the database password and JWT signing key) are loaded securely from the classpath. Ensure your `src/main/resources/env.properties` is configured correctly:
```properties
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_secure_64_character_hex_string
JWT_EXPIRATION=86400000
```

---

## Getting Started

**1. Navigate to the backend directory**
```bash
  cd backend
```

**2. Run the Spring Boot server**

Using the Maven Wrapper:
```bash
  ./mvnw spring-boot:run
```

> **Windows users:** Use `mvnw.cmd spring-boot:run`

**3. Database Initialization**

The application is configured with `createDatabaseIfNotExist=true` and `ddl-auto: update`. Upon startup, it will automatically connect to MySQL, create the `zephyratech_auth` schema, and generate the `users` table.

---

## Core API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Registers a new user, hashes password, returns JWT. | No |
| `POST` | `/api/auth/login` | Authenticates existing user, returns JWT. | No |

---

## API Testing

A complete Postman Collection is included for detailed endpoint testing and payload inspection.
You can find it at: `/docs/ZephyraTech_Auth_API.postman_collection.json`

---

*Built as part of the ZephyraTech Authentication Task.*