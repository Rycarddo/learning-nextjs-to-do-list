import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  List,
  Check,
  CircleEllipsis,
  SquarePen,
  Trash2,
  ListChecks,
  ListCheck,
  Sigma,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input type="text" placeholder="Task name" />
          <Button className="cursor-pointer">
            <Plus /> Add Task
          </Button>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="flex mt-4 gap-2">
            <Badge className="cursor-pointer" variant={"default"}>
              <List /> All
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <CircleEllipsis /> To do
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <Check /> Done
            </Badge>
          </div>

          <div className="mt-4 border-b-1">
            <div className="h-12 flex justify-between items-center border-t-1">
              <div className="bg-purple-300 w-1 h-full"></div>
              <p className="flex-1 px-2 text-sm">Task 1</p>
              <div className="flex justify-end items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <SquarePen className="cursor-pointer" />
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit task</DialogTitle>
                    </DialogHeader>
                    <DialogClose className="flex gap-2">
                      <Input placeholder="Edit task" />
                      <Button className="cursor-pointer">Save</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
                <Trash2 className="cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex justify-between my-2">
            <div className="flex gap-2 items-center">
              <ListChecks size={16} />
              <p className="text-sm">Completed tasks (0/1)</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"outline"} className="cursor-pointer text-sm">
                  <Trash2 /> Clear tasks
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure that you want to delete x items?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your tasks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Yes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-md my-4">
            <div
              className="h-full bg-purple-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center gap-2">
            <Sigma size={18} />
            <p>1 Task(s)</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
