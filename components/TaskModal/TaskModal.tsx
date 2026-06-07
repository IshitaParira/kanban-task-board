import { Task } from '@/types/task';
import { TaskForm } from '@/components/TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description?: string) => Promise<void>;
  task?: Task;
  mode: 'create' | 'edit';
}

export function TaskModal({ isOpen, onClose, onSubmit, task, mode }: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {mode === 'create' ? 'Create New Task' : 'Edit Task'}
        </h2>
        <TaskForm
          onSubmit={async (title, description) => {
            await onSubmit(title, description);
            onClose();
          }}
          onCancel={onClose}
          initialTitle={task?.title}
          initialDescription={task?.description}
          submitButtonText={mode === 'create' ? 'Create Task' : 'Update Task'}
        />
      </div>
    </div>
  );
}
