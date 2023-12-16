const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect to database
connectDB();

// Init middleware
app.use(express.json({extended: false}));

app.get("/", (req, res) => res.send("API running"));

// define routes
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));
app.use("/posts", require("./routes/api/posts"));
app.use("/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
