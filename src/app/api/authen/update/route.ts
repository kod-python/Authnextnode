// import { NextApiRequest, NextApiResponse } from 'next';
// import { userService } from '../../../../service/UserServices/UserServices';
// import cors, {runMiddleware} from '../../../../middleware/cors';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await runMiddleware(req, res, cors);

//   if (req.method === 'POST') {
//     try {
//       const { id, ...updates } = req.body;

//       if (!id) {
//         return res.status(400).json({ error: 'User ID is required.' });
//       }

//       const updatedUser = await userService.updateUser(id, updates);
//       return res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
//     } catch (error: any) {
//       return res.status(400).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }




import { NextRequest, NextResponse } from "next/server";
import { userService } from "../../../../service/UserServices/UserServices";

export async function POST(req: NextRequest) {
  try {
    const { id, firstname, lastname, email, password } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const updatedUser = await userService.updateUser(id, {
      firstname,
      lastname,
      email,
      password,
    });
    return NextResponse.json(
      { message: "User updated successfully.", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
