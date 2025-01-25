import { observable, action, makeObservable, runInAction } from "mobx";
import userService from "../../service/user-service/user-service"; // ודא שהשירות מחזיר את הטיפוס המתאים
import { User } from "../../../types/user"; // ייבוא הטיפוס של היוזר

class UserStore {
  users: User[] = []; // מערך היוזרים שנמשכים מהשרת
  isFetchingUsers: boolean = false; // אינדיקטור האם יש משיכת יוזרים פעילה
  fetchError: string | null = null; // שגיאת פטצ'ינג
  selectedUser: User | null = null; // יוזר שנבחר

  // שדות עבור הלוגין
  email: string = ""; // המייל של המשתמש
  password: string = ""; // הסיסמה של המשתמש
  isAuthenticated: boolean = false; // סטטוס האם המשתמש מחובר
  authError: string | null = null; // שגיאת לוגין
  isLoggingIn: boolean = false; // אינדיקטור האם יש בקשה להתחברות
  userId = "";

  constructor() {
    makeObservable(this, {
      users: observable,
      isFetchingUsers: observable,
      fetchError: observable,
      selectedUser: observable,
      email: observable,
      password: observable,
      isAuthenticated: observable,
      authError: observable,
      isLoggingIn: observable,
      fetchUsers: action,
      fetchUserById: action,
      addUser: action,
      login: action,
      setEmail: action,
      setPassword: action,
      setIsAuthenticated: action,
      setAuthError: action,
      setIsLoggingIn: action,
      setUsers: action,
      setIsFetchingUsers: action,
      setFetchError: action,
      setSelectedUser: action,
    });
  }

  // פונקציה להורדת כל היוזרים
  async fetchUsers() {
    this.setIsFetchingUsers(true);
    this.setFetchError(null);

    try {
      const data: User[] = await userService.getUsers();
      console.log("Users fetched:", data);
      runInAction(() => {
        this.setUsers(data);
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
        this.setIsFetchingUsers(false);
        console.log("fetchUsers finished");
      });
    }
  }

  // פונקציה להורדת יוזר לפי ID
  async fetchUserById(userId: string) {
    this.setIsFetchingUsers(true);
    this.setFetchError(null);

    try {
      const user: User = await userService.getUserById(userId);
      console.log("Fetched user by ID:", user);
      runInAction(() => {
        this.setSelectedUser(user);
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
        this.setIsFetchingUsers(false);
        console.log("fetchUserById finished");
      });
    }
  }

  // פונקציה להוספת יוזר
  async addUser(newUser: User) {
    this.setFetchError(null);

    try {
      const createdUser: User = await userService.addUser(newUser);
      console.log("User added:", createdUser);
      runInAction(() => {
        this.users.push(createdUser);
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred";
      runInAction(() => {
        this.setFetchError(errorMessage);
      });
    }
  }

  // פונקציה עבור התחברות
  async login() {
    this.setIsLoggingIn(true);
    this.setAuthError(null);

    try {
      const data = await userService.loginUser(this.email, this.password); // יש לשלוח את המייל והסיסמה
      runInAction(() => {
        this.setIsAuthenticated(true);
        this.setAuthError(null);
        this.userId = data.user._id; // שמירת ה-ID
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      runInAction(() => {
        this.setAuthError(errorMessage);
      });
    } finally {
      runInAction(() => {
        this.setIsLoggingIn(false);
        console.log("Login process finished");
      });
    }
  }

  // עדכון המייל
  setEmail(email: string) {
    this.email = email;
  }

  // עדכון הסיסמה
  setPassword(password: string) {
    this.password = password;
  }

  // עדכון סטטוס ההתחברות
  setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

  // עדכון שגיאת התחברות
  setAuthError(authError: string | null) {
    this.authError = authError;
  }

  // עדכון מצב של התחברות
  setIsLoggingIn(isLoggingIn: boolean) {
    this.isLoggingIn = isLoggingIn;
  }

  // עדכון רשימת היוזרים
  setUsers(users: User[]) {
    this.users = users.slice();
  }

  setIsFetchingUsers(isFetching: boolean) {
    this.isFetchingUsers = isFetching;
  }

  setFetchError(fetchError: string | null) {
    this.fetchError = fetchError;
  }

  setSelectedUser(user: User | null) {
    this.selectedUser = user;
  }
}

export default new UserStore();