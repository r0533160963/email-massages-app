import React, { useState } from "react";
import { Dialog, TextField, Button } from "@mui/material";
import userStore from "../store/user-store/user-store";
import { User } from "../../types/user";
import "./sign-up.css";

interface SignupProps {
  onClose: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose }) => {
  const [newUser, setNewUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleCreateUser = async () => {
    const {  firstName, lastName, email, password } = newUser;

    // בדיקה שכל השדות מלאים
    if ( !firstName || !lastName || !email || !password) {
      alert("כל השדות חובה!");
      return;
    }

    try {
      // קריאה לפונקציית הוספת משתמש ב-Store
      await userStore.addUser(newUser);
      alert("משתמש נוצר בהצלחה!");
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("שגיאה ביצירת משתמש!");
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <div className="signup-container">
        <h2 className="signup-title">רישום משתמש חדש</h2>
        <div className="signup-fields">
          <TextField
            label="שם פרטי"
            variant="outlined"
            margin="normal"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
          />
          <TextField
            label="שם משפחה"
            variant="outlined"
            margin="normal"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
          />
          <TextField
            type="email"
            label="אימייל"
            variant="outlined"
            margin="normal"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <TextField
            label="סיסמה"
            variant="outlined"
            type="password"
            margin="normal"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <Button
            variant="contained"
            className="signup-button"
            onClick={handleCreateUser}
          >
            צור משתמש
          </Button>
          <Button
            variant="outlined"
            fullWidth
            className="signup-cancel-button"
            onClick={onClose}
          >
            ביטול
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default Signup;
