# LevelUpFitness 🏋️‍♂️

A gamified fitness tracking application that turns your workout routine into an exciting RPG-style adventure!

## 🎮 Features

- **Gamified Experience**: Level up your character as you complete workouts
- **Quest System**: Complete daily and weekly fitness challenges
- **Boss Fights**: Take on epic fitness challenges
- **Leaderboards**: Compete with friends and the community
- **Cross-Platform**: Available on web and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Omar-Alsharaa/LevelUpFitness.git
cd LevelUpFitness
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:

**For Web:**
```bash
npm run web
```

**For Mobile (Expo):**
```bash
npm start
```

## 📱 Platforms

- **Web**: React-based web application with Vite
- **Mobile**: React Native with Expo

## 🛠️ Tech Stack

- **Frontend**: React, React Native, Expo
- **Styling**: Styled Components
- **Navigation**: React Navigation (mobile), React Router (web)
- **Build Tool**: Vite (web), Expo (mobile)
- **Testing**: Jest, React Testing Library

## 📁 Project Structure

```
LevelUpFitness/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Web pages
│   ├── screens/       # Mobile screens
│   ├── styles/        # Theme and global styles
│   └── App.jsx        # Main app component
├── mobile-app/        # Mobile-specific configuration
└── dist/             # Built web application
```

## 🎯 Core Components

- **Dashboard**: Overview of your fitness progress
- **Quests**: Daily and weekly challenges
- **Boss Fights**: Epic fitness challenges
- **Leaderboard**: Community rankings
- **Profile**: User stats and achievements

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
npx expo start --clear --tunnel
```

### Building for Production

```bash
npm run build
```

### Previewing the Production Build

```bash
npm run preview
```