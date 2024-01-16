import CreateTopicForm from "../components/CreateTopicForm";
import { useNavigate } from "react-router-dom";

function CreateTopicPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create Topic Page</h1>
      <CreateTopicForm />
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

export default CreateTopicPage;
