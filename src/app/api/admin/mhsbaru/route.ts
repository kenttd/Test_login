"use server";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function GET(req: any, res: any) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const status = params.get("status");
  console.log("status", status);
  const { rows } =
    await sql`SELECT username,email,periode,jurusan,dob,created_at FROM mhsbaru_pmb WHERE status=${status}`;
  return NextResponse.json({ data: rows }, { status: 200 });
}
