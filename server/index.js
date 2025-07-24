// import express from 'express';
// import dotenv from 'dotenv'
// import connectDB from './config/database.js';
// import userRoute from './routes/userRoute.js';
// import cookieParser from 'cookie-parser';
// import messageRoute from './routes/messageRoute.js';
// import cors from 'cors';
// import { app, server } from './socket.js';
// dotenv.config({});

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const corsOptions = {
//   origin:" http://localhost:5173",
//   credentials: true,
// }
// app.use(cors(corsOptions));
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });
import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/messageRoute.js';
import cors from 'cors';
import { app, server } from './socket/socket.js'; 

dotenv.config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://chatapp-frontend-3hdy.onrender.com", 
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server with socket is running on port ${PORT}`);
});
