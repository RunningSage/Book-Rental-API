# Book Rental API

Welcome to the Book Rental API documentation. This API allows users to manage a book rental system, including functionalities for book management, user management, and transaction tracking.

## Table of Contents

1. [Deployment](#deployment)
2. [Postman Documentation](#postman-documentation)
3. [Project Overview](#project-overview)
4. [Features](#features)
5. [Technology Stack](#technology-stack)
6. [Dependencies](#dependencies)
7. [Installation](#installation)
8. [Usage](#usage)
9. [API Endpoints](#api-endpoints)
10. [Authentication](#authentication)

## Deployment

The application is deployed on Render.com. You can access the hosted API at:

- [Book Rental API](https://book-rental-api.onrender.com/)

## Postman Documentation  

To test the API, you can use the Postman documentation provided:

- [Postman API Documentation](https://documenter.getpostman.com/view/38127552/2sAXqmAkTa)

## Project Overview

The Book Rental API is a RESTful API built with Node.js, Express, and MongoDB. It provides a comprehensive solution for managing book rentals, including user and book management, transaction tracking, and role-based access control.

## Features

- **User Management**: 
  - **Create**: Add new users to the system (Admin only).
  - **Read**: Fetch details of users (Admin only) and the currently logged-in user.
  - **Update**: Modify user details (Admin only).
  - **Delete**: Remove users from the system (Admin only).

- **Book Management**: 
  - **Create**: Add new books to the catalog (Admin only).
  - **Read**: Fetch details of books and list all books.
  - **Update**: Modify book details (Admin only).
  - **Delete**: Remove books from the catalog (Admin only).

- **Transaction Management**: 
  - **Issue**: Issue books to users.
  - **Return**: Process book returns from users.
  - **View Transactions**: Retrieve transaction history and filter by date range (Admin only).

- **Role-Based Access Control**: Differentiate between admin and user roles with specific permissions.

## Technology Stack

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It is used to build scalable server-side applications.

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.

- **MongoDB**: A NoSQL database that uses a document-oriented data model. It is used for storing and managing the book, user, and transaction data.

- **jsonwebtoken (JWT)**: A compact, URL-safe means of representing claims to be transferred between two parties. It is used for authentication and authorization.

- **Postman**: An API development tool that helps in building, testing, and documenting APIs.

## Dependencies

The following npm packages are used in the project:

- **bcryptjs**: `^2.4.3`  
  A library to hash passwords. It is used to securely store user passwords in the database.

- **cors**: `^2.8.5`  
  A package to enable Cross-Origin Resource Sharing (CORS). It allows the server to specify which origins can access resources.

- **express**: `^4.20.0`  
  A web framework for Node.js. It simplifies the process of building web applications and APIs.

- **express-mongo-sanitize**: `^2.2.0`  
  A middleware to prevent MongoDB Operator Injection. It sanitizes user inputs to prevent malicious queries.

- **express-rate-limit**: `^7.4.0`  
  A middleware to limit the number of requests to an API. It helps protect the API from abuse and potential denial-of-service attacks.

- **helmet**: `^7.1.0`  
  A collection of middleware to secure HTTP headers. It helps protect the application from common web vulnerabilities.

- **jsonwebtoken**: `^9.0.2`  
  A library to create and verify JSON Web Tokens (JWT). It is used for secure user authentication and authorization.

- **mongodb**: `^6.8.1`  
  The official MongoDB driver for Node.js. It provides an interface to interact with MongoDB.

- **mongoose**: `^8.6.1`  
  An Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a higher-level abstraction to work with MongoDB.

- **validator**: `^13.12.0`  
  A library for string validation and sanitization. It ensures that user inputs are validated before being processed.

- **xss-clean**: `^0.1.4`  
  A middleware to sanitize user inputs to prevent Cross-Site Scripting (XSS) attacks.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/RunningSage/Book-Rental-API.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Book-Rental-API
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables. Here is a sample `.env` file:

    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.rnsip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=your_jwt_secret_key
    DB_PASSWORD=<your_db_password>
    JWT_EXPIRES_IN=1h
    NODE_ENV=development
    ```

## Usage

1. Start the development server:

    ```bash
    npm start
    ```

2. Visit `http://localhost:5000` to interact with the API.

## API Endpoints

### Authentication

- **POST** `/signup` - Register a new user.
- **POST** `/login` - Login a user and receive a JWT token.

### Users

- **GET** `/users` - Get a list of all users (Admin only).
- **POST** `/users` - Create a new user (Admin only).
- **PATCH** `/users/:id` - Update user details (Admin only).
- **DELETE** `/users/:id` - Delete a user (Admin only).
- **GET** `/users/my-info` - Get information about the logged-in user.
- **GET** `/users/:user_id` - Get information about a specific user (Admin only).

### Books

- **GET** `/books` - Get a list of all books.
- **POST** `/books` - Add a new book (Admin only).
- **PATCH** `/books/:id` - Update book details (Admin only).
- **DELETE** `/books/:id` - Delete a book (Admin only).
- **GET** `/books/:book_name/info` - Get details of a specific book.
- **GET** `/books/:book_name/rent` - Calculate the rent for a specific book (Admin only).

### Transactions

- **POST** `/transactions/issue` - Issue a book to a user.
- **POST** `/transactions/return` - Return a book from a user.
- **GET** `/transactions/date-range` - Get transactions within a date range (Admin only).

## Authentication

The API uses JWT-based authentication. Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

### Admin Login Credentials
- **Email**: john.doe@example.com
- **Password**: password123

### User Login Credentials
- **Email**: foo@example.com
- **Password**: password123