import { hash, compare } from 'bcryptjs';


interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

class UserService {
  private users: User[] = [];

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  async registerUser(userData: Omit<User, 'password'> & { password: string }): Promise<User> {
    const { id, firstname, lastname, email, password } = userData;

    if (this.findUserByEmail(email)) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await hash(password, 10);
    const newUser: User = { id, firstname, lastname, email, password: hashedPassword };
    this.users.push(newUser);
    return newUser;
  }

  async loginUser(email: string, password: string): Promise<User> {
    const user = this.findUserByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new Error('Invalid email or password.');
    }

    return user;
  }
}

export const userService = new UserService();
