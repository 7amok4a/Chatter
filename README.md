# 💬 Chatter - Real-Time MERN Stack Messaging App

Chatter is a full-stack, real-time messaging application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless communication experience with a focus on security, performance, and a beautiful user interface. Users can sign up, connect with others, and exchange messages instantly with live presence indicators.


## ✨ Key Features

Chatter comes packed with a variety of features to enhance user communication:

*   **🔐 Secure Custom Authentication**: Implements a robust JWT-based authentication system from scratch, eliminating reliance on third-party services.
*   **⚡ Real-time Messaging**: Leverages **Socket.io** to enable instant, bidirectional communication between users for a fluid chat experience.
*   **🟢 Live Presence**: Displays real-time online/offline status indicators for all users, so you always know who's available.
*   **🔔 Interactive UI Sounds**: Provides notification and typing sounds with an easy toggle switch to customize the auditory experience.
*   **📨 Automated Emails**: Sends a friendly welcome email to new users upon signup using **Nodemailer**.
*   **🖼️ Media Sharing**: Allows users to upload and share images seamlessly, powered by **Multer** for handling file uploads.
*   **🚦 API Rate-Limiting**: Protects the backend API from abuse and ensures fair usage with rate limiting configured via **Arcjet**.
*   **🎨 Modern & Responsive UI**: Features a sleek and intuitive interface built with **React**, styled using **Tailwind CSS** and enhanced with **DaisyUI** components.
*   **🧠 Efficient State Management**: Utilizes **Zustand** for a simple yet powerful global state management solution on the frontend.
*   **🧱 Robust Data Persistence**: Stores all user data, messages, and conversations securely in **MongoDB**.
*   **🧑‍💻 Professional Git Workflow**: The development history reflects a clean Git workflow using branches, pull requests, and merges.

## 🛠️ Tech Stack

This project is built using a modern and powerful set of technologies:

### Frontend
*   **Library**: React
*   **Styling**: Tailwind CSS, DaisyUI
*   **State Management**: Zustand
*   **Real-time Client**: Socket.io-client

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Authentication**: JSON Web Tokens (JWT), Bcrypt
*   **Real-time Server**: Socket.io
*   **Database**: MongoDB with Mongoose ODM
*   **File Uploads**: Multer
*   **Email Service**: Nodemailer
*   **Security**: Arcjet (Rate Limiting)
*   **API Style**: REST

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
*   Node.js (v18 or later recommended)
*   npm or yarn
*   MongoDB (Local installation or MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/7amok4a/Chatter.git
    cd Chatter
    ```

2.  **Install backend dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Set up backend environment variables**
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    NODE_ENV=development

    # Email Configuration (Nodemailer - e.g., using Gmail)
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password

    # Arcjet API Key for Rate Limiting
    ARCJET_KEY=your_arcjet_key
    ```

4.  **Install frontend dependencies**
    ```bash
    cd ../frontend
    npm install
    ```

5.  **Set up frontend environment variables**
    Create a `.env` file in the `frontend` directory:
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

6.  **Run the application**

    *   **Start the backend server** (from the `/backend` directory):
        ```bash
        npm run dev
        ```
    *   **Start the frontend development server** (from the `/frontend` directory):
        ```bash
        npm run dev
        ```

7.  **Open your browser** and navigate to `http://localhost:5173` (or the port shown in your frontend terminal) to see the application running.

## 📁 Project Structure

A high-level overview of the project's folder structure:

```
Chatter/
├── backend/                 # Node.js/Express backend
│   ├── controllers/         # Request handlers (auth, message, user)
│   ├── middleware/          # Custom middleware (auth, error handling)
│   ├── models/              # Mongoose data models (User, Message)
│   ├── routes/              # API route definitions
│   ├── utils/               # Utility functions (email, token generation)
│   ├── socket/              # Socket.io event handlers
│   ├── .env                 # Environment variables (ignored by Git)
│   └── server.js            # Main application entry point
├── frontend/                # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main view components (Login, Chat)
│   │   ├── store/           # Zustand state stores
│   │   ├── lib/             # Utilities and axios configuration
│   │   ├── hooks/           # Custom React hooks
│   │   └── App.jsx          # Root component
│   ├── .env                 # Frontend environment variables
│   └── index.html
├── .gitignore
└── README.md
```

## 🤝 How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Fork** the Project
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

