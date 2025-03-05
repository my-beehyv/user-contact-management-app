console.log('Server-side code running');
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
dotenv.config();
const port = process.env.PORT;
connectDB();
const app = express();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));  
app.use("/api/users", require("./routes/userRoutes"));  
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});