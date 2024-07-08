import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const email = data.email;
  await sql`INSERT INTO admin_pmb (email) VALUES (${email})`;
  return NextResponse.json({ message: "Admin added" }, { status: 201 });
}
