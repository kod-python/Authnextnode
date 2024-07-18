// // pages/api/auth/register.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';

// interface User {
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
// }

// const users: User[] = [];

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).end();
//   }

//   const { firstname, lastname, email, password } = req.body;

//   if (!firstname || !lastname || !email || !password) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   const existingUser = users.find(user => user.email === email);
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser: User = {
//     firstname,
//     lastname,
//     email,
//     password: hashedPassword,
//   };

//   users.push(newUser);

//   res.status(201).json({ message: 'User registered successfully' });
// }



// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstname, lastname, email, password } = req.body;

  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
}
