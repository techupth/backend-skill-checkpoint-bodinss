import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Homepage() {
  const params = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const getTopics = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(`http://localhost:4001/topics`);
      console.log(results);
      setTopics(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const deleteProduct = async (topicId, index) => {
    await axios.delete(`http://localhost:4001/topics/${topicId}`);
    // Clone state เก่ามาก่อน แล้วค่อยแก้เป็น State อันใหม่
    // จากนั้นก็ค่อย Update ตัว State
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  useEffect(() => {
    getTopics();
  }, [searchText, category]);

  return (
    <div className="container">
      <div className="left-menu-section">
        <h1 className="app-title">100k Knows.com</h1>
        <button
          className="create-topic-button"
          onClick={() => {
            navigate("/topics/create");
          }}
        >
          Create New Topic
        </button>

        <div className="search-box-container">
          <div className="search-box">
            <label>
              <input
                type="text"
                placeholder="Search Topic"
                className="search-box-input"
              />
            </label>
          </div>
          <div className="category-filter">
            <label className="category-label">
              Category
              <select id="category" name="category" className="category-input">
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
        </div>
      </div>
      <div className="topic-list">
        {!topics.length && !isError && (
          <div className="no-blog-posts-container">
            <h1>No Topics</h1>
          </div>
        )}
        {topics.map((topic, index) => {
          return (
            <div className="topic" key={topic._id}>
              <div className="topic-detail">
                <h1 className="topic-text"> {topic.topic} </h1>

                <h3 className="category-text"> Category: {topic.category}</h3>
                <h5 className="create-at-text">
                  Created at :{" "}
                  {topic.created_at
                    ? new Date(topic.created_at).toISOString().substring(0, 10)
                    : "-"}
                </h5>

                <p className="description-text"> "{topic.description}" </p>
                <div className="product-actions">
                  <button
                    className="view-button"
                    onClick={() => {
                      navigate(`/topics/view/${topic._id}`);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => {
                      navigate(`/topics/edit/${topic._id}`);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProduct(topic._id, index);
                }}
              >
                X
              </button>
            </div>
          );
        })}
        {isError ? <h1>Request failed</h1> : null}
        {isLoading ? <h1>Loading ....</h1> : null}

        <div className="pagination">
          <button className="previous-button">Previous</button>
          <button className="next-button">Next</button>
        </div>
        <div className="pages">1/ total page</div>
      </div>
    </div>
  );
}

export default Homepage;
