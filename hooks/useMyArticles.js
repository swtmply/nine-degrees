import { useQuery } from "react-query";
import axios from "axios";

const fetchMyArticles = async () => {
  return await axios.get("/api/articles/mine").then((res) => res.data);
};

export default function useMyArticles() {
  return useQuery(["my-articles"], fetchMyArticles);
}
