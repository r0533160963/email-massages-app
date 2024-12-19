import React, { useState } from "react";
import EmailList from "../email-list/email-list"; // הקומפוננטה של רשימת המיילים
import ViewEmail from "../email-view/email-view"; // הקומפוננטה של תצוגת המייל
import "./email-page.css";

const EmailPage: React.FC = () => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  return (
    <div className={`email-page-container ${selectedEmailId ? "split-view" : "full-view"}`}>
      {/* חלק עליון: רשימת המיילים */}
      <div className="email-list-container">
        <EmailList
          onSelectEmail={(email) => setSelectedEmailId(email.id)}
          searchQuery=""
        />
      </div>
      
      {/* חלק תחתון: תצוגת מייל */}
      {selectedEmailId && (
        <div className="email-view-container">
          <ViewEmail
            emailId={selectedEmailId}
            onClose={() => setSelectedEmailId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default EmailPage;
