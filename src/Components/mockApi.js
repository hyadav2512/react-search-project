const users = ["Harry", "John", "Alex", "Emma", "Sophia", "Henry", "Olivia"];

export const fetchUsers = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = users.filter((user) =>
        user.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 500);
  });
};
