import WriterHeader from "@/components/Dashboard/Header/WriterHeader";
import WriterTable from "@/components/Dashboard/Table/WriterTable";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";

export default function Profile() {
  return (
    <AdminLayout>
      <WriterHeader />

      <WriterTable />
    </AdminLayout>
  );
}
