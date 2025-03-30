# Backend API Documentation

This document provides an overview of the API endpoints available in the backend of the Email Authentication system.

## Base URL
`http://localhost:5000/api/auth`

---

## Endpoints

### 1. **POST /signup**
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```
- **Response:**
  - **201 Created:** User registered successfully.
  - **400 Bad Request:** Missing fields or user already exists.
  - **500 Internal Server Error:** Server error.
  
---

### 2. **POST /login**
- **Description:** Log in an existing user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - **200 OK:** Login successful.
  - **400 Bad Request:** Invalid credentials or user not found.
  - **500 Internal Server Error:** Server error.

---

### 3. **POST /logout**
- **Description:** Log out the current user.
- **Response:**
  - **200 OK:** Logout successful.

---

### 4. **POST /verify-email**
- **Description:** Verify the user's email using a verification code.
- **Request Body:**
  ```json
  {
    "code": "123456"
  }
  ```
- **Response:**
  - **200 OK:** Email verified successfully.
  - **400 Bad Request:** Invalid or expired verification code.
  - **500 Internal Server Error:** Server error.

---

### 5. **POST /forgot-password**
- **Description:** Request a password reset link.
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:**
  - **200 OK:** Reset password email sent.
  - **400 Bad Request:** User not found.
  - **500 Internal Server Error:** Server error.

---

### 6. **POST /reset-password/:token**
- **Description:** Reset the user's password using a reset token.
- **Request Body:**
  ```json
  {
    "password": "newpassword123"
  }
  ```
- **Response:**
  - **200 OK:** Password reset successfully.
  - **400 Bad Request:** Invalid or expired reset token.
  - **500 Internal Server Error:** Server error.

---

### 7. **GET /check-auth**
- **Description:** Check if the user is authenticated.
- **Headers:** Requires a valid token in cookies.
- **Response:**
  - **200 OK:** User is authenticated.
  - **401 Unauthorized:** Token is missing or invalid.
  - **500 Internal Server Error:** Server error.

---

## Notes
- All endpoints return JSON responses.
- Ensure to include the `token` cookie for protected routes like `/check-auth`.
- Use the `CLIENT_URL` environment variable for frontend integration.

