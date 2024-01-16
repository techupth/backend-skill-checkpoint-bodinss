import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditTopicForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [topicName, setTopicName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const getCurrentTopic = async () => {
    const result = await axios(
      `http://localhost:4001/topics/view/${params.topicId}`
    );
    setTopicName(result.data.data.topic);
    setDescription(result.data.data.description);
    setCategory(result.data.data.category);
  };

  const updateProduct = async () => {
    await axios.put(`http://localhost:4001/topics/${params.topicId}`, {
      topic: topicName,
      description,
      category,
    });
    navigate("/");
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    updateProduct();
  };

  useEffect(() => {
    getCurrentTopic();
  }, []);

  return (
    <div>
      <form className="product-form" onSubmit={handleUpdate}>
        <h1>Edit Your Topic </h1>
        <div className="input-container">
          <label>
            Topic Name{" "}
            <input
              id="topic"
              name="topic"
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
              <option value="software">Software</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="science">Science</option>
              <option value="etc.">Etc.</option>
            </select>
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EditTopicForm;
