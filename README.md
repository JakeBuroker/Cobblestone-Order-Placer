# Cobblestone Order Placer 🍴

Welcome to the Cobblestone Order Placer, an application crafted to enhance the ordering and pickup experience at Cobblestone Cafe.

## Application Overview

The Cobblestone Order Placer simplifies the dining experience for our valued customers at Cobblestone Café, enabling them to order with ease, stay informed about our menu, and view their order history to see when orders are complete.

### For Administrators

The application provides a comprehensive dashboard for efficient order management. Administrators have the ability to view, edit, delete, or mark orders as complete. They also have access to valuable insights into ordering trends and customer preferences, enabling them to make informed decisions to improve the service and offerings of Cobblestone Café.

## Features

- **User-Friendly Ordering:** A seamless interface for customers to browse the menu, customize orders, and choose secure payment options.
- **Order Completion Notification:** Customers can view their order history to check when their orders are complete.
- **Secure Payment Options:** Integrated with Stripe for secure online payments. The Stripe integration is currently functional at about 80% capacity, with ongoing work to resolve issues and ensure a seamless checkout experience.
- **Administrative Dashboard:** Comprehensive tools for administrators to manage orders effectively, including editing, deleting, and marking orders as complete. The dashboard also provides analytics on ordering trends.

## Tech Stack

- **Frontend:** React for dynamic UIs, Redux and Redux-Sagas for state management, and Material UI for component styling.
- **Backend:** Node.js with Express for server logic, PostgreSQL for data storage, and Passport for authentication.
- **Utilities:** Axios for HTTP requests, Luxon for date and time management, and SweetAlert2 for interactive alerts.
- **Deployment:** Hosted on Heroku for reliable access and performance.
- **Payments:** Uses Stripe for secure payment processing.

## Access the Deployed Application

Experience the Cobblestone Order Placer Here: [Cobblestone Cafe Order Placer](https://cobblestone-cafe-e2cd55d0a8a4.herokuapp.com/)

## Local Development Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Set up your PostgreSQL database with the provided `database.sql` script.
5. Start the application with `nodemon` and access it at `http://localhost:3000`.

## Contact

For any inquiries or suggestions, reach out to us at JakeTBuroker@gmail.com.

