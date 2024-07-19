// src/pages/api/authen/update.ts
import { NextApiRequest, NextApiResponse } from 'next';

import UserService from '../../../../UserServices/UserServices';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    try {
      const updatedUser = await UserService.updateUser(id, updateData);
      return res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}









// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'PUT') {
//     const { id, firstname, lastname, email } = req.body;

//     if (!id || !firstname || !lastname || !email) {
//       return res.status(400).json({ error: 'All fields are required.' });
//     }

//     try {
//       const updatedUser = await prisma.user.update({
//         where: { id },
//         data: { firstname, lastname, email },
//       });

//       return res.status(200).json(updatedUser);
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal server error.' });
//     }
//   } else {
//     res.setHeader('Allow', ['PUT']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

















// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "../../../../UserServices/UserServices";

// export async function POST(req: NextRequest) {
//   try {
//     const { id, firstname, lastname, email, password } = await req.json();

//     if (!id) {
//       return NextResponse.json(
//         { error: "User ID is required." },
//         { status: 400 }
//       );
//     }

//     const updatedUser = await userService.updateUser(id, {
//       firstname,
//       lastname,
//       email,
//       password,
//     });
//     return NextResponse.json(
//       { message: "User updated successfully.", user: updatedUser },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
