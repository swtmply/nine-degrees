import AdminHeader from "@/components/Dashboard/Header/AdminHeader";
import Table from "@/components/Dashboard/Table/Table";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";

export default function Profile() {
  return (
    <AdminLayout>
      <AdminHeader />

      <Table />
    </AdminLayout>
  );
}
