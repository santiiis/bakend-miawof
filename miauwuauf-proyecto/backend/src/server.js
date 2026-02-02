require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());


app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/", (req, res) => {
  res.json({ ok: true, service: "miauwuauf-backend" });
});

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/dogs", require("./routes/dogs.routes"));
app.use("/api/collars", require("./routes/collars.routes"));
app.use("/api/events", require("./routes/events.routes"));
app.use("/api/vaccines", require("./routes/vaccines.routes"));
app.use("/api/public", require("./routes/public.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api", require("./routes/frontend.routes"));


const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`API running on http://localhost:${port}`);
});


