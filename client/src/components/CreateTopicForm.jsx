import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateTopicForm() {
  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const createTopic = async () => {
    await axios.post("http://localhost:4001/topics", {
      topic: topicName,
      description,
      category,
    });
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTopic();
  };

  return (
    <div>
      <form className="product-form" onSubmit={handleSubmit}>
        <h1>Create Your Topic </h1>
        <div className="input-container">
          <label>
            Topic Name{" "}
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your topic name here"
              value={topicName}
              onChange={(event) => {
                setTopicName(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Description{" "}
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter your description here"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Category
            <select
              id="category"
              name="category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <option disabled value="">
                -- Select a category --
              </option>
              <option value="Software">Software</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Science">Science</option>
              <option value="Etc.">Etc.</option>
            </select>
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTopicForm;
