// src/pages/api/authen/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../../UserServices/UserServices';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    try {
      await UserService.deleteUser(id);
      return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      return res.status(400).json({ error});
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}













// import { NextApiRequest, NextApiResponse } from 'next';

// import prisma from '../../../../lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'DELETE') {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: 'Email is required.' });
//     }

//     try {
//       await prisma.user.delete({
//         where: { email },
//       });

//       return res.status(200).json({ message: 'User deleted successfully.' });
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal server error.' });
//     }
//   } else {
//     res.setHeader('Allow', ['DELETE']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }




// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "../../../../UserServices/UserServices";

// export async function POST(req: NextRequest) {
//   try {
//     const { id } = await req.json();

//     if (!id) {
//       return NextResponse.json(
//         { error: "User ID is required." },
//         { status: 400 }
//       );
//     }

//     userService.deleteUser(id);
//     return NextResponse.json(
//       { message: "User deleted successfully." },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
