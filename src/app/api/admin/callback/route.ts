import { google } from "googleapis";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
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
    return Response.json({ tokens, data });
  }
}
