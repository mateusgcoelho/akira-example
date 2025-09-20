"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/_shared/components/ui/tabs";
import { useEffect } from "react";
import { CreateTaskForm } from "./components/createTaskForm";
import { KanbanTasks } from "./components/kanbanTasks";
import { useTaskStore } from "./store/taskStore";

export default function TaskManagerPage() {
  const { fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Tabs defaultValue="kanban" className="w-full flex-1">
        <section className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
          </TabsList>

          <CreateTaskForm />
        </section>

        <TabsContent value="kanban">
          <KanbanTasks />
        </TabsContent>
      </Tabs>
    </>
  );
}
