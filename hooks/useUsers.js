import { useQuery } from "react-query";
import axios from "axios";

const fetchUsers = async () => {
  return await axios.get("/api/users").then((res) => res.data);
};

const fetchUsersCategory = async (category) => {
  return await axios
    .get(`/api/users?category=${category}`)
    .then((res) => res.data);
};

export default function useUsers(type, category) {
  if (type === "head" && category)
    return useQuery(["users", category], () => fetchUsersCategory(category));

  return useQuery(["users"], fetchUsers);
}
