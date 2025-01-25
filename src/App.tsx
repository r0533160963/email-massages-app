import React, { useState } from "react";
import "./App.css";
import Header from "../src/components/header/header";
import { Email } from "./types/email";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login-page/login-page";
import EmailHome from "./components/email-home/email-home";

const mockEmails: Email[] = [];

const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Find the selected email based on ID
  const selectedEmail = emails.find((email) => email.id === selectedEmailId) || null;

  const handleSelectEmail = (email: Email) => {
    setEmails((prev) =>
      prev.map((e) =>
        e.id === email.id ? { ...e, isRead: true } : e
      )
    );
    setSelectedEmailId(email.id);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="app">
      {/* <Header onSearch={handleSearch} /> */}
      <div className="main-content">
        {/* <Sidebar /> */}
        <div className="email-section">
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home/:userId" element={<EmailHome />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>

  );
};

export default App;
