import React, { useState } from "react";
import { Tabs, Tab, Checkbox, IconButton, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from '@mui/icons-material/Inbox';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './email-list-header.css';
import { Email } from "../../types/email";

interface EmailListHeaderProps {
  indeterminate: boolean;
  onNextPage: () => void; // פונקציה למעבר לעמוד הבא
  onPreviousPage: () => void; // פונקציה למעבר לעמוד הקודם
  currentPage: number; // העמוד הנוכחי
  totalPages: number; // סך הכל עמודים
  activeTab: string; // נוסיף פרופס ל-activeTab
  setActiveTab: (tab: string) => void; // פונקציה לעדכון הטאב הנבחר
}

const EmailListHeader: React.FC<EmailListHeaderProps> = ({
  onNextPage,
  onPreviousPage,
  currentPage,
  totalPages,
  activeTab,
  setActiveTab,
}) => {

 

  return (
    <>
      <div className="header-list">
        <div>
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="icon-button-header">
          <div className="last-next-page">עמוד {currentPage} מתוך {totalPages}</div>
          <div>
            <IconButton onClick={onPreviousPage} disabled={currentPage === 1}>
              <ChevronRightIcon />
            </IconButton>
            <IconButton onClick={onNextPage} disabled={currentPage === totalPages}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="custom-tabs">
        <Button className={`custom-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >inbox<InboxIcon className="icon-tab" /></Button>

        <Button className={`custom-tab ${activeTab === "github" ? "active" : ""}`}
          onClick={() => setActiveTab("github")}
        >GitHub<GitHubIcon className="icon-tab" /></Button>

        <Button className={`custom-tab ${activeTab === "aws" ? "active" : ""}`}
          onClick={() => setActiveTab("aws")}
        >AWS<CloudUploadIcon className="icon-tab" /></Button>
      </div>
    </>
  );
};


export default EmailListHeader;
