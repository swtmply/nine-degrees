import AdminHeader from "@/components/Dashboard/Header/AdminHeader";
import Table from "@/components/Dashboard/Table/Table";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";

export default function Dashboard() {
  return (
    <AdminLayout>
      {/* TODO: add all articles */}
      <AdminHeader />

      {/* TODO: add all articles */}
      <Table />
    </AdminLayout>
  );
}
