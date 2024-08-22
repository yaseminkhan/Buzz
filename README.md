# Buzz

Buzz is a social media-inspired web application developed using the MERN stack (MongoDB, Express, React, Node.js). This project focuses on full-stack development skills, featuring user authentication, dynamic content display, and a modern interface designed with Material-UI.

## Features

- **User Authentication:** Login and registration functionalities.
- **Profile Management:** Allows users to edit their information.
- **Dynamic Ad Display:** Ads change dynamically.
- **Post Creation and Liking:** Users can create and like posts.

## Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (Version 12 or higher) - Download [here](https://nodejs.org/).
- **MongoDB** - Ensure it is running on your local machine. Installation guide [here](https://www.mongodb.com/).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/BuzzSocial.git
cd Buzz
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root by copying the `.env.example` file:

```bash
cp .env.example .env
```

Edit the `.env` file with the necessary values:
- `MONGO_URL=mongodb://localhost:27017/BuzzSocial` - Local MongoDB connection string.
- `PORT=3001` - Server running port.
- `JWT_SECRET=your_jwt_secret_key` - Secret key for JWT, replace `your_jwt_secret_key` with your chosen secret.

### 3. Install Dependencies

Install all required dependencies for both the backend and frontend:

```bash
npm install
```

### 4. Run the Application

Run both backend and frontend servers in separate terminals:

#### Backend Server

```bash
cd server
npm start
```

#### Frontend Server

```bash
cd client
npm start
```

### 5. Access the Application

Open a browser and navigate to:
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:3001](http://localhost:3001) (as specified in the `.env` file)
