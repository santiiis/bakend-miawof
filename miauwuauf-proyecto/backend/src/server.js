require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, service: "miauwuauf-backend" });
});

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/dogs", require("./routes/dogs.routes"));
app.use("/collars", require("./routes/collars.routes"));
app.use("/events", require("./routes/events.routes"));
app.use("/vaccines", require("./routes/vaccines.routes"));
app.use("/public", require("./routes/public.routes"));
app.use("/dashboard", require("./routes/dashboard.routes"));



const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`API running on http://localhost:${port}`);
});


