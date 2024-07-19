// // pages/api/authen/users.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import UserService from '@/services/UserService';
// import cors, { runMiddleware } from '@/lib/middleware';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Apply CORS middleware
//   await runMiddleware(req, res, cors);

//   switch (req.method) {
//     case 'GET':
//       try {
//         const users = await UserService.getAllUsers();
//         return res.status(200).json(users);
//       } catch (error) {
//         return res.status(500).json({ error: 'Failed to fetch users.' });
//       }
//     case 'POST':
//       try {
//         const user = await UserService.createUser(req.body);
//         return res.status(201).json(user);
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }
//     case 'PUT':
//       // Handle PUT request (e.g., update user)
//       break;
//     case 'DELETE':
//       // Handle DELETE request (e.g., delete user)
//       break;
//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }



import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../../UserServices/UserServices';
import cors, { runMiddleware } from '../../../../middleware/cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
  if (req.method === 'GET') {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "../../../../service/UserServices/UserServices";

// export async function GET(req: NextRequest) {
//   try {
//     const users = userService.getAllUsers();
//     return NextResponse.json({ users }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
