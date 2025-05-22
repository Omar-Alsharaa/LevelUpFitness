# LevelUpFitness App

A gamified fitness tracking application with RPG elements.

## Features

- Dashboard with player stats and active quests
- Leaderboard with global rankings and guild competitions
- Quest system with daily, weekly, and story missions
- Challenge system for competing with other users

## Testing the Application

This project uses Jest and React Testing Library for testing React components. The test files are located alongside the components they test.

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

This will run all test files in the project that match the pattern `*.test.js` or `*.test.jsx`.

### Test Coverage

To see the test coverage report, run:

```bash
npm test -- --coverage
```

### Running Specific Tests

To run tests for a specific component, use:

```bash
npm test -- Leaderboard
```

Replace "Leaderboard" with the name of the component you want to test.

## Test Structure

The tests are organized as follows:

- `src/pages/*.test.jsx` - Tests for page components
- `src/components/**/*.test.jsx` - Tests for individual components
- `src/setupTests.js` - Global test configuration

## Development

### Starting the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Previewing the Production Build

```bash
npm run preview
```
