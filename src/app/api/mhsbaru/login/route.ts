import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const username = res.username;
    const password = res.password;
    const { rows } =
      await sql`SELECT * FROM mhsbaru_pmb WHERE username = ${username} AND password = ${password}`;
    if (rows.length === 0) {
      return NextResponse.json({ message: "Gagal login" }, { status: 400 });
    } else {
      const token = jwt.sign(
        { username: username },
        process.env.JWT_SECRET ?? ""
      );
      return NextResponse.json(
        { message: "Berhasil login", token },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  //   const body = await request.text();
  //   const params = new URLSearchParams(body);
  //   const username = params.get("username");
  //   return NextResponse.json({ username });
}
