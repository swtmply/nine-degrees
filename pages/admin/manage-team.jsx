import UsersTable from "@/components/Dashboard/Table/UsersTable";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { useSession } from "next-auth/react";
import React from "react";

export default function ManageTeam() {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      <UsersTable
        category={session?.user?.categories[0]}
        user={session?.user}
      />
    </AdminLayout>
  );
}
