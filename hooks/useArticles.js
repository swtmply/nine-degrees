import { useQuery } from "react-query";
import axios from "axios";

const fetchArticles = async () => {
  return await axios.get("/api/articles").then((res) => res.data);
};

const fetchArticlesCategory = async (category) => {
  return await axios
    .get(`/api/articles?category=${category}`)
    .then((res) => res.data);
};

export default function useArticles(type, category) {
  if (type === "head" && category)
    return useQuery(["articles", category], () =>
      fetchArticlesCategory(category)
    );

  return useQuery(["articles"], fetchArticles);
}
