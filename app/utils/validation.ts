interface TaskData {
    content: string;
    description: string;
    status: string;
  }
  
  export function validateTask(task: TaskData): string | null {
    if (!task.content) return 'Content is required';
    if (!task.description) return 'Description is required';
    if (!task.status) return 'Status is required';
    return null;
  }
  