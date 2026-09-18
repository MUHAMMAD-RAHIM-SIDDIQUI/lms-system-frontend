import { createContext, useContext, useEffect, useState } from "react";

const StudentAuthContext = createContext(null);

export function StudentAuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // read the saved student back from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem("studentUser");
    const token = localStorage.getItem("studentToken");
    if (saved && token) {
      try {
        setStudent(JSON.parse(saved));
      } catch {
        localStorage.removeItem("studentUser");
      }
    }
    setLoading(false);
  }, []);

  // data comes straight from the login response (it has token inside)
  function loginStudent(data) {
    const { token, ...rest } = data;
    localStorage.setItem("studentToken", token);
    localStorage.setItem("studentUser", JSON.stringify(rest));
    setStudent(rest);
  }

  function logoutStudent() {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    setStudent(null);
  }

  return (
    <StudentAuthContext.Provider
      value={{ student, loading, loginStudent, logoutStudent }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  return useContext(StudentAuthContext);
}
