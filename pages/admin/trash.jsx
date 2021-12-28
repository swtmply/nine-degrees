import CategoryTable from "@/components/Dashboard/Table/CategoryTable";
import Table from "@/components/Dashboard/Table/Table";
import WriterTable from "@/components/Dashboard/Table/WriterTable";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { useSession } from "next-auth/react";
import React from "react";

export default function TrashPage() {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      {session?.user?.role === "Writer" ? (
        <WriterTable trash={true} />
      ) : session?.user?.role === "Head" ? (
        <CategoryTable trash={true} category={session?.user?.categories[0]} />
      ) : (
        <Table trash={true} />
      )}
    </AdminLayout>
  );
}
