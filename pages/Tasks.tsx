import React, { useState } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { mockTasks } from '../data/mockData';
import type { Task, TaskStatus } from '../types';
import { LayoutGrid, List, Calendar } from 'lucide-react';

const categoryColors: Record<Task['category'], string> = {
  'Follow-up': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Payment': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'Meeting': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

type View = 'kanban' | 'list' | 'calendar';

// --- Kanban View Components ---
const TaskCard: React.FC<{ task: Task; onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: number) => void }> = ({ task, onDragStart }) => (
    <div 
        draggable
        onDragStart={(e) => onDragStart(e, task.id)}
        className="p-3 mb-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm border-l-4 border-blue-500 cursor-grab active:cursor-grabbing"
    >
        <p className="font-semibold text-sm mb-2">{task.title}</p>
        <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">Due: {task.dueDate}</span>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${categoryColors[task.category]}`}>{task.category}</span>
        </div>
    </div>
);

const KanbanView: React.FC<{ tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> }> = ({ tasks, setTasks }) => {
    const { t } = useLocalization();
    const statuses: { id: TaskStatus, titleKey: 'toDo' | 'inProgress' | 'completed' }[] = [
        { id: 'To Do', titleKey: 'toDo' },
        { id: 'In Progress', titleKey: 'inProgress' },
        { id: 'Completed', titleKey: 'completed' },
    ];

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: number) => {
        e.dataTransfer.setData("taskId", taskId.toString());
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: TaskStatus) => {
        e.preventDefault();
        const taskId = parseInt(e.dataTransfer.getData("taskId"));
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus, completed: newStatus === 'Completed' } : task
        ));
        e.currentTarget.classList.remove('bg-slate-200', 'dark:bg-slate-800');
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('bg-slate-200', 'dark:bg-slate-800');
    }
  
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('bg-slate-200', 'dark:bg-slate-800');
    }

    return (
        <div className="flex space-x-4 overflow-x-auto pb-4 -m-4 p-4">
            {statuses.map(status => (
                <div 
                    key={status.id}
                    onDrop={(e) => handleDrop(e, status.id)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="flex-shrink-0 w-80 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl p-3 transition-colors"
                >
                    <h3 className="font-semibold mb-4 px-1">{t(status.titleKey)} ({tasks.filter(t => t.status === status.id).length})</h3>
                    <div className="h-[60vh] overflow-y-auto pr-1">
                        {tasks.filter(t => t.status === status.id).map(task => (
                            <TaskCard key={task.id} task={task} onDragStart={handleDragStart} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


// --- List View Component ---
const ListView: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const { t } = useLocalization();
    return (
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
                {tasks.map(task => (
                    <li key={task.id} className={`p-4 rounded-lg flex justify-between items-center ${task.completed ? 'bg-green-50 dark:bg-green-900/50 opacity-60' : 'bg-gray-50 dark:bg-slate-700'}`}>
                        <div className="flex items-center gap-4">
                            <input type="checkbox" checked={task.completed} readOnly className="h-5 w-5 rounded" />
                            <div>
                                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>{task.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Due: {task.dueDate}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[task.category]}`}>
                            {task.category}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// --- Main Tasks Component ---
const Tasks: React.FC = () => {
  const { t } = useLocalization();
  const [view, setView] = useState<View>('kanban');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  
  const viewOptions = [
      { id: 'kanban', icon: <LayoutGrid size={18} />, label: t('kanban') },
      { id: 'list', icon: <List size={18} />, label: t('list') },
      { id: 'calendar', icon: <Calendar size={18} />, label: t('calendar') },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('tasks')}</h2>
        <div className="flex items-center gap-2 p-1 rounded-lg bg-slate-200 dark:bg-slate-700">
            {viewOptions.map(option => (
                <button 
                    key={option.id} 
                    onClick={() => setView(option.id as View)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${
                        view === option.id ? 'bg-white dark:bg-slate-800 shadow' : 'text-gray-600 dark:text-gray-300'
                    }`}
                >
                    {option.icon} {option.label}
                </button>
            ))}
        </div>
      </div>
      
      {view === 'kanban' && <KanbanView tasks={tasks} setTasks={setTasks} />}
      {view === 'list' && <ListView tasks={tasks} />}
      {view === 'calendar' && (
         <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold mb-4">Calendar View</h3>
            <p className="text-gray-500 dark:text-gray-400">Placeholder for full calendar integration with Google Calendar sync.</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
