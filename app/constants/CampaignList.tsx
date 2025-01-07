export interface Campaign {
  id: number;
  title: string;
  status: "Pending" | "In Progress" | "Done" | "Cancel" | "To Do" | "Backlog";
  priority: "Low" | "Medium" | "High";
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Launch Campaign",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    title: "SEO Optimization",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Content Marketing",
    status: "Done",
    priority: "Low",
  },
  {
    id: 4,
    title: "Ad Campaign",
    status: "Cancel",
    priority: "High",
  },
  {
    id: 5,
    title: "Social Media Strategy",
    status: "To Do",
    priority: "Medium",
  },
  {
    id: 6,
    title: "Backlog Post Creation",
    status: "Backlog",
    priority: "Low",
  },
];

export default campaigns;
