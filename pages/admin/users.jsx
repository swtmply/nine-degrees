import AdminHeader from "@/components/Dashboard/Header/AdminHeader";
import UsersTable from "@/components/Dashboard/Table/UsersTable";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";

export default function Users() {
  return (
    <AdminLayout>
      {/* TODO: add all articles */}
      <AdminHeader />

      {/* TODO: add all users */}
      <UsersTable />
    </AdminLayout>
  );
}
