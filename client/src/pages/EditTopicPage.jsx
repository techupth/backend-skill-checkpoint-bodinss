import EditTopicForm from "../components/EditTopicForm";
import { useNavigate } from "react-router-dom";

function EditTopicPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit Topic Page</h1>
      <EditTopicForm />
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

export default EditTopicPage;
