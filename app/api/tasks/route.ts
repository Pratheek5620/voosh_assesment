import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';
import { validateTask } from '@/app/utils/validation';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const tasks = await prisma.task.findMany();
  res.status(200).json(tasks);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { content, description, status } = req.body;

  const error = validateTask({ content, description, status });
  if (error) {
    return res.status(400).json({ error });
  }

  const task = await prisma.task.create({
    data: { content, description, status },
  });

  res.status(201).json(task);
}
