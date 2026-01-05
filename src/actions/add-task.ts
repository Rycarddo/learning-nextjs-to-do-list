"use server";
import { prisma } from "@/utils/prisma";

export const NewTask = async (taskInput: string) => {
  try {
    if (!taskInput) return;

    const newTask = await prisma.tasks.create({
      data: {
        task: taskInput,
        done: false,
      },
    });

    if (!newTask) return;

    return newTask;
  } catch (err) {
    throw err;
  }
};
