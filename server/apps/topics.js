import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const topicRouter = Router();

topicRouter.get("/", async (req, res) => {
  try {
    const name = req.query.keywords;
    const category = req.query.category;
    const query = {};
    if (name) {
      query.name = new RegExp(name, "i");
    }
    if (category) {
      query.category = new RegExp(category, "i");
    }
    const collection = db.collection("topics");
    const allTopics = await collection.find(query).limit(10).toArray();
    return res.json({ data: allTopics });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

topicRouter.get("/view/:id", async (req, res) => {
  try {
    const collection = db.collection("topics");
    const topicId = new ObjectId(req.params.id);

    const topicById = await collection.findOne({ _id: topicId });
    console.log(topicById);

    return res.json({ data: topicById });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

topicRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("topics");
    const topicData = { ...req.body, created_at: new Date() };
    const newTopicData = await collection.insertOne(topicData);
    return res.json({
      message: `topic has been created successfully”
        `,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

topicRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("topics");
    const newTopicData = { ...req.body, modified_at: new Date() };

    const topicId = new ObjectId(req.params.id);

    await collection.updateOne(
      {
        _id: topicId,
      },
      {
        $set: newTopicData,
      }
    );
    return res.json({
      message: `topic has been edited successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

topicRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("topics");
    const topicId = new ObjectId(req.params.id);

    await collection.deleteOne({ _id: topicId });

    return res.json({
      message: `topic has been deleted successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

export default topicRouter;
