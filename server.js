const express = require("express");
require("dotenv").config();
const connectDB = require("./db"); // Updated DB connection
const { errorHandler } = require("./middleware/errorMiddleware");


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api" ,require("./routes/apiRoutes.js"));

// Global Error Handler (Must be after all routes)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
