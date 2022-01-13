import WriterHeader from "@/components/Dashboard/Header/WriterHeader";
import WriterTable from "@/components/Dashboard/Table/WriterTable";
import AdminLayout from "@/components/Layouts/AdminLayout";
import React from "react";
import { getSession } from "next-auth/react";

export default function Profile() {
  return (
    <AdminLayout>
      <WriterHeader />

      <WriterTable />
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
