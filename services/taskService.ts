import { supabase } from '@/lib/supabase/client';
import { Task, CreateTaskInput, UpdateTaskInput, TaskStatus } from '@/types/task';

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createTask(input: CreateTaskInput): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTask(input: UpdateTaskInput): Promise<Task> {
    const { id, ...updateData } = input;
    const { data, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.updateTask({ id, status });
  }
};
