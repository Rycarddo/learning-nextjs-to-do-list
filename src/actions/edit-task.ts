"use server";
import { prisma } from "@/utils/prisma";

export const UpdateTask = async (idTask: number, taskUpdated: string) => {
  if (!idTask) return;

  await prisma.tasks.update({
    where: { id: idTask },
    data: {
      task: taskUpdated,
    },
  });
};
