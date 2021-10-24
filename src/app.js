import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import cors from "cors";

dotenv.config();

//connect to db

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db!")
);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.static("storage"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
//routes

app.use("/api", routes);

const port = 3000 || process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.log("Starting a server on port " + port + " failed");
  } else {
    console.log("listening on port " + port);
  }
});

export default app;
