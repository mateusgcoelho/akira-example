import { TaskDTO } from "@/_shared/dtos/task.dto";
import { cn } from "@/lib/utils";

export function TaskCardItem({ task }: { task: TaskDTO }) {
  const getPriorityColor = (status: "LOW" | "MEDIUM" | "HIGH") => {
    switch (status) {
      case "LOW":
        return "bg-green-100 text-green-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "HIGH":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityName = (status: "LOW" | "MEDIUM" | "HIGH") => {
    switch (status) {
      case "LOW":
        return "Baixa";
      case "MEDIUM":
        return "Média";
      case "HIGH":
        return "Alta";
      default:
        return "Desconhecida";
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div>
          <span className="font-semibold text-lg">{task.title}</span>
          {task.description && (
            <p className="text-xs text-muted-foreground">{task.description}</p>
          )}
        </div>
      </div>

      <div>
        <span className="text-xs text-muted-foreground">
          Criado por: {task.createdBy.name}
        </span>
      </div>

      <div className="flex items-center justify-between">
        {task.expiresAt && (
          <span className="text-xs text-muted-foreground">
            Vencimento: {new Date(task.expiresAt).toLocaleDateString()}
          </span>
        )}
        <span
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-sm",
            getPriorityColor(task.priority)
          )}
        >
          {getPriorityName(task.priority)}
        </span>
      </div>
    </>
  );
}
