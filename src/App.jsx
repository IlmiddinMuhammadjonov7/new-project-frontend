// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Home/main";
import Login from "./pages/login";
import LessonsAdmin from "./admin/pages/LessonsAdmin";
import AdminHome from "./admin/pages/home";
import AdminLayout from "./admin/pages/layout";
import Analitika from "./admin/pages/analitika";
import Topshiriqlar from "./admin/pages/topshiriqlar";
import Maqolalarim from "./admin/pages/maqolalarim";
import Layout from "./components/Layout";
import Tasks from "./pages/Tasks";
import Tests from "./pages/TestsPage";
import Articles from "./pages/Articles";
import Profile from "./pages/Profile";
import Lessons from "./pages/Lessons";
import Acess_Lessons from "./pages/Acess-Lessons";
import TaskSubmission from "./components/TaskSubmission";
import TestSubmission from "./pages/TestTakingPage";
import ArticlePage from "./pages/ArticlesPage";
import PrivateRoute from "./components/PrivateRoute";
import CoursePage from "./pages/CoursePage";
import TestTakingPage from "./pages/TestTakingPage";
import LessonTestsPage from "./pages/LessonTestsPage";
import TestListPage from "./admin/pages/Tests/TestListPage.jsx";
import TestFormPage from "./admin/pages/Tests/TestFormPage.jsx";
import AdminAddArticle from "./admin/pages/AddArticles.jsx";
import AssignmentListPage from "./admin/pages/Tasks/AssignmentListPage.jsx";
import AssignmentDetailPage from "./admin/pages/Tasks/AssignmentDetailPage.jsx";
import AssignmentEditorPage from "./admin/pages/Tasks/AssignmentEditorPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="darsliklar" element={<LessonsAdmin />} />
          <Route path="testlar" element={<TestListPage />} />
          <Route path="tests/create" element={<TestFormPage />} />
          <Route path="tests/edit/:id" element={<TestFormPage />} />
          <Route path="analitika" element={<Analitika />} />
          <Route path="assignments" element={<AssignmentListPage />} />
          <Route path="assignments/:id" element={<AssignmentDetailPage />} />
          <Route
            path="assignments/:id/edit"
            element={<AssignmentEditorPage />}
          />
          <Route path="assignments/new" element={<AssignmentEditorPage />} />
          <Route path="maqolalarim" element={<Maqolalarim />} />
          <Route path="maqolalarim/yangi" element={<AdminAddArticle />} />
          <Route path="maqolalarim/edit/:id" element={<AdminAddArticle />} />
        </Route>

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Lessons />} />
          <Route path="courses/:courseId" element={<CoursePage />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskSubmission />} />
          <Route path="tests" element={<Tests />} />
          <Route path="tests/:lessonId" element={<LessonTestsPage />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:id" element={<ArticlePage />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
