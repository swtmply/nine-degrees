import EditMeForm from "@/components/Forms/EditMeForm";
import AdminLayout from "@/components/Layouts/AdminLayout";
import LoadingBox from "@/components/Loaders/LoadingBox";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { getSession } from "next-auth/react";

export default function UserSettings() {
  const { data, isLoading } = useQuery(["me"], async () => {
    return await axios.get(`/api/users/me`).then((res) => res.data);
  });

  if (isLoading) return <LoadingBox />;

  return (
    <AdminLayout>
      <EditMeForm user={data?.user} />
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