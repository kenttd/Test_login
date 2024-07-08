"use server";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  console.log("request", request);
  const body = await request.formData();
  const username = body.get("username") as string;
  const password = body.get("password") as string;
  const email = body.get("email") as string;
  const periode = body.get("periode") as string;
  const jurusan = body.get("jurusan") as string;
  const dob = body.get("dob") as string;
  const jk = body.get("jk") as string;

  //MASIH BELUM BISA VERIFY TURNSTILE

  // const token = body.get("cf-turnstile-response") ?? "";
  // const ip = request.headers.get("CF-Connecting-IP") ?? "";
  // console.log("token", token);
  // console.log("ip", ip);
  // let formData = new FormData();
  // formData.append("secret", process.env.TURNSTILE_SECRET_KEY ?? "");
  // formData.append("response", token);
  // formData.append("remoteip", ip);
  // const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  // const result = await fetch(url, {
  //   body: formData,
  //   method: "POST",
  // });
  // const outcome = await result.json();
  // console.log("outcome", outcome);
  // if (outcome.success) {

  // }
  if (username && password && email && periode && jurusan && dob && jk) {
    try {
      await sql`INSERT INTO mhsbaru_pmb (username, password, email, periode, jurusan, dob, jk) VALUES (${username}, ${password}, ${email}, ${periode}, ${jurusan}, ${dob}, ${jk})`;
      return new NextResponse("Berhasil mendaftar", { status: 201 });
    } catch (error) {
      console.log(error);
      return new NextResponse("Gagal mendaftar", { status: 400 });
    }
  }

  return new NextResponse("Gagal mendaftar", { status: 400 });
}
