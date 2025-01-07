"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { Copy, EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { DataTableColumnHeader } from "../constants/DataTableColumnHeader";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Influencer = {
  id: number;
  name: string;
  city: string;
  category: string;
  img: string;
};

export const inColumns: ColumnDef<Influencer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <span className="w-10 h-10 rounded-full overflow-hidden relative">
          <img
            src={row.original.img}
            alt={row.original.name}
            className="w-full h-full object-cover left-0 top-0 absolute"
          />
        </span>
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "city",
    header: "City",
    /* 
    cell: ({ row }) => {
      const cityContent = row.getValue("city");
      return (
        <Badge variant="outline" className="font-normal">
          {cityContent}
        </Badge>
      );
    },
     */
  },
  {
    accessorKey: "category",
    header: "Category",
    /* 
    cell: ({ row }) => {
      const categoryContent = row.getValue("category");
      return (
        <Badge variant="outline" className="font-normal">
          {categoryContent}
        </Badge>
      );
    },
     */
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const influencerAction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(influencerAction.id.toString())
              }
            >
              Copy Influencer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
