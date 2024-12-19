import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './header.css';
import { IconButton } from '@mui/material';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=158031050764-e27op69lc9fh0jrdij03nf16n22r6id2.apps.googleusercontent.com&redirect_uri=http://localhost:4000/api/gmail/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/gmail.readonly&include_granted_scopes=true&state=`;

  const handleToUrl = () => {
    window.location.href = googleLoginUrl;
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
