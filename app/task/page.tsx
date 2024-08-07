"use client";

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import {
  Container, Header, LogoutButton, ControlPanel, AddTaskButton, SearchBar, SortSelect, Board,
  ColumnContainer, ColumnTitle, TaskCard, TaskActions, DeleteButton, EditButton, ViewDetailsButton
} from '@/components/UI/StyledComponents';
import TaskDetailModal from '@/components/UI/TaskDetailModal';
import EditTaskModal from '@/components/UI/EditTaskModal';
import { Task } from '@/components/types';

interface TaskType {
  id: string;
  content: string;
  description: string;
  createdAt: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

const initialTasks: { [key: string]: TaskType } = {
  'task-1': { id: 'task-1', content: 'Task 1', description: 'Description 1', createdAt: '01/09/2021, 05:30:00' },
  'task-2': { id: 'task-2', content: 'Task 2', description: 'Description 2', createdAt: '01/09/2021, 05:30:00' },
  'task-3': { id: 'task-3', content: 'Task 3', description: 'Description 3', createdAt: '01/09/2024, 05:30:00' },
  'task-4': { id: 'task-4', content: 'Task 4', description: 'Description 4', createdAt: '01/09/2024, 05:30:00' },
  'task-5': { id: 'task-5', content: 'Task 5', description: 'Description 5', createdAt: '01/09/2021, 05:30:00' },
  'task-6': { id: 'task-6', content: 'Task 6', description: 'Description 6', createdAt: '01/09/2021, 05:30:00' },
};

const initialColumns: Column[] = [
  { id: 'todo', title: 'TODO', taskIds: ['task-1', 'task-2', 'task-3'] },
  { id: 'in-progress', title: 'IN PROGRESS', taskIds: ['task-4', 'task-5'] },
  { id: 'done', title: 'DONE', taskIds: ['task-6'] },
];

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [isTaskDetailModalOpen, setIsTaskDetailModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns.find(col => col.id === source.droppableId);
    const finish = columns.find(col => col.id === destination.droppableId);

    if (start && finish) {
      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        setColumns(columns.map(col => (col.id === newColumn.id ? newColumn : col)));
      } else {
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
          ...start,
          taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
          ...finish,
          taskIds: finishTaskIds,
        };

        setColumns(columns.map(col => {
          if (col.id === newStart.id) return newStart;
          if (col.id === newFinish.id) return newFinish;
          return col;
        }));
      }
    }
  };

  const handleViewDetails = (task: TaskType) => {
    setSelectedTask(task);
    setIsTaskDetailModalOpen(true);
  };

  const handleEditTask = (task: TaskType) => {
    setSelectedTask(task);
    setIsEditTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskDetailModalOpen(false);
    setIsEditTaskModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <Container>
      <Header>
        <span role="img" aria-label="calendar">📅</span>
        <LogoutButton>Logout</LogoutButton>
      </Header>
      <ControlPanel>
        <AddTaskButton>Add Task</AddTaskButton>
        <SearchBar type="text" placeholder="Search..." />
        <SortSelect>
          <option>Sort By: Recent</option>
        </SortSelect>
      </ControlPanel>
      <DragDropContext onDragEnd={onDragEnd}>
        <Board>
          {columns.map(column => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <ColumnContainer {...provided.droppableProps} ref={provided.innerRef}>
                  <ColumnTitle>{column.title}</ColumnTitle>
                  {column.taskIds.map((taskId, index) => {
                    const task = tasks[taskId];
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <TaskCard ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>{task.content}</p>
                            <TaskActions>
                              <DeleteButton>Delete</DeleteButton>
                              <EditButton onClick={() => handleEditTask(task)}>Edit</EditButton>
                              <ViewDetailsButton onClick={() => handleViewDetails(task)}>View Details</ViewDetailsButton>
                            </TaskActions>
                          </TaskCard>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ColumnContainer>
              )}
            </Droppable>
          ))}
        </Board>
      </DragDropContext>
      {selectedTask && (
        <>
          <TaskDetailModal task={selectedTask} isOpen={isTaskDetailModalOpen} onClose={handleCloseModal} />
          <EditTaskModal task={selectedTask} isOpen={isEditTaskModalOpen} onClose={handleCloseModal} onSave={function (updatedTask: Task): void {
            throw new Error('Function not implemented.');
          } } />
        </>
      )}
    </Container>
  );
};

export default Kanban;
