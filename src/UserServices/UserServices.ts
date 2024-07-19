
import prisma from '../lib/prisma';
import { hash, compare } from 'bcryptjs';

type UserData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

class UserService {
  static async createUser(data: UserData) {
    const { firstname, lastname, email, password } = data;
    
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already exists.');
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });
    return user;
  }

  static async getUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async updateUser(id: number, updateData: Partial<UserData>) {
    const { password, ...rest } = updateData;
    const updatedData: Partial<UserData> = { ...rest };

    if (password) {
      updatedData.password = await hash(password, 10);
    }

    return prisma.user.update({
      where: { id },
      data: updatedData,
    });
  }

  static async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }

  static async resetPassword(id: number, newPassword: string) {
    const hashedPassword = await hash(newPassword, 10);
    return prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  static async verifyUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found.');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    return user;
  }


  static async getAllUsers() {
    return prisma.user.findMany();
  }


}

export default UserService;






























// import { hash, compare } from "bcryptjs";

// interface User {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
// }

// class UserService {
//   private users: User[] = [];

//   findUserByEmail(email: string): User | undefined {
//     return this.users.find((user) => user.email === email);
//   }

//   findUserById(id: number): User | undefined {
//     return this.users.find((user) => user.id === id);
//   }

//   getAllUsers(): User[] {
//     return this.users;
//   }

//   validatePassword(password: string): boolean {
//     const passwordRegex =
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     return passwordRegex.test(password);
//   }

//   async registerUser(
//     userData: Omit<User, "password"> & { password: string }
//   ): Promise<User> {
//     const { id, firstname, lastname, email, password } = userData;

//     if (this.findUserByEmail(email)) {
//       throw new Error("User already exists.");
//     }

//     if (!this.validatePassword(password)) {
//       throw new Error(
//         "Password must be at least 8 characters long, include at least one letter, one number, and one special character."
//       );
//     }

//     const hashedPassword = await hash(password, 10);
//     const newUser: User = {
//       id,
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword,
//     };
//     this.users.push(newUser);
//     return newUser;
//   }

//   async loginUser(email: string, password: string): Promise<User> {
//     const user = this.findUserByEmail(email);

//     if (!user || !(await compare(password, user.password))) {
//       throw new Error("Invalid email or password.");
//     }

//     return user;
//   }

//   async updateUser(
//     id: number,
//     updates: Partial<Omit<User, "id" | "password">> & { password?: string }
//   ): Promise<User> {
//     const user = this.findUserById(id);

//     if (!user) {
//       throw new Error("User not found.");
//     }

//     if (updates.firstname) user.firstname = updates.firstname;
//     if (updates.lastname) user.lastname = updates.lastname;
//     if (updates.email) user.email = updates.email;
//     if (updates.password) {
//       if (!this.validatePassword(updates.password)) {
//         throw new Error(
//           "Password must be at least 8 characters long, include at least one letter, one number, and one special character."
//         );
//       }
//       user.password = await hash(updates.password, 10);
//     }

//     return user;
//   }

//   deleteUser(id: number): void {
//     const userIndex = this.users.findIndex((user) => user.id === id);

//     if (userIndex === -1) {
//       throw new Error("User not found.");
//     }

//     this.users.splice(userIndex, 1);
//   }

//   async forgetPassword(email: string): Promise<User> {
//     const user = this.findUserByEmail(email);

//     if (!user) {
//       throw new Error("User not found.");
//     }

//     user.password = await hash("temporaryPassword", 10);

//     return user;
//   }

//   async resetPassword(email: string, newPassword: string): Promise<User> {
//     const user = this.findUserByEmail(email);

//     if (!user) {
//       throw new Error("User not found.");
//     }

//     if (!this.validatePassword(newPassword)) {
//       throw new Error(
//         "Password must be at least 8 characters long, include at least one letter, one number, and one special character."
//       );
//     }

//     user.password = await hash(newPassword, 10);
//     return user;
//   }
// }

// export const userService = new UserService();
