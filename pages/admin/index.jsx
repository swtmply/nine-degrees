import AdminHeader from "@/components/Dashboard/Header/AdminHeader";
import Table from "@/components/Dashboard/Table/Table";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { useSession } from "next-auth/react";
import React from "react";
import WriterTable from "@/components/Dashboard/Table/WriterTable";
import WriterHeader from "@/components/Dashboard/Header/WriterHeader";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      {session?.user?.role === "Writer" ? <WriterHeader /> : <AdminHeader />}

      {session?.user?.role === "Writer" ? <WriterTable /> : <Table />}
    </AdminLayout>
  );
}
