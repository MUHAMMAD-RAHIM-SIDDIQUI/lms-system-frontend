import { studentAxios, plainAxios } from "./axiosInstance";

// auth 

// signup sends a file too, so it has to be multipart/form-data
export function studentSignup(formData) {
  return plainAxios.post("/student/auth/signup", formData);
}

// otp verify uses the temp token we got from signup
export function studentVerifyOtp(otp, tempToken) {
  return plainAxios.post(
    "/student/auth/verify-otp",
    { otp },
    { headers: { Authorization: `Bearer ${tempToken}` } }
  );
}

export function studentLogin(email, password) {
  return plainAxios.post("/student/auth/login", { email, password });
}

export function studentForgotPassword(email) {
  return plainAxios.post("/student/auth/forgot-password", { email });
}

// token here comes from the emailed link, not from localStorage
export function studentResetPassword(password, token) {
  return plainAxios.post(
    "/student/auth/reset-password",
    { password },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

// courses 

export function getAllCourses() {
  return studentAxios.get("/student/courses");
}

// careful: this path must come before /courses/:id on the backend
export function getMyCourses() {
  return studentAxios.get("/student/courses/myCourses");
}

export function getCourseById(id) {
  return studentAxios.get(`/student/courses/${id}`);
}

// returns a stripe checkout session, we redirect to session.url
export function createCourseCheckout(id) {
  return studentAxios.post(`/student/stripe/course-checkout/${id}`);
}

export function getStudentProfile() {
  return studentAxios.get("/student/auth/profile");
}

export function getPurchasedCourse(id) {
  return studentAxios.get(`/student/courses/${id}/learn`);
}