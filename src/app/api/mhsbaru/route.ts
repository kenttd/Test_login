"use server";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const email = formData.get("email") as string;
  const periode = formData.get("periode") as string;
  const jurusan = formData.get("jurusan") as string;
  const dob = formData.get("dob") as string;
  const jk = formData.get("jk") as string;
  if (username && password && email && periode && jurusan && dob && jk) {
    try {
      await sql`INSERT INTO mhsbaru_pmb (username, password, email, periode, jurusan, dob, jk) VALUES (${username}, ${password}, ${email}, ${periode}, ${jurusan}, ${dob}, ${jk})`;
      return new NextResponse("Berhasil mendaftar", { status: 201 });
    } catch (error) {
      console.log(error);
      return new NextResponse("Gagal mendaftar", { status: 400 });
    }
  }
  return new NextResponse("Gagal mendaftar", { status: 4000 });
}
