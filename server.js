const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

//connect database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/notes", require("./routes/api/notes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started  on port ${PORT}`));
