---
description: Comprehensive guide to the functional workflow, system architecture, and user journeys of EventSense.
---

# EventSense System Workflow & Architecture

This document details the end-to-end workflow of the **EventSense** platform, explaining how users, organizers, and administrators interact with the system, and how these interactions are implemented technically.

## 1. System Architecture Overview

EventSense follows a standard **MERN Stack** (MongoDB, Express, React, Node.js) architecture with a clear separation of concerns.

### Tech Stack
-   **Frontend**: React (Vite), Tailwind CSS, Context API (State Management).
-   **Backend**: Node.js, Express.js (REST API).
-   **Database**: MongoDB (Mongoose ODM).
-   **Services**:
    -   **Authentication**: JWT (JSON Web Tokens) & `bcryptjs` for password hashing.
    -   **Email**: Nodemailer (SMTP) for sending confirmations.
    -   **QR Code**: `qrcode` package for generating digital tickets.

## 2. User Roles & Permissions

The system controls access using **Role-Based Access Control (RBAC)**. Middleware in the backend (`middleware/auth.js`) and `RoleRoute` in the frontend ensure security.

| Role | Responsibilities | Key Permissions |
| :--- | :--- | :--- |
| **User** | Browse, Book, Review | `createBooking`, `getUserBookings`, `addReview` |
| **Organizer** | Create & Manage Events | `createEvent`, `updateEvent`, `getEventBookings`, `getOrganizerEvents` |
| **Admin** | Platform Oversight | `approveEvent`, `rejectEvent`, `getAdminAnalytics`, `getAllUsers` |

---

## 3. End-to-End Functional Workflows

### A. User Registration & Authentication Flow
**Goal**: securely identify users and assign roles.

1.  **Sign Up**:
    -   User submits form (Name, Email, Password, Role).
    -   **Backend**: `authController.register` hashes the password and saves the user.
    -   **JWT**: A token is signed with the user's ID and returned.
2.  **Login**:
    -   User logs in with Email/Password.
    -   **Backend**: `authController.login` verifies credentials and issues a fresh JWT.
    -   **Frontend**: `AuthContext` saves the user info to `localStorage` and sets the default Authorization header for Axios.

### B. Event Creation Lifecycle (Organizer <-> Admin)
**Goal**: Ensure high-quality events are listed on the platform.

1.  **Drafting (Organizer)**:
    -   Organizer submits event details (Title, Date, Price, Seats).
    -   **Backend**: `eventController.createEvent` saves the event with status **`pending`**.
2.  **Approval (Admin)**:
    -   Admin views the "Pending Events" dashboard (`adminController.getPendingEvents`).
    -   Admin clicks "Approve" or "Reject".
    -   **Backend**: `adminController.updateEventStatus` updates status to `approved`.
    -   **Notification**: An email is automatically sent to the organizer notifying them of the result.
3.  **Publishing**:
    -   Only events with `status: 'approved'` are returned by the public API (`getEvents`).

### C. Booking Journey (User)
**Goal**: seamless ticket purchase and digital delivery.

1.  **Availability Check**:
    -   User views an event and selects the number of seats.
    -   **Backend**: `bookingController.createBooking` first checks `event.availableSeats >= requestedSeats`.
2.  **Transaction**:
    -   If seats are available, the system calculates `totalAmount`.
    -   A unique **Booking Reference** (e.g., `ES-L9X...`) is generated.
3.  **Digital Ticket Generation**:
    -   The system generates a **QR Code** containing booking details.
    -   A new `Booking` document is created in MongoDB.
4.  **Confirmation**:
    -   **Email**: The system sends an email with the transaction details and the **QR Code attached as an image**.
    -   **Update**: The Event's `availableSeats` count is decremented atomically.

### D. Post-Event Interaction
1.  **Reviews**:
    -   User can leave a star rating and comment (`reviewController`).
    -   Ratings trigger a recalculation of the Event's `averageRating`.
2.  **Organizer Dashboard**:
    -   Organizer views booking stats and revenue for their specific events (`getEventBookings`).

---

## 4. Key Implementation Details

### Security
-   **Route Protection**: API routes use `protect` middleware to verify tokens. Specific routes use `authorize('admin')` or `authorize('organizer')` to restrict access further.
-   **Data Validation**: Mongoose schemas enforce data types (e.g., strictly typed `Date` for event times, `Number` for prices).

### Frontend-Backend Communication
-   **Axios Interceptors**: The `AuthContext` ensures the JWT token is attached to every request automatically via `axios.defaults.headers.common`.
-   **State Management**: `AuthContext` globally manages the "isLoggedIn" state, preventing unauthorized access to pages like `/admin/dashboard` or `/organizer/create-event`.

### Email Service
-   Uses `nodemailer` with HTML templates (`utils/emailTemplates.js`).
-   QR Codes are generated SERVER-SIDE using `qrcode.toDataURL` and embedded directly into the email logic.
