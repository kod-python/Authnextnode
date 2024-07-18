import { NextRequest, NextResponse } from 'next/server';
import { userService } from '../../../../services/UserServices/UserServices';

export async function POST(req: NextRequest) {
  try {
    const { id, firstname, lastname, email, password } = await req.json();

    if (!id || !firstname || !lastname || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    await userService.registerUser({ id, firstname, lastname, email, password });
    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
