export const validateTaskTitle = (title: string): { isValid: boolean; error?: string } => {
  if (!title || title.trim().length === 0) {
    return { isValid: false, error: 'Task title is required' };
  }
  if (title.trim().length > 200) {
    return { isValid: false, error: 'Task title must be less than 200 characters' };
  }
  return { isValid: true };
};

export const validateTaskDescription = (description?: string): { isValid: boolean; error?: string } => {
  if (description && description.length > 1000) {
    return { isValid: false, error: 'Task description must be less than 1000 characters' };
  }
  return { isValid: true };
};
