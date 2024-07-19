// import { NextApiRequest, NextApiResponse } from 'next';
// import { userService } from '../../../../service/UserServices/UserServices';
// import cors, {runMiddleware} from '../../../../middleware/cors';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await runMiddleware(req, res, cors);

//   if (req.method === 'POST') {
//     try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required.' });
//       }

//       const user = await userService.loginUser(email, password);
//       return res.status(200).json({ message: 'Login successful.', user });
//     } catch (error: any) {
//       return res.status(401).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// src/pages/api/authen/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}











// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "../../../../UserServices/UserServices";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required." },
//         { status: 400 }
//       );
//     }

//     await userService.loginUser(email, password);
//     return NextResponse.json({ message: "Login successful." }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 401 });
//   }
// }
