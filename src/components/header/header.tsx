import React, { useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './header.css';
import { IconButton } from '@mui/material';

interface HeaderProps {
  onSearch: (query: string) => void;
}




const Header: React.FC<HeaderProps> = ({ onSearch }) => {

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // if (event.origin !== window.location.origin) return; // Security check
      if (event.data.accessToken) {
        localStorage.setItem("access_token", event.data.accessToken)
        window.location.reload();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);


  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=158031050764-e27op69lc9fh0jrdij03nf16n22r6id2.apps.googleusercontent.com&redirect_uri=https://email-massages-api.onrender.com/api/gmail/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/gmail.readonly&include_granted_scopes=true&state=`;

  const handleToUrl = () => {
    const popup = window.open(googleLoginUrl, "_blank", "width=500,height=600");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };


  return (
    <div className='header' >
      <h2> לוגו </h2>
      <div className='div-filter'>
        <input
          className="filter"
          placeholder="חיפוש מיילים"
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <IconButton>
          <SettingsIcon className='icon-setting' />
        </IconButton>
        <IconButton onClick={handleToUrl}>
          <AccountCircleIcon className='icon-setting' />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
