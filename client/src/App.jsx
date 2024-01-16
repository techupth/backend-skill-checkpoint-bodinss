import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateTopicPage from "./pages/CreateTopicPage";
import EditTopicPage from "./pages/EditTopicPage";
import Homepage from "./pages/Homepage";
import ViewTopicPage from "./pages/ViewTopicPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/topics/create" element={<CreateTopicPage />} />
          <Route path="/topics/edit/:topicId" element={<EditTopicPage />} />
          <Route path="/topics/view/:topicId" element={<ViewTopicPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
