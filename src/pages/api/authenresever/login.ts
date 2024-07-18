
// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

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

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Missing email or password' });
//   }

//   const user = users.find(user => user.email === email);
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET as string, {
//     expiresIn: '1h',
//   });

//   res.status(200).json({ token });
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '@/lib/db';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).end();
//   }

//   const { email, password } = req.body;

//   await dbConnect();

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid email or password' });
//   }

//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
//     expiresIn: '1h',
//   });

//   res.status(200).json({ token });
// }
























// // // pages/api/auth/login.ts
// // import { NextApiRequest, NextApiResponse } from 'next';
// // import dbConnect from '@/lib/db';
// // import User from '@/models/User';
// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'POST') {
// //     return res.status(405).end();
// //   }

// //   const { email, password } = req.body;

// //   await dbConnect();

// //   const user = await User.findOne({ email });
// //   if (!user) {
// //     return res.status(400).json({ message: 'Invalid email or password' });
// //   }

// //   const isMatch = await bcrypt.compare(password, user.password);
// //   if (!isMatch) {
// //     return res.status(400).json({ message: 'Invalid email or password' });
// //   }

// //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
// //     expiresIn: '1h',
// //   });

// //   res.status(200).json({ token });
// // }
