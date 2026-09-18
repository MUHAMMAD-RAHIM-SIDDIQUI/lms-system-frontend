import { Navigate, Route, Routes } from "react-router-dom";

import { StudentAuthProvider } from "./context/StudentAuthContext";
import { TrainerAuthProvider } from "./context/TrainerAuthContext";
import StudentProtectedRoute from "./components/StudentProtectedRoute";
import TrainerProtectedRoute from "./components/TrainerProtectedRoute";

import Landing from "./pages/Landing";
import ResetPassword from "./pages/ResetPassword";

import StudentSignup from "./pages/student/StudentSignup";
import StudentVerifyOtp from "./pages/student/StudentVerifyOtp";
import StudentLogin from "./pages/student/StudentLogin";
import StudentForgotPassword from "./pages/student/StudentForgotPassword";
import StudentCourses from "./pages/student/StudentCourses";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentMyCourses from "./pages/student/StudentMyCourses";
import StudentCourseLearn from "./pages/student/StudentCourseLearn";
import StudentProfile from "./pages/student/StudentProfile";

import TrainerSignup from "./pages/trainer/TrainerSignup";
import TrainerVerifyOtp from "./pages/trainer/TrainerVerifyOtp";
import TrainerLogin from "./pages/trainer/TrainerLogin";
import TrainerForgotPassword from "./pages/trainer/TrainerForgotPassword";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerCourses from "./pages/trainer/TrainerCourses";
import TrainerAddCourse from "./pages/trainer/TrainerAddCourse";
import TrainerEditCourse from "./pages/trainer/TrainerEditCourse";
import TrainerSales from "./pages/trainer/TrainerSales";
import TrainerCourseSales from "./pages/trainer/TrainerCourseSales";
import TrainerStudents from "./pages/trainer/TrainerStudents";

export default function App() {
  return (
    // both providers wrap everything, student and trainer logins are separate
    <StudentAuthProvider>
      <TrainerAuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* shared reset password page opened from the email link */}
          <Route path="/user/reset-password/:token" element={<ResetPassword />} />

          {/* ---------- student ---------- */}
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/student/verify-otp" element={<StudentVerifyOtp />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/forgot-password" element={<StudentForgotPassword />} />

          <Route path="/student/courses" element={<StudentProtectedRoute><StudentCourses /></StudentProtectedRoute>} />
          <Route path="/student/courses/:id" element={<StudentProtectedRoute><StudentCourseDetail /></StudentProtectedRoute>} />
          <Route path="/student/my-courses" element={<StudentProtectedRoute><StudentMyCourses /></StudentProtectedRoute>} />
          <Route path="/student/courses/:id/learn" element={<StudentProtectedRoute><StudentCourseLearn /></StudentProtectedRoute>} />
          <Route path="/student/profile" element={<StudentProtectedRoute><StudentProfile /></StudentProtectedRoute>} />

          {/* ---------- trainer ---------- */}
          <Route path="/trainer/signup" element={<TrainerSignup />} />
          <Route path="/trainer/verify-otp" element={<TrainerVerifyOtp />} />
          <Route path="/trainer/login" element={<TrainerLogin />} />
          <Route path="/trainer/forgot-password" element={<TrainerForgotPassword />} />

          <Route path="/trainer/dashboard" element={<TrainerProtectedRoute><TrainerDashboard /></TrainerProtectedRoute>} />
          <Route path="/trainer/courses" element={<TrainerProtectedRoute><TrainerCourses /></TrainerProtectedRoute>} />
          <Route path="/trainer/courses/add" element={<TrainerProtectedRoute><TrainerAddCourse /></TrainerProtectedRoute>} />
          <Route path="/trainer/courses/edit/:id" element={<TrainerProtectedRoute><TrainerEditCourse /></TrainerProtectedRoute>} />
          <Route path="/trainer/sales" element={<TrainerProtectedRoute><TrainerSales /></TrainerProtectedRoute>} />
          <Route path="/trainer/sales/:courseId" element={<TrainerProtectedRoute><TrainerCourseSales /></TrainerProtectedRoute>} />
          <Route path="/trainer/students" element={<TrainerProtectedRoute><TrainerStudents /></TrainerProtectedRoute>} />

          {/* anything else goes back home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TrainerAuthProvider>
    </StudentAuthProvider>
  );
}
