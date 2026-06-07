import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from '@/components/TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

const statusColors = {
  todo: 'bg-gray-100 dark:bg-gray-700',
  in_progress: 'bg-blue-100 dark:bg-blue-900',
  done: 'bg-green-100 dark:bg-green-900',
};

export function Column({ status, title, tasks, onEditTask, onDeleteTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="flex-1 min-w-[300px] max-w-[400px]">
      <div className={`${statusColors[status]} rounded-lg p-4 h-full`}>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-between">
          {title}
          <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </h2>
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className="space-y-3 min-h-[200px]">
            {tasks.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No tasks
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
