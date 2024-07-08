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
import { useState } from "react";
import { toast } from "sonner";

export function AddAdminButton() {
  const [email, setEmail] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Admin</DialogTitle>
          <DialogDescription>Email admin:</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              onInput={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              add(email);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function add(email: string) {
  fetch("/api/admin/addAdmin", {
    method: "POST",
    body: JSON.stringify({ email }),
  }).then((res) => {
    if (res.ok) {
      toast.success("Admin added");
    } else {
      toast.error("Failed to add admin");
    }
  });
  toast.loading("Adding admin...");
}
