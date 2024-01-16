import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewTopicPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const params = useParams();

  const getTopic = async () => {
    const results = await axios.get(
      `http://localhost:4001/topics/view/${params.topicId}`
    );
    setTopic(results.data.data);
  };

  useEffect(() => {
    getTopic();
  }, []);

  return (
    <div>
      <h1>View Topic Page</h1>
      <div className="view-topic-container">
        <h2>Name : {topic.topic}</h2>
        <p>Description :{topic.description}</p>
        <h3>Category: {topic.category}</h3>
        <h3>Created Time:{topic.created_at}</h3>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default ViewTopicPage;
