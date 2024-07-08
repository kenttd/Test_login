import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(`${process.env.BASE_URL}/admin`, {
    status: 302,
  });

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error");
  const code = searchParams.get("code") ?? "";
  if (error) {
    return Response.json({ error: error });
  } else {
    const { tokens } = await oauth2Client.getToken(code);
    console.log(tokens.access_token);
    const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    const data = await res.json();
    const { rows } =
      await sql`SELECT * FROM admin_pmb where email = ${data.email}`;
    if (rows.length === 0) {
      return Response.redirect("https://youtube.com");
    }
    if (!rows[0].picture) {
      sql`UPDATE admin_pmb SET access_token=${tokens.access_token},refresh_token=${tokens.refresh_token},name=${data.name},picture = ${data.picture} WHERE email = ${data.email}`;
    }
    const token = jwt.sign({ email: data.email }, process.env.JWT_SECRET ?? "");
    response.cookies.set("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }
}
