import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout1 from "./components/layout/Layout1";
import Story from "./pages/Story";
import Layout2 from "./components/layout/Layout2";
import Intro from "./pages/Intro";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";
import Preview from "./pages/Preview";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout1 />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<Layout2 />}>
        <Route path="story" element={<Story />} />
        <Route path="intro" element={<Intro />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="score" element={<Score />} />
        <Route path="preview" element={<Preview />} />
      </Route>
      <Route path="admin" element={<Admin />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
export default App;
