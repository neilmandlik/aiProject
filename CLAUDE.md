# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Syllabus Evaluator** application that helps generate performance reviews by analyzing accreditation documents and syllabus structures. The frontend is a React application that manages a multi-step workflow for uploading documents and generating AI-powered performance summaries.

## Technology Stack

- **Frontend**: React 19 with Create React App
- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Testing**: React Testing Library with Jest

## Development Commands

The project is located in `sem7-project/` directory. All commands should be run from there.

```bash
# Install dependencies
cd sem7-project
npm install

# Start development server (runs on port 3010 by default)
npm start

# Run tests in watch mode
npm test

# Build for production
npm run build
```

## Architecture

### State Management Pattern

Redux slices follow a consistent pattern with three parts:

1. **Slice file** (`*Slice.js`): Contains `createSlice()` with initial state, reducers, and extraReducers
2. **Helper file** (`*.helper.js`): Contains async service functions and `handleExtraReducers` builders
3. **Thunks**: Created using `createAsyncThunk()` for async operations

Example pattern:
```javascript
// In helper file
export const getData = async() => { /* service call */ }
export const handleExtraReducers = (builder, getThunk) => {
  builder
    .addCase(getThunk.pending, (state) => { state.loading = true })
    .addCase(getThunk.fulfilled, (state, action) => { /* update state */ })
    .addCase(getThunk.rejected, (state, action) => { state.errMsg = action.error.message })
}

// In slice file
export const getThunk = createAsyncThunk("api/getData", getData)
const slice = createSlice({
  name: "feature",
  initialState,
  reducers: { /* sync actions */ },
  extraReducers: (builder) => handleExtraReducers(builder, getThunk)
})
```

### Directory Structure

- `src/pages/` - Route components with loader functions
- `src/store/` - Redux slices organized by domain (accreditation, syllabus, performance, file, progress)
- `src/services/` - API service functions
- `src/component/` - Shared components and enums
- `src/component/enums/` - Application constants and frozen objects

### API Communication

All API calls go through `CRUDOps.js` which provides three main functions:
- `getData(route)` - GET requests
- `postData(route, body)` - POST with JSON body
- `postFile(route, file, extraFields)` - POST with FormData (file uploads)

All functions include consistent error handling with user-friendly error messages attached as `error.userMessage`.

Backend URL is configured via `REACT_APP_SERVER_URL` environment variable in `.env` file.

### Application Flow

The app follows a 3-step progression managed by the `progress` slice:

1. **Step 1 (Accreditation)**: Select accreditation PDFs
2. **Step 2 (Syllabus)**: Select syllabus structure PDF
3. **Step 3 (Review)**: Generate and view performance summary

Navigation between steps is controlled by `progressStep` enum in `component/enums/SyllabusEvaluatorEnum.js`.

### Routing

Routes are defined in `App.jsx` using `createBrowserRouter`:
- All main routes wrapped in `<Layout>` component
- Loaders pattern: Each page exports a loader function for data fetching
- Dynamic route: `performance-summary/:id` for viewing specific performance reviews
- Standalone route: `/add-file` outside main layout

### Component Patterns

- **Layout.jsx**: Main navigation shell with step indicators, handles step transitions and loading states
- **Loaders**: Page components export async loader functions called by React Router before rendering
- **Tailwind**: Utility-first styling with custom CSS modules for reusable styles in `ApplicationCSS.js`

## Important Conventions

- Redux state is immutable; use Redux Toolkit's Immer-powered reducers
- All async operations go through thunks, never directly in components
- Service layer (`services/allServices.js`) abstracts API calls from Redux logic
- Enums use `Object.freeze()` to prevent mutations
- Error states are managed in Redux with `errMsg` and `loading` flags
- File uploads include extra metadata fields (e.g., `accBodyName` for accreditation body)

## Testing

Tests are located alongside source files with `.test.js` extension. The project uses:
- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for custom matchers
- `@testing-library/user-event` for user interaction simulation

Run `npm test` to start the test runner in watch mode.
