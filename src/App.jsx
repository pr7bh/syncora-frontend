import { useState } from "react";

import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {

  const { isAuthenticated } = useAuth();

  const [showRegister, setShowRegister] = useState(false);


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