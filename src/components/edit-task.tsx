import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tasks } from "@/generated/prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { UpdateTask } from "@/actions/edit-task";

type TaskProps = {
  task: Tasks;
  handleGetTasks: () => void;
};

const EditTast = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEditTask = () => {
    try {
      if (task.task !== editedTask) {
        UpdateTask(task.id, editedTask);
        handleGetTasks();
        toast.success("Task edited");
      } else {
        toast.error("You need to change the task name");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            placeholder="Edit task"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Save
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTast;
