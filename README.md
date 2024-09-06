# QR Identification System

The **QR Identification System** is a web application that allows students to log their entry and exit from a facility using QR codes. The system is designed to streamline the logging process and keep track of student activity in real-time.

## Features

- **QR Code Scanning**: Students can log in by scanning their unique QR codes.
- **Real-Time Logging**: Entries are recorded with timestamps and displayed on an admin dashboard.
- **Admin Panel**: Administrators can view student logs, filter by date, and manage student information.
- **Sorting & Pagination**: Easily manage large numbers of logs with sorting and pagination features.
- **Student Data**: Information about students such as name, year, course, and time of entry is displayed.

- **Data Visualization**: Visualize student activity through charts and graphs.

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **QR Code Library**: QR Code Reader for React
- **State Management**: React Hooks, Context API
- **Date & Time Formatting**: Moment.js

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- npm

## Usage

1. **Student Log-in/Out**: Students scan their QR code upon entering the facility. The system captures the timestamp and logs the activity.
2. **Admin View**: Admins can monitor and manage logs through the admin panel, filtering by student, date, and other criteria.

## Future Enhancements

- **Email Notifications**: Notify students upon successful entry or exit.
- **Report Generation**: Allow admins to download student log reports as CSV.
- **Mobile App**: Expand the system to support a mobile app for easier scanning.

