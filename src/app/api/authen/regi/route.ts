// import { NextApiRequest, NextApiResponse } from 'next';
// import { userService } from '../../../../service/UserServices/UserServices';
// import cors, {runMiddleware} from '../../../../middleware/cors';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await runMiddleware(req, res, cors);

//   if (req.method === 'POST') {
//     try {
//       const { id, firstname, lastname, email, password } = req.body;

//       if (!id || !firstname || !lastname || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required.' });
//       }

//       const newUser = await userService.registerUser({ id, firstname, lastname, email, password });
//       return res.status(201).json({ message: 'User registered successfully.', user: newUser });
//     } catch (error: any) {
//       return res.status(400).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../../../lib/prisma';
import cors, { runMiddleware } from '../../../../middleware/cors';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
  if (req.method === 'POST') {
    const { id, firstname, lastname, email, password } = req.body;

    if (!id || !firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
      }

      const hashedPassword = await hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          id,
          firstname,
          lastname,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}




// // RESERVE

// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "../../../../UserServices/UserServices";

// export async function POST(req: NextRequest) {
//   try {
//     const { id, firstname, lastname, email, password } = await req.json();

//     if (!id || !firstname || !lastname || !email || !password) {
//       return NextResponse.json(
//         { error: "All fields are required." },
//         { status: 400 }
//       );
//     }

//     const newUser = await userService.registerUser({
//       id,
//       firstname,
//       lastname,
//       email,
//       password,
//     });
//     return NextResponse.json(
//       { message: "User registered successfully.", user: newUser },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
