# Kanban Task Management Board

A simple, clean Trello-style task management board built with Next.js, TypeScript, Tailwind CSS, Supabase, and dnd-kit for drag-and-drop functionality.

## Project Overview

This Kanban board allows users to manage tasks by moving them between three columns: Todo, In Progress, and Done. The application focuses on clean architecture, maintainable code, responsive design, and good user experience.

## Features

- **Task Management**
  - Create tasks with title and optional description
  - Edit existing tasks
  - Delete tasks with confirmation dialog
  - Drag and drop tasks between columns

- **Kanban Columns**
  - Todo column for new tasks
  - In Progress column for active tasks
  - Done column for completed tasks

- **Persistence**
  - All tasks stored in Supabase PostgreSQL database
  - Tasks persist across page refreshes
  - Clean data access layer for CRUD operations

- **Responsive Design**
  - Works on desktop and mobile screens
  - Clean, modern card-based layout
  - Dark mode support

- **Validation**
  - Prevents creation of tasks with empty titles
  - Character limits for title (200) and description (1000)
  - Meaningful error messages
  - Loading and error states handled gracefully

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Drag & Drop**: dnd-kit
- **State Management**: React Hooks

## Project Structure

```
.
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with board
├── components/
│   ├── Board/
│   │   ├── Board.tsx        # Main board with drag-and-drop
│   │   └── index.ts
│   ├── Column/
│   │   ├── Column.tsx       # Individual column component
│   │   └── index.ts
│   ├── TaskCard/
│   │   ├── TaskCard.tsx     # Draggable task card
│   │   └── index.ts
│   ├── TaskForm/
│   │   ├── TaskForm.tsx     # Form for creating/editing tasks
│   │   └── index.ts
│   └── TaskModal/
│       ├── TaskModal.tsx    # Modal wrapper for task form
│       └── index.ts
├── database/
│   └── schema.sql           # Database schema
├── hooks/
│   └── useTasks.ts          # Custom hook for task operations
├── lib/
│   └── supabase/
│       └── client.ts        # Supabase client configuration
├── services/
│   └── taskService.ts       # Data access layer
├── types/
│   └── task.ts              # TypeScript type definitions
├── utils/
│   └── validation.ts        # Validation utilities
├── .env.example             # Environment variables template
├── .gitignore
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Local Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd kanban-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to the SQL Editor in your Supabase dashboard
   
   c. Run the SQL schema from `database/schema.sql`:
   ```sql
   -- Create tasks table
   CREATE TABLE IF NOT EXISTS tasks (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title TEXT NOT NULL,
     description TEXT,
     status TEXT NOT NULL CHECK (status IN ('todo', 'in_progress', 'done')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );

   -- Create index on status for faster queries
   CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

   -- Create index on created_at for sorting
   CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);

   -- Enable Row Level Security (optional, for future authentication)
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow all operations (for demo purposes without auth)
   CREATE POLICY "Enable all access for demo" ON tasks
     FOR ALL
     USING (true)
     WITH CHECK (true);
   ```

4. **Configure environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   You can find these values in your Supabase project settings under "API".

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | Yes |

## Database Schema

### Tasks Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `title` | TEXT | Task title (required) |
| `description` | TEXT | Task description (optional) |
| `status` | TEXT | Task status: 'todo', 'in_progress', or 'done' |
| `created_at` | TIMESTAMP | Creation timestamp, auto-generated |

### Indexes

- `idx_tasks_status`: Index on status column for faster filtering
- `idx_tasks_created_at`: Index on created_at for sorting

## Architecture Decisions

### Clean Architecture

- **Separation of Concerns**: Clear separation between UI components, business logic, and data access
- **Data Access Layer**: `taskService.ts` encapsulates all Supabase interactions
- **Custom Hooks**: `useTasks.ts` manages task state and operations
- **Type Safety**: TypeScript used throughout for type safety

### Component Structure

- **Reusable Components**: Each component has a single responsibility
- **Composition**: Components are composed together to build the UI
- **Props Interface**: Clear prop interfaces for type safety

### State Management

- **React Hooks**: Using built-in hooks for state management
- **Optimistic Updates**: UI updates immediately, with error handling
- **Loading States**: Clear loading indicators for async operations

### Drag and Drop

- **dnd-kit**: Modern, accessible drag-and-drop library
- **Sortable Context**: Enables smooth reordering within columns
- **Drag Overlay**: Visual feedback during drag operations

## Trade-offs and Assumptions

### Trade-offs

1. **No Authentication**: For simplicity, authentication is not implemented. In production, you would need to add user authentication and authorization.

2. **No Real-time Updates**: Tasks don't update in real-time across multiple clients. This could be added using Supabase Realtime.

3. **Simple Validation**: Validation is basic and client-side only. In production, you'd want server-side validation as well.

4. **No Search/Filter**: Search and filter features are not implemented to keep the codebase simple.

5. **No Priority Levels**: Priority badges (Low, Medium, High) are not included to maintain simplicity.

### Assumptions

1. **Single User**: The application assumes a single user scenario without team collaboration.

2. **Supabase Free Tier**: The application is designed to work with Supabase's free tier.

3. **Modern Browser Support**: The application assumes modern browser support (ES2017+).

4. **Desktop and Mobile**: The responsive design works on both desktop and mobile devices.

5. **No Complex Permissions**: All users have full access to all tasks (no role-based access control).

## Deployment on Vercel

### Prerequisites

- Vercel account
- Supabase project set up with schema applied

### Steps

1. **Push your code to GitHub**

2. **Import project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure environment variables**
   - In Vercel project settings, add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

5. **Access your application**
   - Vercel will provide a live URL for your deployed application

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Tailwind CSS for styling
- Component-based architecture
- Clear naming conventions

## Future Enhancements (Not Implemented)

The following features were considered but not implemented to keep the project simple:

- User authentication and authorization
- Real-time collaboration
- Task search and filtering
- Priority levels with badges
- Due dates and reminders
- Comments on tasks
- File attachments
- Task labels/tags
- Activity history
- Export/import tasks
- Multiple boards
- Team management

## License

This project is created for educational purposes as an internship assignment.

## Support

For issues or questions, please refer to the project documentation or contact the development team.
