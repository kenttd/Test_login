"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function AdminHome() {
  const { push } = useRouter();
  const [googleUrl, setGoogleUrl] = useState(null);
  useEffect(() => {
    fetch("/api/admin/getGoogleUrl")
      .then((res) => res.json())
      .then((data) => {
        setGoogleUrl(data.url);
      });
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            push(googleUrl ?? "");
          }}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
}
