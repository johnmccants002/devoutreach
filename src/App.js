import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm"; // Make sure to update the path to your CustomForm component
import LocalResults from "./components/LocalResults";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LocalResults />} />

          <Route path="/form" element={<UserForm />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
