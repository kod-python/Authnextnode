import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../../../service/UserServices/UserServices';
import cors, {runMiddleware} from '../../../../middleware/cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    try {
      const users = userService.getAllUsers();
      return res.status(200).json({ users });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
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
