import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';


const cors = Cors({
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
//   origin: '*', // Change this to your frontend URL in production
origin: process.env.ALLOWED_ORIGIN || '*',
});


export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;

