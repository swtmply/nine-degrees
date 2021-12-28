export const isEmpty = (obj) => {
  return Object.entries(obj).length === 0;
};

export const statusLength = (articles, status) => {
  const filtered = articles.filter(
    (item) => item.status.toLowerCase() === status
  );

  return filtered.length;
};
