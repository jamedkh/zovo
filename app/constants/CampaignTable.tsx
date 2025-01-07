"use client";

import { useState } from "react";
import campaigns, { Campaign } from "./CampaignList";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATUS_STYLES: Record<Campaign["status"], string> = {
  "In Progress": "text-blue-500 bg-blue-100",
  Pending: "text-yellow-500 bg-yellow-100",
  Done: "text-green-500 bg-green-100",
  Cancel: "text-red-500 bg-red-100",
  "To Do": "text-gray-500 bg-gray-100",
  Backlog: "text-purple-500 bg-purple-100",
};

const PRIORITY_STYLES: Record<Campaign["priority"], string> = {
  Low: "text-green-500 bg-green-100",
  Medium: "text-yellow-500 bg-yellow-100",
  High: "text-red-500 bg-red-100",
};

function CampaignTable() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Campaign>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredCampaigns = campaigns
    .filter((campaign) =>
      campaign.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);

  const handleSort = (field: keyof Campaign) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  return (
    <div className="p-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search campaigns..."
        className="mb-4 p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell onClick={() => handleSort("title")}>Title</TableCell>
            <TableCell onClick={() => handleSort("status")}>Status</TableCell>
            <TableCell onClick={() => handleSort("priority")}>
              Priority
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.title}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded ${
                    STATUS_STYLES[campaign.status]
                  }`}
                >
                  {campaign.status}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded ${
                    PRIORITY_STYLES[campaign.priority]
                  }`}
                >
                  {campaign.priority}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button className="p-2 bg-gray-200 rounded">⋮</button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-blue-500 hover:bg-blue-100"
                      onClick={() => alert(`Editing ${campaign.title}`)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 hover:bg-red-100"
                      onClick={() => alert(`Deleting ${campaign.title}`)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          className="p-2 bg-gray-200 rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="p-2 bg-gray-200 rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CampaignTable;
