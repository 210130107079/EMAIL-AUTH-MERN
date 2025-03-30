# Email Authentication System

This project is a full-stack email authentication system built using **React**, **Node.js**, **Express**, and **MongoDB**. It provides a secure and user-friendly way to handle user authentication, including features like email verification, password reset, and session management.

---

## Features

### Backend
- **User Registration**: Allows users to sign up with their email, name, and password.
- **Email Verification**: Sends a verification code to the user's email to confirm their account.
- **Login/Logout**: Secure login and logout functionality with JWT-based authentication.
- **Password Reset**: Allows users to reset their password via email.
- **Session Management**: Uses cookies to manage user sessions securely.
- **Database**: MongoDB is used to store user data.

### Frontend
- **Responsive Design**: Built with React and TailwindCSS for a modern and responsive UI.
- **State Management**: Uses Zustand for managing authentication state.
- **Password Strength Indicator**: Provides feedback on password strength during registration.
- **Email Verification UI**: A user-friendly interface for entering verification codes.
- **Error Handling**: Displays appropriate error messages for invalid inputs or server errors.

---

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for handling API routes.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For secure token-based authentication.
- **Mailtrap**: For sending email notifications during development.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Vite**: Fast build tool for modern web projects.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Framer Motion**: For animations and transitions.
- **React Router**: For routing and navigation.
- **React Hot Toast**: For displaying notifications.

---

## Folder Structure

### Backend
- **`backend/controllers`**: Contains logic for handling API requests.
- **`backend/models`**: Defines the MongoDB schemas.
- **`backend/routes`**: Defines API endpoints.
- **`backend/utils`**: Utility functions like token generation.
- **`backend/mailtrap`**: Email templates and configuration for Mailtrap.
- **`backend/middlewares`**: Middleware for token verification.

### Frontend
- **`frontend/src/pages`**: Contains React components for different pages (e.g., Login, Signup, Dashboard).
- **`frontend/src/components`**: Reusable UI components (e.g., Input, PasswordStrength).
- **`frontend/src/store`**: Zustand store for managing authentication state.
- **`frontend/src/utils`**: Utility functions (e.g., date formatting).

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- A Mailtrap account for email testing

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/email-auth.git
   cd email-auth
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` folder with the following:
     ```properties
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     MAILTRAP_TOKEN=<your-mailtrap-token>
     CLIENT_URL=http://localhost:5173
     ```

4. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. Open the app in your browser at `http://localhost:5173`.

---

## API Documentation
For detailed API documentation, refer to the [Backend README](./backend/README.md).

---

## Screenshots

### Signup Page
![Signup Page](./screenshots/signup.png)

### Login Page
![Login Page](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

---

## License
This project is licensed under the MIT License.
