const BASE = "https://todo-production-c449.up.railway.app/tasks";

export const getTasks = (userId) =>
  fetch(`${BASE}?userId=${userId}`).then((res) => res.json());

export const addTask = async (task) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Add task failed:", text);
    throw new Error("Failed to add task");
  }

  return await res.json();
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return await res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
