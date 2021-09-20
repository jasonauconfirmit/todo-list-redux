export const isTaskValid = (task, keys = ["name"], maxName = 20) => {
  const taskKeys = Object.keys(task);

  return (
    taskKeys.length === keys.length &&
    keys.every((key) => taskKeys.includes(key)) &&
    task.name.length < maxName
  );
};
