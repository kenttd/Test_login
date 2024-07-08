"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { useState } from "react";
import { toast } from "sonner";
import { set } from "date-fns";
import { setCookie } from "@/app/actions";
import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Masukkan username dan password yang sudah didaftarkan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              className="col-span-3"
              placeholder="Masukkan username"
              onInput={(e) => {
                setUsername(e.currentTarget.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              className="col-span-3"
              placeholder="Masukkan password"
              type="password"
              onInput={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          {!loading ? (
            <Button
              type="submit"
              onClick={() => {
                login(setLoading, username, password, router);
              }}
            >
              Login
            </Button>
          ) : (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

async function login(
  setLoading: any,
  username: string,
  password: string,
  router: any
) {
  setLoading(true);
  fetch("/api/mhsbaru/login", {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
  }).then(async (res) => {
    if (res.status === 200) {
      toast.success("Berhasil login");
      const data = await res.json();
      await setCookie("token_mhsbaru", data.token);
      router.push("/mhsbaru/");
    } else {
      toast.error("Gagal login");
      setLoading(false);
    }
  });
}
