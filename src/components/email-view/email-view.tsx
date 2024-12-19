import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Email } from "../../types/email";
import emailStore from "../email-store/email-store";
import "./email-view.css";
import { Button } from "@mui/material";
import DOMPurify from "dompurify";

interface ViewEmailProps {
  emailId: string | null; // מזהה המייל שנטען מהשרת
  onClose: () => void;
}

const ViewEmail: React.FC<ViewEmailProps> = ({ emailId, onClose }) => {
  const [email, setEmail] = useState<Email | null>(null); // לשמירת המייל שהובא מהשרת
  const [isLoading, setIsLoading] = useState(false); // אינדיקטור לטעינה
  const [error, setError] = useState<string | null>(null); // אינדיקטור לשגיאות

  useEffect(() => {
    const fetchEmail = async () => {
      if (!emailId) return; // אם אין מזהה, אין צורך להביא נתונים

      setIsLoading(true);
      setError(null);

      try {
        await emailStore.fetchEmailById(emailId); // קריאה לפונקציה בסטור
        setEmail(emailStore.selectedEmail); // עדכון המייל שהובא
      } catch (err) {
        setError("שגיאה בטעינת המייל. נסה שוב מאוחר יותר.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmail();
  }, [emailId]);

  if (!emailId) {
    return null; // אם אין מזהה מייל, לא מציגים כלום
  }

  if (isLoading) {
    return <div className="loading-indicator">טוען מייל...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!email) {
    return null; // אם אין מייל אחרי טעינה, לא מציגים כלום
  }

  function removeQuotes(text: string) {
    return text.replace(/^"|"$/g, '');
  }

  const sanitizedHtml = DOMPurify.sanitize(email.body);


  return (
    <div className="email-view-container">
      {/* כותרת */}
      <div className="email-header">
        <h1 className="email-title">{email.subject}</h1>
        <p className="email-date">{email.date}</p>
      </div>

      {/* פרטי שולח */}
      <div className="email-sender-info">
        <h3 className="email-sender-name">
          <img
            src={email.profilePicture || "default-avatar.png"}
            className="img-sender"
          />

          {removeQuotes(email.senderName)}
        </h3>
        <p className="email-sender-email">{email.emailSender}</p>
      </div>

      {/* גוף המייל */}
      <div className="email-body">
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
      </div>

      {/* כפתור סגור */}
      <div className="email-actions">
        <Button className="close-button" onClick={onClose}>
          סגור
        </Button>
      </div>
    </div>
  );
};

export default ViewEmail;
