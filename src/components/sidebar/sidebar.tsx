import { Button } from "@mui/material";
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import './sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
       <Button className="button-side"><MoveToInboxIcon className="icon-button"/>דואר נכנס</Button>
       <Button className="button-side"><SendIcon className="icon-button"/>נשלח</Button>
       <Button className="button-side"><DraftsIcon className="icon-button"/>טיוטות</Button>
       <Button className="button-side"><DeleteIcon className="icon-button"/>נמחק</Button>
    </div>
  );
};

export default Sidebar;