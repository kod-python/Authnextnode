import { NextRequest, NextResponse } from 'next/server';
import { userService } from '../../../../services/UserServices/UserServices';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    await userService.loginUser(email, password);
    return NextResponse.json({ message: 'Login successful.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
