import { PMBForm } from "@/components/PMBForm";
import { LoginButton } from "@/components/loginButton";
import { ModeToggle } from "@/components/mode-toggle";

export default function AdminHome() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4 flex space-x-3">
        <LoginButton />
        <ModeToggle />
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <PMBForm />
      </div>
    </div>
  );
}
