import { observable, action, makeObservable, runInAction } from "mobx";
import emailsService from "../email-service/email-service"; // ודא שהשירות מחזיר את הטיפוס המתאים
import { Email } from "../../types/email";

class EmailStore {
  emails: Email[] = []; // מערך המיילים שנמשכים מהשרת
  isFetchingEmails: boolean = false; // אינדיקטור האם יש משיכת מיילים פעילה
  fetchError: string | null = null; // שגיאת פטצ'ינג
  selectedEmail: Email | null = null; // מייל שנבחר

  constructor() {
    makeObservable(this, {
      emails: observable,
      isFetchingEmails: observable,
      fetchError: observable,
      selectedEmail: observable,
      fetchEmails: action,
      setEmails: action,
      setIsFetchingEmails: action,
      setFetchError: action,
      setSelectedEmail: action,
      fetchEmailById: action,
    });
  }

  // פונקציה להורדת כל המיילים
  async fetchEmails() {
    this.setIsFetchingEmails(true);
    this.setFetchError(null);

    try {
      const data: Email[] = await emailsService.getEmails();
      console.log("Emails fetched:", data);
      runInAction(() => {
        this.setEmails(data);
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred";
      runInAction(() => {
        this.setFetchError(errorMessage);
      });
    } finally {
      runInAction(() => {
        this.setIsFetchingEmails(false);
        console.log("fetchEmails finished");
      });
    }
  }

  // פונקציה להורדת מייל לפי ID
  async fetchEmailById(emailId: string) {
    this.setIsFetchingEmails(true);
    this.setFetchError(null);

    try {
      const email: Email = await emailsService.getEmailById(emailId);
      console.log("Fetched email by ID:", email);
      runInAction(() => {
        this.setSelectedEmail(email);
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred";
      runInAction(() => {
        this.setFetchError(errorMessage);
      });
    } finally {
      runInAction(() => {
        this.setIsFetchingEmails(false);
        console.log("fetchEmailById finished");
      });
    }
  }

  setEmails(emails: Email[]) {
    this.emails = emails.slice(); // מעדכן את רשימת המיילים
  }

  setIsFetchingEmails(isFetching: boolean) {
    this.isFetchingEmails = isFetching;
  }

  setFetchError(fetchError: string | null) {
    this.fetchError = fetchError;
  }

  setSelectedEmail(email: Email | null) {
    this.selectedEmail = email;
  }
}

export default new EmailStore();
