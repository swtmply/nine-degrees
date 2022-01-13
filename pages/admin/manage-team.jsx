import UsersTable from "@/components/Dashboard/Table/UsersTable";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { getSession, useSession } from "next-auth/react";
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