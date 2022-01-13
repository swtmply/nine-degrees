import AdminHeader from "@/components/Dashboard/Header/AdminHeader";
import UsersTable from "@/components/Dashboard/Table/UsersTable";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import { getSession } from "next-auth/react";

export default function Users() {
  return (
    <AdminLayout>
      {/* TODO: add all users */}
      <UsersTable />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}