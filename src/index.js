import express from "express";
import { PORT } from "./config/env.js";
import cors from "cors";
import AiRoute from "./controller/chatroute.js";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "https://aicode-editor-frontend.vercel.app",
    credentials: true,
  }),
);
//backend route
app.use("/api/v1/codeagent", AiRoute);

app.get("/", (req, res) => {
  res.send(`
      <html>
        <head>
          <title>My Server</title>
        </head>
        <body>
          <h1>Hello Yash 🚀</h1>
          <p>Server is running successfully</p>
          <button>Click me</button>
        </body>
      </html>
    `);
});


app.listen(PORT, (req, res) => {
  console.log("server is running... on port http://localhost:" + PORT);
});
