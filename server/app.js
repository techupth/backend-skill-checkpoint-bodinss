import express from "express";
import cors from "cors";
import topicRouter from "./apps/topics.js";
// Import ตัว `client` เข้ามา
import { client } from "./utils/db.js";

const init = async () => {
  await client.connect();
  const app = express();
  const port = 4001;

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/topics", topicRouter);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

init();
