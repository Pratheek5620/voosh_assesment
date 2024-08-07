"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import styled from "styled-components";
import Modal from "@/components/UI/modal";

interface Task {
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

const initialTasks: { [key: string]: Task } = {
  "task-1": {
    id: "task-1",
    content: "Task 1",
    description: "Description 1",
    createdAt: "01/09/2021, 05:30:00",
  },
  "task-2": {
    id: "task-2",
    content: "Task 2",
    description: "Description 2",
    createdAt: "01/09/2021, 05:30:00",
  },
  "task-3": {
    id: "task-3",
    content: "Task 3",
    description: "Description 3",
    createdAt: "01/09/2024, 05:30:00",
  },
  "task-4": {
    id: "task-4",
    content: "Task 4",
    description: "Description 4",
    createdAt: "01/09/2024, 05:30:00",
  },
  "task-5": {
    id: "task-5",
    content: "Task 5",
    description: "Description 5",
    createdAt: "01/09/2021, 05:30:00",
  },
  "task-6": {
    id: "task-6",
    content: "Task 6",
    description: "Description 6",
    createdAt: "01/09/2021, 05:30:00",
  },
};

const initialColumns: Column[] = [
  { id: "todo", title: "TODO", taskIds: ["task-1", "task-2", "task-3"] },
  { id: "in-progress", title: "IN PROGRESS", taskIds: ["task-4", "task-5"] },
  { id: "done", title: "DONE", taskIds: ["task-6"] },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  background-color: #4a90e2;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoutButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const ControlPanel = styled.div`
  padding: 1rem;
`;

const AddTaskButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 1rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Board = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  flex-grow: 1;
`;

const ColumnContainer = styled.div`
  background-color: #f4f5f7;
  border-radius: 8px;
  width: 250px;
  padding: 0.5rem;
  margin: 0 0.5rem;
`;

const ColumnTitle = styled.h2`
  text-align: center;
  background-color: #4a90e2;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0;
`;

const TaskCard = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const TaskActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
`;

const DeleteButton = styled(ActionButton)`
  background-color: #ff6b6b;
  color: white;
`;

const EditButton = styled(ActionButton)`
  background-color: #4a90e2;
  color: white;
`;

const ViewDetailsButton = styled(ActionButton)`
  background-color: #4a90e2;
  color: white;
`;

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
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

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                          <TaskCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h3>{task.content}</h3>
                            <p>{task.description}</p>
                            <small>Created at: {task.createdAt}</small>
                            <TaskActions>
                              <DeleteButton>Delete</DeleteButton>
                              <EditButton>Edit</EditButton>
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedTask && (
          <>
            <h2>Task Details</h2>
            <p>Title: {selectedTask.content}</p>
            <p>Description: {selectedTask.description}</p>
            <p>Created at: {selectedTask.createdAt}</p>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default Kanban;