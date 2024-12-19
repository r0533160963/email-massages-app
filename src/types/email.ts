export interface Email {
  id: string;
  emailSender: string;
  senderName: string;
  profilePicture:string;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
}