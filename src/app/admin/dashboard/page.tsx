import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AgentForm from "@/components/admin/AgentForm";
import { AgentList } from "@/components/admin/AgentList";

const page = () => {
  return (
    // Wrapper
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Set up your Chat Bot</div>
        <div className="float-right">
          <Dialog>
            <DialogTrigger>
              {" "}
              <Button asChild>
                <div className="bg-primary-brand text-primary-foreground hover:bg-primary-brand/90 shadow-xs">
                  Add agent +
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new agent</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new agent for your chat bot.
                </DialogDescription>
                {/* Form for adding new agent can be added here */}
                <AgentForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <AgentList />
    </div>
  );
};

export default page;
