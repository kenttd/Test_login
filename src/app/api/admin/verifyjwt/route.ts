import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  const { value } = token;
  try {
    const decoded = jwt.verify(
      value,
      process.env.JWT_SECRET ?? ""
    ) as JwtPayload;
    const { rows } =
      await sql`SELECT name,picture FROM admin_pmb where email = ${decoded.email}`;
    return NextResponse.json({ rows }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}

interface JwtPayload {
  email: string;
}
