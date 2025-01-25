import { User } from "../../../types/user";

const BASE_URL = "https://email-massages-api.onrender.com/api/users";

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "An unexpected error occurred");
  }
  return await response.json();
};

const getUserById = async (userId: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return await response.json();
};

const addUser = async (newUser: User): Promise<User> => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "An unexpected error occurred");
  }
  console.log("Login response:",response );
  return await response.json();

};

const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "An unexpected error occurred");
  }

  return await response.json(); // מחזירים את הנתונים של המשתמש (כולל ID) במקרה של התחברות מוצלחת
};

export default { getUsers, getUserById, addUser, loginUser };
