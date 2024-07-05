import Script from "next/script";
export default function AdminHome() {
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></Script>
      <div
        className="cf-turnstile"
        data-sitekey={process.env.TURNSTILE_SITE_KEY}
        data-callback="javascriptCallback"
      ></div>
      <div>test</div>
    </>
  );
}
