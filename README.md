# Lumina Wax Boutique

A production-ready full-stack application template leveraging Cloudflare Workers, Durable Objects, and React. This project demonstrates a robust "Entity-based" architecture designed for high performance and global scalability.

[cloudflarebutton]

## Overview

Lumina Wax Boutique is built on a modern stack that maximizes the Cloudflare ecosystem. It features a unique storage pattern using a Global Durable Object to manage multiple entities (Users, Chats, etc.) with ACID consistency and built-in indexing. The frontend is a highly responsive React application styled with Tailwind CSS and Shadcn UI.

## Key Features

- **Scalable Entity Architecture**: Uses a single Durable Object class to handle multiple entity types (via `IndexedEntity`), optimizing for both cost and performance.
- **CAS Concurrency Control**: Implements Compare-and-Swap (CAS) logic for state mutations to ensure data integrity across concurrent requests.
- **Built-in Indexing**: Automatic prefix-based indexing for efficient listing and pagination of entities.
- **Type-Safe API**: Shared TypeScript interfaces between the Worker (Hono) and the React frontend.
- **Modern UI/UX**: Includes a dark-mode ready theme system, responsive sidebar, and custom interactive components.
- **Error Reporting**: Integrated client-side error tracking that reports back to the Worker for centralized logging.

## Tech Stack

- **Backend**: [Hono](https://hono.dev/) (Worker Framework)
- **Storage**: [Cloudflare Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/)
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router 6
- **Package Manager**: [Bun](https://bun.sh/)

## Project Structure

```text
├── shared/            # Shared types and mock data
├── src/               # Frontend React application
│   ├── components/    # Shadcn UI and layout components
│   ├── hooks/         # Custom React hooks (theme, mobile detection)
│   ├── lib/           # API client and utility functions
│   └── pages/         # Application pages
├── worker/            # Cloudflare Worker code
│   ├── core-utils.ts  # Durable Object & Indexing logic (Internal)
│   ├── entities.ts    # Entity definitions (User, ChatBoard)
│   ├── index.ts       # Worker entry point
│   └── user-routes.ts # API route definitions
└── wrangler.jsonc     # Cloudflare configuration
```

## Getting Started

### Prerequisites

You must have [Bun](https://bun.sh/) installed on your local machine.

### Installation

1. Install dependencies:
   ```bash
   bun install
   ```

2. Generate Cloudflare types:
   ```bash
   bun run cf-typegen
   ```

### Local Development

Start the development server (Vite + Wrangler Pages/Workers emulation):
```bash
bun run dev
```
The application will be available at `http://localhost:3000`.

## API Routes

The backend provides a structured API under the `/api` prefix:

- `GET /api/users`: List all users (supports cursor pagination)
- `POST /api/users`: Create a new user
- `GET /api/chats`: List chat boards
- `POST /api/chats/:chatId/messages`: Send a message to a specific chat
- `DELETE /api/users/:id`: Remove a user and update indexes

## Deployment

Deploying to Cloudflare is seamless. The project is configured to bundle the frontend as static assets and the backend as a Worker with Durable Object bindings.

[cloudflarebutton]

### Manual Deployment

1. Build and deploy using Wrangler:
   ```bash
   bun run deploy
   ```

Ensure you have a Cloudflare account and have authenticated via `wrangler login`.

## Development Guidelines

- **Adding Entities**: Define new entity classes in `worker/entities.ts` by extending `IndexedEntity`.
- **New Routes**: Add your Hono endpoints in `worker/user-routes.ts` to keep the core logic clean.
- **Styling**: Use Tailwind CSS utility classes. Custom theme variables can be found in `src/index.css`.
- **State Management**: Use `zustand` for simple global state and TanStack Query for server-state synchronization.

## License

This project is licensed under the MIT License.