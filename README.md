# Sameer – Book Your Dog Companion 🐶

A fully functional booking platform for the friendliest dog in town. Built with Next.js, Prisma, and NextAuth.

## Features
- **Hourly Booking**: Schedule time with Sameer.
- **Authentication**: Sign up and manage your bookings.
- **Admin Dashboard**: View and manage all appointments.
- **Responsive Design**: Works on mobile and desktop.

## Prerequisites
- **Node.js**: Required to run the application. [Download here](https://nodejs.org/).

## Getting Started

1.  **Install Dependencies**
    Open your terminal in this folder and run:
    ```bash
    npm install
    ```

2.  **Setup Database (Local)**
    For local development, we need to initialize the database.
    Since we configured it for Postgres (for deployment), but if you just want to test locally without Postgres, you can change `provider = "postgresql"` to `provider = "sqlite"` in `prisma/schema.prisma` and remove `url = env("DATABASE_URL")` replacing it with `url = "file:./dev.db"`.
    
    If using Postgres (Recommended for learning deployment):
    - Create a `.env` file.
    - Add `DATABASE_URL="postgresql://..."`.
    - Run:
      ```bash
      npx prisma generate
      npx prisma db push
      ```

3.  **Run the Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## Admin Access
To make a user an admin:
1. Sign up/Log in on the website.
2. Go to your database and update the User record: set `role` to `"ADMIN"`.
3. Access `/admin`.
