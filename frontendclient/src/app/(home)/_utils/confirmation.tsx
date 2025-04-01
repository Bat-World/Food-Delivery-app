import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function LogoutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Logout</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>Do you really want to log out?</DialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" onClick={() => (window.location.href = "/logout")}>
            Yes, Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
