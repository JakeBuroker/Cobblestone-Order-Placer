# Cobblestone Order Placer 🍴

Welcome to the Cobblestone Order Placer, an innovative application crafted to enhance the ordering and pickup experience at Cobblestone Cafe. This application isn't just a testament to technological convenience; it's a tribute to the heart and soul poured into Cobblestone Cafe, a restaurant lovingly owned and operated by my mother.

## Application Overview

Cobblestone Order Placer simplifies the dining experience for our valued customers at Cobblestone Café, enabling them to:

- **Order with Ease:** Navigate through a user-friendly interface to browse the menu, customize orders, and select from secure online or in-store payment options.
- **Stay Informed:** Click to receive detailed information about menu items.
- **Track Orders:** Conveniently monitor recent orders for efficient reordering.

### For Administrators, the application provides:

- **Comprehensive Dashboard:** Manage all orders efficiently from a single dashboard.
- **Order Management:** Easily view, edit, delete, or mark orders as complete.
- **Insights:** Gain valuable insights into ordering trends and customer preferences.

## Tech Stack

- **Frontend:** Built with React for dynamic UIs, Redux for state management, Material UI for stylish components, and Axios for HTTP requests.
- **Backend:** Developed using Node.js with Express for server logic, PostgreSQL for data storage, and Passport for secure authentication.
- **Utilities:** Features Luxon for date and time management, SweetAlert2 for interactive alerts, CORS for cross-origin resource sharing, and Vite for optimized building.
- **Deployment:** The application is hosted on Heroku, ensuring reliable access and performance.
- **Payments:** Integrates Stripe for payment processing, which is currently functional at about 80% capacity. We are actively working to resolve the remaining issues for a seamless checkout experience.

## Local Development Setup

1. **Clone the Repository:** Start by cloning the project to your local machine.
2. **Navigate to the Project Directory:** Change into the project directory.
3. **Install Dependencies:** Run `npm install` to install all required dependencies.
4. **Initialize Database:** Set up your PostgreSQL database using the provided `database.sql` script.
5. **Start the Application:** Utilize Nodemon to enhance your development process. Access the app at `http://localhost:3000`.

