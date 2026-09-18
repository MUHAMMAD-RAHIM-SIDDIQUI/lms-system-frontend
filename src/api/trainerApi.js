import { trainerAxios, plainAxios } from "./axiosInstance";

// ---------- auth ----------

export function trainerSignup(formData) {
  return plainAxios.post("/trainer/auth/signup", formData);
}

export function trainerVerifyOtp(otp, tempToken) {
  return plainAxios.post(
    "/trainer/auth/verify-otp",
    { otp },
    { headers: { Authorization: `Bearer ${tempToken}` } }
  );
}

export function trainerLogin(email, password) {
  return plainAxios.post("/trainer/auth/login", { email, password });
}

export function trainerForgotPassword(email) {
  return plainAxios.post("/trainer/auth/forgot-password", { email });
}

export function trainerResetPassword(password, token) {
  return plainAxios.post(
    "/trainer/auth/reset-password",
    { password },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// ---------- stripe ----------

// trainer must finish stripe kyc before he can add courses
export function trainerOnboarding() {
  return trainerAxios.post("/trainer/stripe/onboarding");
}

// ---------- dashboard ----------

export function getDashboard() {
  return trainerAxios.get("/trainer/dashboard/");
}

export function getSalesByCourse() {
  return trainerAxios.get("/trainer/dashboard/sales");
}

export function getPurchasedStudents() {
  return trainerAxios.get("/trainer/dashboard/students");
}

export function getCourseSales(courseId) {
  return trainerAxios.get(`/trainer/dashboard/course/${courseId}`);
}

// ---------- courses ----------

export function getTrainerCourses() {
  return trainerAxios.get("/trainer/course/");
}

export function getTrainerCourse(id) {
  return trainerAxios.get(`/trainer/course/${id}`);
}

export function addCourse(body) {
  return trainerAxios.post("/trainer/course/add", body);
}

export function editCourse(id, body) {
  return trainerAxios.put(`/trainer/course/edit/${id}`, body);
}

// delete wants the id in the BODY, not in the url
export function deleteCourse(courseId) {
  return trainerAxios.delete("/trainer/course/delete", { data: { courseId } });
}
