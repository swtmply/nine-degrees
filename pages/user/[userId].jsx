import EditUserForm from "@/components/Forms/EditUserForm";
import AdminLayout from "@/components/Layouts/AdminLayout";
import LoadingBox from "@/components/Loaders/LoadingBox";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

export default function EditUser() {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    ["users", router.query.userId],
    async () => {
      return await axios
        .get(`/api/users/${router.query.userId}`)
        .then((res) => res.data);
    }
  );

  if (isLoading) return <LoadingBox />;

  return (
    <AdminLayout>
      <EditUserForm user={data?.user} />
    </AdminLayout>
  );
}
