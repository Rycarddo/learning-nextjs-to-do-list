"use server";
import { prisma } from "@/utils/prisma";

export const UpdateTaskStatus = async (idTask: number) => {
  try {
    const currentTask = await prisma.tasks.findUnique({
      where: { id: idTask },
    });

    if (!currentTask) return;

    const updatedStatus = await prisma.tasks.update({
      where: { id: idTask },
      data: {
        done: !currentTask.done,
      },
    });

    if (!updatedStatus) return;

    return updatedStatus;
  } catch (error) {
    throw error;
  }
};
