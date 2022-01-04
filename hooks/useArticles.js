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

const fetchArticlesSubsection = async (subsection) => {
  return await axios
    .get(`/api/articles?subsection=${subsection}`)
    .then((res) => res.data);
};

export default function useArticles(type, category) {
  if (type === "head" && category)
    return useQuery(["articles", category], () =>
      fetchArticlesCategory(category)
    );

  if (type === "subsection" && category) {
    return useQuery(["subsection", category], () =>
      fetchArticlesSubsection(category)
    );
  }

  return useQuery(["articles"], fetchArticles);
}
