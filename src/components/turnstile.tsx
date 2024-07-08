// import Script from "next/script";
// import { useRef, useEffect } from "react";

// export function Turnstile({ onVerify }: { onVerify: (token: string) => void }) {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleCallback = (token: string) => {
//       onVerify(token);
//     };

//     // @ts-ignore
//     window.onloadTurnstileCallback = () => {
//       if (ref.current) {
//         // @ts-ignore
//         window.turnstile.render(ref.current, {
//           sitekey: process.env.TURNSTILE_SITE_KEY,
//           callback: handleCallback,
//         });
//       }
//     };
//   }, [onVerify]);

//   return (
//     <>
//       <Script
//         src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
//         async
//         defer
//       />
//       <div ref={ref} />
//     </>
//   );
// }
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
