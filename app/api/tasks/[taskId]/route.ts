import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query;

  const task = await prisma.task.findUnique({ where: { id: String(taskId) } });
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(task);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query;
  const { content, description, status } = req.body;

  const task = await prisma.task.update({
    where: { id: String(taskId) },
    data: { content, description, status },
  });

  res.status(200).json(task);
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query;

  await prisma.task.delete({ where: { id: String(taskId) } });
  res.status(204).end();
}
