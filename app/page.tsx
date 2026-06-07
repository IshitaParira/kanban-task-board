'use client';

import { useTasks } from '@/hooks/useTasks';
import { Board } from '@/components/Board';
import { TaskModal } from '@/components/TaskModal';
import { Task } from '@/types/task';
import { useState } from 'react';

export default function Home() {
  const { tasks, loading, error, createTask, updateTask, deleteTask, updateTaskStatus } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleCreateTask = async () => {
    setModalMode('create');
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setModalMode('edit');
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (task: Task) => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      try {
        await deleteTask(task.id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete task');
      }
    }
  };

  const handleModalSubmit = async (title: string, description?: string) => {
    if (modalMode === 'create') {
      await createTask(title, description);
    } else if (editingTask) {
      await updateTask(editingTask.id, { title, description });
    }
  };

  const handleMoveTask = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to move task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <header className="p-6 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Kanban Board
            </h1>
            <button
              onClick={handleCreateTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              + New Task
            </button>
          </div>
        </header>
        <Board
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onMoveTask={handleMoveTask}
        />
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          task={editingTask}
          mode={modalMode}
        />
      </div>
    </main>
  );
}
