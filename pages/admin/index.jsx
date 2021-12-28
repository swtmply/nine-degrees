import AdminHeader from "@/components/Dashboard/Header/AdminHeader";
import Table from "@/components/Dashboard/Table/Table";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { useSession } from "next-auth/react";
import React from "react";
import WriterTable from "@/components/Dashboard/Table/WriterTable";
import WriterHeader from "@/components/Dashboard/Header/WriterHeader";
import HeadHeader from "@/components/Dashboard/Header/HeadHeader";
import CategoryTable from "@/components/Dashboard/Table/CategoryTable";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      {session?.user?.role === "Writer" ? (
        <WriterHeader />
      ) : session?.user?.role === "Head" ? (
        <HeadHeader category={session?.user?.categories[0]} />
      ) : (
        <AdminHeader />
      )}

      {session?.user?.role === "Writer" ? (
        <WriterTable />
      ) : session?.user?.role === "Head" ? (
        <CategoryTable category={session?.user?.categories[0]} />
      ) : (
        <Table />
      )}
    </AdminLayout>
  );
}
