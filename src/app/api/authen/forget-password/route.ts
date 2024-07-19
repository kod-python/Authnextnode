// import { NextApiRequest, NextApiResponse } from 'next';
// import { userService } from '../../../../service/UserServices/UserServices';
// import cors, {runMiddleware} from '../../../../middleware/cors';
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await runMiddleware(req, res, cors);

//   if (req.method === 'POST') {
//     try {
//       const { email } = req.body;

//       if (!email) {
//         return res.status(400).json({ error: 'Email is required.' });
//       }

//       const user = await userService.forgetPassword(email);
//       return res.status(200).json({ message: 'Password reset token sent.', user });
//     } catch (error: any) {
//       return res.status(400).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }




// src/pages/api/authen/forget-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required.' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const hashedPassword = await hash(newPassword, 10);

      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return res.status(200).json({ message: 'Password reset successful.' });
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
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email is required." },
//         { status: 400 }
//       );
//     }

//     const user = await userService.forgetPassword(email);
//     return NextResponse.json(
//       { message: "Password reset token sent.", user },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
