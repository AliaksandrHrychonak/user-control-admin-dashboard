# Next.js User Control Dashboard MVC Pattern with User Management

A Next.js project implementing a user dashboard form using the MVC pattern, featuring modern React practices, comprehensive tooling, and robust user management capabilities.

## Deploy

https://user-control-admin-dashboard.monster

## Project Status: In Development 🚧

### TODO List
1. Fix MVC violations in login form structure
2. Resolve FSD architecture violations in user table widget
3. Add debounce functionality for search operations

## Features

- Built with Next.js 15.2.2 and React 19
- TypeScript 5 support
- Feature-Sliced Design architecture
- Radix UI components integration
- Form handling with react-hook-form 7.54.2
- Redux Toolkit and Redux Persist for state management
- Styling with Tailwind CSS 4
- Comprehensive linting and formatting setup

## Additional Requirements Implementation ✓

### Database & Authentication
- Unique email index in PostgreSQL database
- Robust user authentication system
- Session management and authorization checks
- Account status verification middleware

### User Management Interface
- Advanced data table with checkbox-based multi-select
- Server-side sorting by last login time
- Toolbar-based bulk actions (Block/Unblock/Delete)
- User status management (Active/Blocked)

### Security Features
- Pre-request middleware for user status verification
- Automatic logout for blocked accounts
- Protected admin routes
- Session persistence

## Getting Started

### Prerequisites

Node.js (LTS version recommended)

pnpm package manager (recommended for better performance and disk space efficiency)

### Installation

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Clone the repository
git clone [your-repository-url]

# Install dependencies
pnpm install
```

### Available Scripts

- `pnpm start:dev` - Runs the development server with Turbopack
- `pnpm start:build` - Creates a production build (with increased memory allocation)
- `pnpm start` - Starts the production server
- `pnpm lint` - Runs ESLint for TypeScript files
- `pnpm lint:fix` - Fixes ESLint issues
- `pnpm stylelint` - Runs StyleLint for CSS/SCSS files
- `pnpm stylelint:fix` - Fixes StyleLint issues
- `pnpm format` - Formats code using Prettier
- `pnpm prepare` - Sets up Husky

## Project Structure

This project follows the Feature-Sliced Design methodology for better code organization and maintainability. Use the following commands to analyze the project structure:

- `pnpm fsd:check` - Validates FSD architecture using Steiger
- `pnpm fsd:watch` - Watches for FSD violations in real-time
- `pnpm fsd:cruise` - Generates a dependency graph using dependency-cruiser

## Code Quality

The project includes:

- ESLint 9 with TypeScript and Next.js plugins
- StyleLint 16 with Tailwind CSS support
- Prettier 3.5.1 with Tailwind plugin
- Husky 9 for git hooks
- lint-staged for pre-commit checks

## Dependencies

Key dependencies include:

- @hookform/resolvers and zod for form validation
- @radix-ui components for accessible UI elements
- @reduxjs/toolkit and redux-persist for state management
- @tanstack/react-table for data tables
- next-themes for theme management
- sonner for toast notifications
- tailwind-merge and tailwindcss-animate for styling

## Project Structure Explained

The project follows a Model-View-Controller (MVC) pattern within the Feature-Sliced Design methodology. Here's the detailed structure:

![2025-02-23_21-48-57](https://github.com/user-attachments/assets/b5a169dc-6104-4c03-86fd-cf25a21acdcc)

### Core Directories

- **src/** - Main source code directory containing all application logic
- **src/entities/** - Contains business entities (models) and their basic UI components
- **src/features/** - Contains feature implementations following MVC pattern
- **src/shared/** - Shared utilities, components, and configurations
- **src/widgets/** - Composite components combining entities and features

## Modal Window Documentation

The modal window component is built using Radix UI's Dialog primitives and follows a compositional pattern for maximum flexibility and reusability.

### Component API

The DialogWindow component accepts the following props:

- **trigger** - ReactNode that will trigger the modal to open
- **children** - Render function that receives modal control props

### Render Props

The children render function receives the following props:

- **isOpen** - Boolean indicating modal's open state
- **onClose** - Function to close the modal
- **renderHeader** - Function to render the modal header with title and description
- **renderCloseButton** - Function to render the close button

### Styling

The modal uses Tailwind CSS for styling and can be customized through className props. Key style features include:

- Responsive design with proper mobile handling
- Smooth animations using tailwindcss-animate
- Accessible focus management
- Backdrop overlay with click-outside handling

### Accessibility

Built on Radix UI primitives, the modal implementation includes:

- Proper ARIA attributes and roles
- Keyboard navigation support
- Focus trap within the modal
- Screen reader announcements

## Project Requirements Implementation Status

### Project Setup ✓

- Created Next.js project with TypeScript integration
- Configured development tools: ESLint, Prettier, StyleLint, Husky
- Integrated Radix UI components with Tailwind CSS
- Set up react-hook-form and zod for form handling
- Implemented Feature-Sliced Design architecture
- Added Redux Toolkit with persistence

### Modal Window Implementation ✓

- Created reusable modal component using Radix UI Dialog
- Implemented using Render Props and Compound Components patterns
- Encapsulated all open/close logic within the component
- Modal trigger button is passed as a prop

### User Creation Form ✓

- Implemented using react-hook-form and zod
- Followed MVC pattern for form logic separation
- Designed with library-agnostic architecture for easy migration
- Prepared for multi-step form implementation
- Form component is independent and can be used standalone or within modal

### Integration ✓

- Created modal window with user creation form
- Implemented proper component composition
- Maintained clean architecture with encapsulated logic
- Followed all FSD principles and clean code practices

### User Management Requirements ✓

- Implemented unique email index in database
- Created responsive data table with proper toolbar layout
- Added server-side sorting functionality
- Implemented checkbox-based multiple selection
- Added pre-request user verification middleware
- Implemented user blocking and deletion functionality
- Created protected routes for authenticated users
- Added session management and persistence
- Implemented proper error handling for unique constraints