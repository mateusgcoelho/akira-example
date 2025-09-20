"use client";

import { Button } from "@/_shared/components/ui/button";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/_shared/components/ui/kanban";
import { Trash } from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import { TaskCardItem } from "./taskCardItem";

export function KanbanTasks() {
  const { loading, columns, tasks, setTasks, updateTaskStatus, deleteTask } =
    useTaskStore();

  return (
    <>
      <KanbanProvider
        columns={columns}
        data={tasks}
        onDataChange={setTasks}
        onDragEnd={() => updateTaskStatus()}
      >
        {(column) => (
          <KanbanBoard id={column.id} key={column.id}>
            <KanbanHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <span>{column.name}</span>
              </div>
            </KanbanHeader>
            {loading && (
              <div className="flex flex-col space-y-2 p-2">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-20 w-full animate-pulse rounded-md bg-primary/10"
                  />
                ))}
              </div>
            )}
            {!loading && (
              <KanbanCards id={column.id}>
                {(task: (typeof tasks)[number]) => (
                  <div key={task.id} className="relative">
                    <KanbanCard
                      id={task.id}
                      column={column.id}
                      name={task.name}
                      className="shadow-none px-4"
                    >
                      <TaskCardItem task={task.data} />
                    </KanbanCard>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                )}
              </KanbanCards>
            )}
          </KanbanBoard>
        )}
      </KanbanProvider>
    </>
  );
}
