"use client";
import { Issue, User } from "@/app/generated/prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const assignIssues = (userId: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        assignToUserId: userId === "unassign" ? null : userId,
      })
      .then(() => {
        toast.success(userId === "unassign" ? "Unassigned" : "User assigned");
      })
      .catch(() => {
        toast.error("Failed assigning the user");
      });
  };

  const { data: users, error, isLoading } = useUsers();

  return (
    <>
      <Select.Root
        defaultValue={issue.assignToUserId || "unassign"}
        onValueChange={assignIssues}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassign">Unassign</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
