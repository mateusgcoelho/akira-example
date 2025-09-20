import { CreateTaskDTO } from "@/_shared/dtos/create-task.dto";
import { TaskDTO } from "@/_shared/dtos/task.dto";
import { toast } from "sonner";
import { create } from "zustand";
import { taskActions } from "../actions";

type TaskItem = {
  id: string;
  name: string;
  column: "TODO" | "IN_PROGRESS" | "DONE";
  data: TaskDTO;
};

type TaskStoreState = {
  loading: boolean;
  columns: { id: string; name: string; color: string }[];
  tasks: TaskItem[];
};

type TaskStoreActions = {
  addTask: (task: CreateTaskDTO) => void;
  deleteTask: (taskId: string) => void;
  setTasks: (tasks: TaskItem[]) => void;
  updateTaskStatus: () => void;
  fetchTasks: () => Promise<void>;
};

export const useTaskStore = create<TaskStoreState & TaskStoreActions>(
  (set) => ({
    loading: false,
    columns: [
      { id: "TODO", name: "A Fazer", color: "#f87171" },
      { id: "IN_PROGRESS", name: "Em Progresso", color: "#fbbf24" },
      { id: "DONE", name: "Pronto", color: "#34d399" },
    ],
    tasks: [],

    setTasks: (tasks) => set({ tasks }),

    fetchTasks: async () => {
      try {
        set({ loading: true });

        const response = await taskActions.getTasks();
        const tasks = response.map((task) => toTaskItem(task));

        set({ tasks });
      } catch {
        toast.error("Não foi possível carregar as tarefas. Tente novamente.");
      } finally {
        set({ loading: false });
      }
    },

    addTask: async (data) => {
      try {
        set({ loading: true });

        const task = await taskActions.createTask(data);
        const newTask: TaskItem = toTaskItem(task);

        set((state) => ({ tasks: [newTask, ...state.tasks] }));
        toast.success("Tarefa criada com sucesso!");
      } catch {
        toast.error("Não foi possível criar a tarefa. Tente novamente.");
      } finally {
        set({ loading: false });
      }
    },

    updateTaskStatus: async () => {
      try {
        const { tasks } = useTaskStore.getState();

        const updates = tasks.map((task) => ({
          id: task.id,
          status: task.column,
        }));

        const promise = taskActions.updateTaskStatus(updates);

        toast.promise(promise, {
          loading: "Atualizando status da tarefa...",
          success: "Tarefas atualizadas com sucesso!",
          error:
            "Não foi possível atualizar o status da tarefa. Tente novamente.",
        });

        await promise;
        set({ tasks });
      } catch {
        toast.error(
          "Não foi possível atualizar o status da tarefa. Tente novamente."
        );
      }
    },

    deleteTask: async (taskId) => {
      try {
        await taskActions.deleteTask(taskId);

        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));

        toast.success("Tarefa excluída com sucesso!");
      } catch {
        toast.error("Não foi possível excluir a tarefa. Tente novamente.");
      }
    },
  })
);

function toTaskItem(task: TaskDTO): TaskItem {
  return {
    id: task.id,
    name: task.title,
    column: task.status,
    data: task,
  };
}
