# SaaS Project Tracking & Issue Board System

## 1. Project Overview
This project is a production-grade, multi-tenant workspace designed for Agile software teams (a modern, lightweight Jira/Trello clone). 

**Core Features Implemented:**
- **Auth & RBAC**: Secure JWT-based authentication with `bcryptjs`. Role-based access control distinguishing between Admin/Project Managers and Team Members.
- **Project Management**: Creation of projects with auto-generated unique keys (e.g., `PROJ`), and the ability to invite members via email.
- **Task & Issue Tracking**: Full CRUD for tasks associated with specific projects, including unique sequential issue keys (e.g., `PROJ-1`).
- **Interactive Kanban Board**: A dynamic, drag-and-drop enabled agile board with optimistic UI updates.

**Tech Stack:**
- **Frontend**: React (TypeScript), Vite, Tailwind CSS, `@hello-pangea/dnd`, `lucide-react`, React Router DOM, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), `jsonwebtoken`, `bcryptjs`.

---

## 2. Current Progress
We have successfully completed **Phases 1 through 4**. 

**Phase 4 (React UI & Kanban Board) Details:**
- **Kanban Board (`ProjectBoard.tsx`)**: Built a fully responsive 5-column agile board (Backlog, To Do, In Progress, In Review, Completed).
- **Drag & Drop**: Integrated `@hello-pangea/dnd` for fluid task movement across columns.
- **Optimistic Updates**: The UI instantly reflects state changes when a task card is dragged to a new column. A background `PATCH` request (`/api/tasks/:id/status`) handles the persistence and gracefully reverts state on failure.
- **Routing**: Setup protected nested routing via `App.tsx` (e.g., `/project/:id` loads the specific Kanban board for that project).

---

## 3. Current File Architecture

**Client (React/Vite)**
- `client/src/App.tsx`: Main routing configuration and Context Provider wrapper.
- `client/src/contexts/AuthContext.tsx`: Global authentication state and Axios interceptors for injecting JWTs.
- `client/src/pages/Dashboard.tsx`: Displays a grid of the authenticated user's assigned/owned projects and handles project creation.
- `client/src/pages/ProjectBoard.tsx`: The interactive Kanban view, handling drag-and-drop context, task fetching, and task creation.
- `client/src/components/TaskCard.tsx`: The UI component representing an individual draggable task.
- `client/src/services/api.ts`: Configured Axios instance connecting to the backend.

**Server (Express/Node)**
- `server/src/server.js`: Express application setup and API route mounting (`/api/auth`, `/api/projects`, `/api/tasks`).
- `server/src/models/{User,Project,Task}.js`: Mongoose data schemas.
- `server/src/controllers/{auth,project,task}Controller.js`: Business logic and database interactions.
- `server/src/middlewares/auth.js`: JWT validation and extraction middleware.

---

## 4. Next Steps / Pending Phase

**Phase 5: Analytics & Deployment**
- **Analytics Dashboard**: Integrate a charting library (like `recharts`) to display metrics such as Tasks Completed vs. Pending, Burndown charts, or workload per team member.
- **Pending Routes**: Setup and UI for `/projects/:id/analytics` or a global metrics view.
- **Deployment**: 
  - Setup environment configurations for Production.
  - Deploy the Node.js backend (e.g., Render, Heroku) and the React Vite frontend (e.g., Vercel, Netlify).
  - Configure CORS properly for the production domains.

---

## 5. How to Resume
For any AI assistant or developer picking this up:

1. **Review**: Read through this `CONTEXT.md` to understand the state.
2. **Environment Setup**:
   - Ensure a `.env` file exists in `server/` with `PORT=5000`, `MONGO_URI=<your-mongo-uri>`, and `JWT_SECRET=<your-secret>`.
3. **Install Dependencies**:
   - Navigate to `server/` and run `npm install`.
   - Navigate to `client/` and run `npm install`.
4. **Run Locally**:
   - Open two terminal instances.
   - In `server/`, run `npm run dev` to start the Express API on port 5000.
   - In `client/`, run `npm run dev` to start the Vite dev server on port 5173.
5. **Proceed**: Begin implementation of Phase 5 (Analytics Dashboard) using the existing API structure.
