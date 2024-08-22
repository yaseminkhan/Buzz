# BuzzSocial

BuzzSocial is a social media-inspired web application built using the MERN (MongoDB, Express, React, Node.js) stack. This project was developed to sharpen my skills in full-stack development, with features such as user authentication, dynamic content display, and a modern user interface designed with Material-UI.

## Features

- User authentication (Login, Registration)
- Profile management with user info editing
- Dynamic ad display
- Post creation, liking, and commenting (planned)
- Search functionality (planned)
- Google OAuth and two-factor authentication (planned)
- Real-time notifications (planned)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/) (Ensure MongoDB is running on your machine)

## Getting Started

### 1. Clone the Repository

git clone https://github.com/yourusername/BuzzSocial.git

cd BuzzSocial

### 2. Set Up Environment Variables
Create a .env file in the root of the project by copying the provided .env.example file:

cp .env.example .env

Edit the .env file and fill in the required values:

MONGO_URL=mongodb://localhost:27017/BuzzSocial

PORT=3001

JWT_SECRET=your_jwt_secret_key

- MONGO_URL: The MongoDB connection string. If you're running MongoDB locally, you can use the provided value.
- PORT: The port number on which the server will run.
- JWT_SECRET: A secret key used for signing JWT tokens. Replace your_jwt_secret_key with a strong secret of your choice.

### 3. Install Dependencies 
Install the necessary dependencies for both the backend and the frontend:

npm install

### 4. Run the Application 
You'll need to run the backend and frontend servers separately in two different terminals:

#### Terminal 1: Start the Backend Server
cd server
npm start

#### Terminal 2: Start the Frontend Server
cd frontend
npm start

### 5. Access the Application

Open your browser and navigate to http://localhost:3000 to access the application.

- The backend server will be running on the port specified in your .env file (e.g., http://localhost:3001).
- The frontend will be running on http://localhost:3000.