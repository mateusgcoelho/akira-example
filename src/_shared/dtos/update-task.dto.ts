export type UpdateTaskStatusDTO = {
  id: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
};
