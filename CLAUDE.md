# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application with TypeScript and Tailwind CSS for the JAMHOUSE music club website, located in the `my-app` directory. The project uses modern web technologies for optimal performance and developer experience.

## Tech Stack

- **React 19** with TypeScript for type safety
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router** for client-side routing
- **React Icons** for consistent iconography
- **date-fns** for date formatting

## Development Commands

All commands should be run from the `my-app` directory:

```bash
cd my-app
```

### Core Commands
- `npm start` - Start development server at http://localhost:3000 with TypeScript compilation
- `npm test` - Run Jest tests with TypeScript support
- `npm run build` - Build optimized production bundle with Tailwind purging
- `npm test -- --coverage` - Run tests with coverage report
- `npm test MyComponent.test.tsx` - Run a specific TypeScript test file

### TypeScript Commands
- `npx tsc --noEmit` - Type check without emitting files
- `npx tsc --watch --noEmit` - Watch mode type checking

## Project Structure

- `src/` - Main application code (TypeScript)
  - `components/` - Reusable React components
    - `common/` - Shared UI components (Button, etc.)
    - `layout/` - Layout components (Navigation, Footer, Layout)
  - `pages/` - Route-based page components
  - `App.tsx` - Root application component
  - `index.tsx` - Application entry point
- `public/` - Static assets and HTML template
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- Built files go to `build/` (gitignored)

## Styling Guidelines

### Tailwind Usage
- Use utility classes for styling: `bg-dark-bg text-white p-4`
- Custom colors defined in `tailwind.config.js`: `text-primary`, `bg-dark-secondary`
- Responsive design: `md:text-xl lg:grid-cols-3`
- Component styles in `@layer components` in `index.css`

### Custom Classes Available
- `.btn-primary` - Primary button styling
- `.btn-outline` - Outline button styling  
- `.container-custom` - Max-width container with padding

## TypeScript Guidelines

- All components use `React.FC` with proper interface definitions
- Props interfaces defined above components
- Event handlers properly typed: `React.ChangeEvent<HTMLInputElement>`
- State properly typed with generics: `useState<string>('initial')`

## Testing

Uses Jest with React Testing Library and TypeScript support. Test files use `.test.tsx` or `.test.ts` extensions.

## Animation

Framer Motion is used for page transitions and interactive elements. Common patterns:
- `initial={{ opacity: 0 }}` and `animate={{ opacity: 1 }}`
- `whileHover` and `whileTap` for button interactions
- `motion.div` for animated containers