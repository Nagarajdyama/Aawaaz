// Simulation of authentication for frontend demo
// In a real application, this would connect to a backend API

export type UserRole = 'citizen' | 'agent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Citizen User',
    email: 'citizen@example.com',
    role: 'citizen',
  },
  {
    id: '2',
    name: 'Field Agent User',
    email: 'agent@example.com',
    role: 'agent',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
];

// Get stored user from localStorage
export const getStoredUser = (): User | null => {
  const userJson = localStorage.getItem('aavaaz-user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Failed to parse stored user:', error);
    return null;
  }
};

// Store user in localStorage
export const storeUser = (user: User): void => {
  localStorage.setItem('aavaaz-user', JSON.stringify(user));
};

// Remove user from localStorage
export const removeStoredUser = (): void => {
  localStorage.removeItem('aavaaz-user');
};

// Mock login function
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (user && password === 'password') { // Simple password check for demo
        storeUser(user);
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

// Mock registration function
export const register = (
  name: string,
  email: string,
  password: string,
  role: UserRole
): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === email);
      
      if (existingUser) {
        reject(new Error('User with this email already exists'));
        return;
      }
      
      // Create new user (in a real app this would be done on the server)
      const newUser: User = {
        id: String(MOCK_USERS.length + 1),
        name,
        email,
        role,
      };
      
      // In a real app, this would be added to the database
      MOCK_USERS.push(newUser);
      
      storeUser(newUser);
      resolve(newUser);
    }, 1000);
  });
};

// Mock logout function
export const logout = (): Promise<void> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      removeStoredUser();
      resolve();
    }, 500);
  });
};