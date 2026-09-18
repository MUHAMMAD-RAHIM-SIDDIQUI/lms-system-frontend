import { createContext, useContext, useEffect, useState } from "react";

const TrainerAuthContext = createContext(null);

export function TrainerAuthProvider({ children }) {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  // read the saved trainer back from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem("trainerUser");
    const token = localStorage.getItem("trainerToken");
    if (saved && token) {
      try {
        setTrainer(JSON.parse(saved));
      } catch {
        localStorage.removeItem("trainerUser");
      }
    }
    setLoading(false);
  }, []);

  // data comes straight from the login response (it has token inside)
  function loginTrainer(data) {
    const { token, ...rest } = data;
    localStorage.setItem("trainerToken", token);
    localStorage.setItem("trainerUser", JSON.stringify(rest));
    setTrainer(rest);
  }

  function logoutTrainer() {
    localStorage.removeItem("trainerToken");
    localStorage.removeItem("trainerUser");
    setTrainer(null);
  }

  return (
    <TrainerAuthContext.Provider
      value={{ trainer, loading, loginTrainer, logoutTrainer }}
    >
      {children}
    </TrainerAuthContext.Provider>
  );
}

export function useTrainerAuth() {
  return useContext(TrainerAuthContext);
}
