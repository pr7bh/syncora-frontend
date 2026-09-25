import { useState } from "react";

import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {

  const {
    isAuthenticated,
    loading,
  } = useAuth();

  const [showRegister, setShowRegister] = useState(false);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  if (!isAuthenticated) {

    if (showRegister) {
      return (
        <Register
          onSwitchToLogin={() => setShowRegister(false)}
        />
      );
    }

    return (
      <Login
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }


  return (
    <Home />
  );
}

export default App;