# Personal Blog Full-Stack App

This project includes:

- Node.js + Express backend
- MongoDB database with Mongoose
- React frontend with Vite
- User registration, login, logout
- Blog creation, editing, and user-specific blog list
- Validation on backend and frontend

## Setup

1. Start MongoDB locally or set `MONGO_URI` to your MongoDB Atlas connection.
2. Install server dependencies:
   ```bash
   cd /home/sid/Desktop/NodeJs/ChaiOrReact/newProject/server
   npm install
   cp .env.example .env
   ```
3. Install client dependencies:
   ```bash
   cd /home/sid/Desktop/NodeJs/ChaiOrReact/newProject/client
   npm install
   ```
4. Run the backend and frontend separately:
   Backend:
   ```bash
   cd /home/sid/Desktop/NodeJs/ChaiOrReact/newProject/server
   npm run dev
   ```
   Frontend:
   ```bash
   cd /home/sid/Desktop/NodeJs/ChaiOrReact/newProject/client
   npm run dev
   ```

## Notes

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- The client expects the backend API at `http://localhost:5000/api`
