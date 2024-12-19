import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import EmailListHeader from "../email-list-header/email-list-header";
import emailStore from "../email-store/email-store";
import { Email } from "../../types/email";
import "./email-list.css";

interface EmailListProps {
  onSelectEmail: (email: Email) => void;
  searchQuery: string;
}

const EmailList: React.FC<EmailListProps> = observer(({ onSelectEmail, searchQuery }) => {
  const { emails, fetchEmails, isFetchingEmails } = emailStore;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("all");
  const emailsPerPage = 20;

  useEffect(() => {
    const fetchEmailsFromStore = async () => {
      await emailStore.fetchEmails();
    };
    fetchEmailsFromStore();
  }, []);

 

  // פונקציית פילטור לפי טאב
  const filterEmailsByTab = (emails: Email[]): Email[] => {
    if (activeTab === "github") {
      return emails.filter((email) => email.emailSender.includes("github.com"));
    }
    if (activeTab === "aws") {
      return emails.filter((email) => email.emailSender.includes("aws.com"));
    }
    return emails; // ברירת מחדל - כל המיילים
  };

  // פילטור לפי טאב וחיפוש
  const filteredEmails = filterEmailsByTab(emails).filter(
    (email) =>
      email.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // חישוב עמודים
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = filteredEmails.slice(indexOfFirstEmail, indexOfLastEmail);

  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // פונקציות עזר
  const limitCharacters = (text: string, limit: number) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const stripHtmlTags = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const removeQuotes = (text: string) => {
    return text.replace(/^"|"$/g, "");
  };

  return (
    <>
      <EmailListHeader
        indeterminate={false}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        currentPage={currentPage}
        totalPages={totalPages}
        activeTab={activeTab} // העברת activeTab
        setActiveTab={setActiveTab} // העברת הפונקציה לשינוי הטאב
      />
      <div className="email-list">
        {isFetchingEmails ? (
          <div className="loading-indicator">Loading emails...</div>
        ) : (
          <>
            {currentEmails.length > 0 ? (
              currentEmails.map((email) => {
                const plainTextBody = stripHtmlTags(email.body);
                return (
                  <div
                    key={email.id}
                    className={`email-item ${email.isRead ? "read" : "unread"}`}
                    onClick={() => onSelectEmail(email)}
                  >
                    <div className="sender">
                      <div className="email-sender">
                        <img
                          src={email.profilePicture}
                          className="img-sender"
                        />
                        {removeQuotes(email.senderName)}
                      </div>
                    </div>
                    <div className="subject-body">
                      <div className="email-subject">{email.subject}</div>
                      <div className="email-body">{limitCharacters(plainTextBody, 30)}</div>
                    </div>
                    <div className="email-date">{email.date}</div>
                  </div>
                );
              })
            ) : (
              <div>לא נמצאו מיילים</div>
            )}
          </>
        )}
      </div>
    </>
  );
});

export default EmailList;
