# Hotel Booking Website - Client

A modern hotel booking web application built with React, Vite, and Tailwind CSS. This is the frontend client for the full-stack MERN hotel booking platform.

## Features

- **User Authentication**: Secure login and registration system
- **Browse Accommodations**: View and search available hotel properties
- **Property Listings**: Manage and create new property listings
- **Booking Management**: Book accommodations and manage existing bookings
- **User Profile**: View and update user account information
- **Responsive Design**: Mobile-first UI built with Tailwind CSS

## Tech Stack

- **React 18.3**: UI library
- **Vite 5.3**: Fast build tool and dev server
- **React Router 6.24**: Client-side routing
- **Axios 1.7**: HTTP client for API requests
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **date-fns 3.6**: Date manipulation and formatting

## Project Structure

```
src/
├── pages/              # Page components for different routes
│   ├── IndexPage.jsx              # Home page
│   ├── LoginPage.jsx              # User login
│   ├── RegisterPage.jsx           # User registration
│   ├── ProfilePage.jsx            # User profile
│   ├── PlacesPage.jsx             # User's properties
│   ├── PlacesFormPage.jsx         # Create/edit property
│   ├── PlacePage.jsx              # Property details
│   ├── BookingsPage.jsx           # User's bookings
│   └── BookingPage.jsx            # Booking details
├── component/         # Reusable components
│   └── Header.jsx
├── App.jsx            # Main app component with routing
├── Layout.jsx         # App layout wrapper
├── UserContext.jsx    # User context for state management
├── BookingWidget.jsx  # Booking form component
├── PlaceGallery.jsx   # Gallery for property images
└── [other components]
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## API Configuration

The client is configured to connect to a backend API running on `http://localhost:4000`. Ensure the backend server is running before starting the development server.

## License

MIT
