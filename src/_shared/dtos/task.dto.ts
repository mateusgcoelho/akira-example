export type TaskDTO = {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  description?: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdBy: {
    id: string;
    name: string;
  };
  expiresAt: Date;
  createdAt: Date;
};
