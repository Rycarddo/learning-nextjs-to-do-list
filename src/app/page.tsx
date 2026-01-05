"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  ListChecks,
  Sigma,
  LoaderCircle,
  Percent,
} from "lucide-react";
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
import EditTask from "@/components/edit-task";
import Filter from "@/components/filter";
import { getTasks } from "@/actions/get-tasks-from-db";
import { useEffect, useState } from "react";
import { Tasks } from "@/generated/prisma/client";
import { NewTask } from "@/actions/add-task";
import { DeleteTask } from "@/actions/delete-task";
import { toast } from "sonner";
import { UpdateTaskStatus } from "@/actions/toggle-done";
import { FilterType } from "@/components/filter";

const Home = () => {
  type FilterType = "all" | "pending" | "done";
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);
  const completedTasks = taskList.filter((task) => task.done == true).length;

  const handleGetTasks = async () => {
    const tasks = await getTasks();

    if (!tasks) return;

    setTaskList(tasks);
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (!task || task.length === 0) {
        toast.warning("You need to write something");
        setLoading(false);
        return;
      }

      const myNewTask = await NewTask(task);

      if (!myNewTask) return;

      setTask("");

      toast.success("Task added with success");

      await handleGetTasks();
    } catch (err) {
      throw err;
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id: number) => {
    try {
      if (!id) return;

      const myDeletedTask = await DeleteTask(id);

      if (!myDeletedTask) return;

      toast.warning("Task deleted with success");

      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTask = async (idTask: number) => {
    const previousTasks = [...taskList];

    try {
      setTaskList((prev) => {
        const updatedTaskList = prev.map((task) => {
          if (task.id === idTask) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });

        return updatedTaskList;
      });
      await UpdateTaskStatus(idTask);
    } catch (error) {
      setTaskList(previousTasks);
      throw error;
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList);
        break;
      case "pending":
        setFilteredTasks(
          taskList.filter((task) => {
            return task.done == false;
          })
        );
        break;
      case "done":
        setFilteredTasks(
          taskList.filter((task) => {
            return task.done === true;
          })
        );
        break;
    }
  }, [currentFilter, taskList]);

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            type="text"
            placeholder="Task name"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button className="cursor-pointer" onClick={handleAddTask}>
            {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
            Add Task
          </Button>
        </CardHeader>
        <CardContent>
          <Separator />
          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
          <div className="mt-4 border-b">
            {taskList.length === 0 && (
              <p className="text-xs my-4 pt-4 border-t">
                You don't have tasks to do.
              </p>
            )}

            {filteredTasks.length === 0 && currentFilter === "pending" && (
              <p className="text-xs my-4 pt-4 border-t">
                You don't have pending tasks to do.
              </p>
            )}

            {filteredTasks.length === 0 && currentFilter === "done" && (
              <p className="text-xs my-4 pt-4 border-t">
                You haven't done any task yet.
              </p>
            )}

            {filteredTasks.map((task) => (
              <div
                className="h-12 flex justify-between items-center border-t"
                key={task.id}
              >
                <div
                  className={`${
                    task.done
                      ? "bg-green-300 w-1 h-full"
                      : "bg-red-300 w-1 h-full"
                  }`}
                ></div>
                <p
                  className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-500"
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.task}
                </p>
                <div className="flex justify-end items-center gap-2">
                  <EditTask task={task} handleGetTasks={handleGetTasks} />

                  <Trash2
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between my-2">
            <div className="flex gap-2 items-center">
              <ListChecks size={16} />
              <p className="text-sm">
                Completed tasks (
                {taskList.filter((task) => task.done === true).length}/
                {taskList.length})
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"outline"} className="cursor-pointer text-sm">
                  <Trash2 /> Clear completed tasks
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
                  <AlertDialogAction
                    onClick={() =>
                      taskList
                        .filter((task) => task.done === true)
                        .forEach((task) => handleDeleteTask(task.id))
                    }
                  >
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-md my-4">
            <div
              className="h-full bg-purple-500 rounded-md"
              style={{
                width: `${(completedTasks / taskList.length) * 100}%`,
              }}
            ></div>
          </div>

          <div className="flex justify-end items-center gap-2">
            <Sigma size={18} />
            <p>{taskList.length} Task(s)</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
