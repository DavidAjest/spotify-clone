# MERN Spotify Clone

This is a Spotify clone application built using the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure
/mern-spotify-clone |-- /backend | |-- package.json |  |-- /node_modules | |-- /src | |-- (backend source files) | |-- /frontend | |-- package.json | |-- /node_modules | |-- /public | |-- /src | |-- (frontend source files) | |-- .gitignore |-- README.md

## Prerequisites

- Node.js
- npm or yarn
- MongoDB
- React vite

## Setup

### Backend

1. Navigate to the backend directory:
cd backend
2. Install the dependencies:
npm install
3. Create a .env file in the backend directory and add your environment variables:
 MONGODB_URI=your_mongodb_uri
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret


1. Navigate to the frontend directory:
cd frontend
2.Install the dependencies:
npm install
3 Start the frontend development server:
npm run dev
3.2 Start the backend development server:
nodemon server.js
