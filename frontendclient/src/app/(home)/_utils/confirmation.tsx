"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LogoutDialog({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("savedLocation");
    push("/login");
    toast("Logged out successfully", { type: "info" });
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
      <DialogContent className="max-w-sm">
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>Do you really want to log out?</DialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Yes, Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
