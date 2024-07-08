import { sql } from "@vercel/postgres";
export async function POST(request: Request) {
  const data = await request.json();
  const username = data.username;
  await sql`UPDATE mhsbaru_pmb SET status='Accepted' WHERE username=${username}`;
  return new Response("Accepted", { status: 200 });
}
