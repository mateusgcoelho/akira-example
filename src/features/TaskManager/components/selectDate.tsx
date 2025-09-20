"use client";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/_shared/components/ui/button";
import { Calendar } from "@/_shared/components/ui/calendar";
import { Label } from "@/_shared/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_shared/components/ui/popover";
import { useState } from "react";

export function SelectDate(props: {
  onSelectDate: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Data vencimento
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Selecione a data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
              props.onSelectDate(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
