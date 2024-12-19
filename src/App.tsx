import React, { useState } from "react";
import "./App.css";
import EmailList from "../src/components/email-list/email-list";
import EmailView from "../src/components/email-view/email-view";
import Sidebar from "../src/components/sidebar/sidebar";
import Header from "../src/components/header/header";
import { Email } from "./types/email";
import EmailPage from "./components/email-page/email-page";

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
      <Header onSearch={handleSearch} />
      <div className="main-content">
        {/* <Sidebar /> */}
        <div className="email-section">
          {/* <EmailList
            onSelectEmail={handleSelectEmail}
            searchQuery={searchQuery}
          /> */}
          <EmailPage/>
          {/* <EmailView
            email={selectedEmail}
            onClose={() => setSelectedEmailId(null)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default App;
