# OBOS League Mobile App

A mobile app for tracking live scores, games, tables, and following favorite teams in the Norwegian OBOS league.

## Features

- 📊 **Live Scores**: Get real-time updates on ongoing matches
- 🏆 **League Table**: View current standings and team statistics
- 🎮 **Favorite Teams**: Follow your favorite teams and get personalized updates
- 📅 **Match Schedule**: Browse upcoming and past matches
- 📱 **Cross-Platform**: Works on iOS and Android

## Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Zustand
- **Navigation**: React Navigation
- **Language**: TypeScript
- **Testing**: Jest + React Testing Library
- **API Client**: Axios
- **Code Quality**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lhbkj25-alt/obos-league-mobile-app.git
cd obos-league-mobile-app
```

2. Install dependencies:
```bash
npm install
```

### Running the App

#### Development Mode
```bash
npm start
```

Then choose:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web

#### On a Specific Platform
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## Testing

### Run Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Generate Coverage Report
```bash
npm run test:coverage
```

## Linting & Formatting

### Run ESLint
```bash
npm run lint
```

### Format Code with Prettier
```bash
npm run format
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── services/           # API and external services
├── store/              # Zustand state management
├── types/              # TypeScript types and interfaces
├── utils/              # Utility functions
└── __tests__/          # Test files
```

## API Integration

The app integrates with the OBOS league API. Update the `API_BASE_URL` in `src/services/api.ts` with the correct endpoint.

### Available Endpoints

- `GET /standings` - Get league table
- `GET /matches` - Get all matches
- `GET /matches?round=X` - Get matches for a specific round
- `GET /teams/:teamId` - Get team details
- `GET /teams/:teamId/matches` - Get team's matches

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add your feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
