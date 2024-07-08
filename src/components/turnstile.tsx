import Script from "next/script";

export function Turnstile() {
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      ></Script>
      <div
        className="cf-turnstile py-2"
        data-sitekey={process.env.TURNSTILE_SITE_KEY}
        data-callback="javascriptCallback"
      ></div>
    </>
  );
}
