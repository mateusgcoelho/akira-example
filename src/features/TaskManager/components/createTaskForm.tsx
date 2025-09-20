import { Button } from "@/_shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_shared/components/ui/dialog";
import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/_shared/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskFormData, taskSchema } from "../schemas/taskSchema";
import { useTaskStore } from "../store/taskStore";
import { SelectDate } from "./selectDate";

export function CreateTaskForm() {
  const { addTask } = useTaskStore();

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: "",
      title: "",
      priority: "LOW",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: TaskFormData) => {
    addTask({
      title: data.title,
      description: data.description,
      priority: data.priority,
      expiresAt: data.expiresAt,
      status: "TODO",
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-2" size="sm">
          Cadastrar Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da Tarefa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da nova tarefa.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              type="text"
              placeholder="Título da tarefa"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              type="text"
              placeholder="Descrição da tarefa"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <RadioGroup
              defaultValue="LOW"
              onValueChange={(value) =>
                setValue("priority", value as "LOW" | "MEDIUM" | "HIGH")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="LOW" />
                <Label htmlFor="option-one">Baixa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MEDIUM" />
                <Label htmlFor="option-two">Média</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HIGH" />
                <Label htmlFor="option-three">Alta</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col space-y-2">
            <SelectDate onSelectDate={(date) => setValue("expiresAt", date!)} />
            {errors.expiresAt && (
              <p className="text-sm text-destructive">
                {errors.expiresAt.message}
              </p>
            )}
          </div>

          <div className="w-full flex items-center justify-end">
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando..." : "Criar Tarefa"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
