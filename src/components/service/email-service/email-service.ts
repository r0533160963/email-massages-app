import axios from "axios";
import { Email } from "../../../types/email";

// Axios instance setup
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/gmail",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const emailsService = {
  getEmails: async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token is missing. Please log in again.');
    }

    try {
      const res = await axiosInstance.get('/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('res', res);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch emails:', error);
      throw error;
    }
  },

  // פונקציה חדשה להבאת מייל לפי ID
  getEmailById: async (emailId: string) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token is missing. Please log in again.');
    }

    try {
      const res = await axiosInstance.get(`/emails/${emailId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Fetched email by ID:', res.data);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch email by ID:', error);
      throw error;
    }
  },
};

export default emailsService;
