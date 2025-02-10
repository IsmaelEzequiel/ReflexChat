# Reflex Chat

[![Cypress Tests](https://github.com/IsmaelEzequiel/ReflexChat/actions/workflows/cypress.yml/badge.svg)](https://github.com/IsmaelEzequiel/ReflexChat/actions/workflows/cypress.yml)
[![Run Unit Tests](https://github.com/IsmaelEzequiel/ReflexChat/actions/workflows/test.yml/badge.svg)](https://github.com/IsmaelEzequiel/ReflexChat/actions/workflows/test.yml)

## Getting Started

## TODO list

### Current implementation
- Administration area
- Place where user can chat
- Handle errors
  - User name is required, validated on front and back
  - `/chat/{sessionId}` must exist on database or user will get back to home page
  - Inside Chat Area, the message and sessionId must be required (validated on backend)
- Optimistic UI
- Use of `useMemo` and `useCallback` to improve performance and avoid unecessary state update
- State management with Redux Toolkit
- Save data to database and manage it with Prisma and PostgreSQL
- Unit and integration testing with Vitest
- End-to-end testing with Cypress

### Future ideas
- Adds IA to response the messages on backend
- Adds login/signup functionalities
- Adds roles based user to restrict user to access some pages
- Adds some charts to dashboard to measure app usage

### Possible improvements to gain more performance
- Use `Redis` for caching on backend (option)
- Use `React Query` for frequently accessed chat messages on front end
- Use `code-splitting - next/dynamic` to load some components when needed
- Use `CDN` server provider to serve static files

## Main libs used

- Next.js (15.1.6) - React framework for SSR and static site generation
- React (19.0.0) & ReactDOM (19.0.0)
- Prisma (6.3.1) - ORM for database management
- Redux Toolkit - State management
- TailwindCSS - Utility-first CSS framework
- Radix UI - Accessible UI components
- ShadCN - UI component library
- Cypress - End-to-end testing
- Vitest - Unit and integration testing

## CI/CD

### Github actions
- CI running with `test.yml` and `cypress.yml` on github actions to ensure the app is tested and ready for deploy
- CD when the CI tests pass, the project is deployed on [Railway](https://reflexchat.ismaelezequiel.com.br/)  

### Routes

- `/` -> User enter your name to continue
- `/chat/4efe87f2-87fe-4666-8214-37dc775620e8` -> Chat area
- `/dashboard` -> Administration area
- `/404` -> Page not found

### Prerequisites

- Node.js **>= 20.0.0**

- PostgreSQL database (ensure you have a `.env` and `.env.test` file with database configurations)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/IsmaelEzequiel/ReflexChat
   cd reflex_chat
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   - Copy `env.example` to `.env` and configure your database and base url.

4. Run database migrations (for development):

   ```sh
   npx prisma migrate dev --name init
   ```

## Running the Development Server

Start the development server with:

```sh
npm run dev
```

## Building for Production

1. Apply database migrations:

   ```sh
   npx prisma migrate deploy
   ```

2. Build the Next.js application:

   ```sh
   npm run build
   ```

3. Start the production server:

   ```sh
   npm start
   ```

## Running Tests

### Unit & Integration Tests

0. *I only added some integration tests on the API due the time, but for future implementations, I would add cypress too*

1. Set up environment variables:

  - Copy `env.test.example` to `.env.test` and configure your database for test and base url.

2. Run tests using Vitest:

```sh
npm run test
```

3. Run tests in watch mode:

```sh
npm run test:watch
```

### End-to-End Tests with Cypress

1. Run Cypress tests in headless mode and start dev server:

```sh
npm run cypress:run
```

2. Open Cypress for interactive testing:

```sh
npm run cypress:open
```

## Adding UI Components

This project uses [ShadCN](https://ui.shadcn.com/) for components. To add a new component:

```sh
npx shadcn add button
```

## Deployment

### Deploying with Docker

1. Build the Docker image:

   ```sh
   docker build -t reflex_chat .
   ```

2. Run the container:

   ```sh
   docker run -p 3000:3000 --env-file .env reflex_chat
   ```

### Deploying to prod

Ensure that `DATABASE_URL` is correctly set in environment variables.
Ensure that `NEXT_PUBLIC_BASE_URL` is correctly set in environment variables.