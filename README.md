# Vue Clean Architecture

A Vue.js 3 application demonstrating clean architecture principles with TypeScript, showcasing a Pokemon card collection management system.

## Overview

This project implements clean architecture in Vue.js, providing clear separation of concerns across different layers. The application manages Pokemon card collections, packs, and series with a focus on maintainability, testability, and scalability.

## Clean Architecture Structure

The project follows clean architecture principles with four distinct layers:

### Domain Layer (`src/domain/`)
The core business logic layer containing:
- **Entities**: Core business models (`Card.ts`, `Pack.ts`, `Series.ts`)
- **Repository Interfaces**: Abstract contracts for data access

### Application Layer (`src/application/`)
Business logic orchestration layer containing:
- **Use Cases**: Business logic operations (`CardUseCases.ts`, `PackUseCases.ts`, `SeriesUseCases.ts`)
- **Stores**: State management using Pinia (`CardStore.ts`, `PackStore.ts`, `SeriesStore.ts`)

### Infrastructure Layer (`src/infrastructure/`)
External dependencies and data access layer containing:
- **Repository Implementations**: Concrete implementations of domain repositories
- **API Configuration**: External service configuration

### Presentation Layer (`src/presentation/`)
UI and user interaction layer containing:
- **Views**: Page components (`HomeView.vue`, `PackView.vue`)
- **Components**: Reusable UI components (`CardModal.vue`, `NavBar.vue`, etc.)
- **Router**: Navigation configuration
- **UI Stores**: Presentation-specific state management

## Project Setup

### Prerequisites
- Node.js 22 or higher
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd vue-clean-architecture

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

### Building for Production

```bash
# Type-check, compile and minify
npm run build

# Preview production build
npm run preview
```

## Testing

The project includes comprehensive testing setup:

### Unit Tests
```bash
# Run unit tests with Vitest
npm run test:unit
```

Unit tests are located alongside source files in `test/` directories and cover:
- Use cases business logic
- Store state management
- Repository implementations
- Vue components

### End-to-End Tests
```bash
# Run E2E tests in development mode
npm run test:e2e:dev

# Run E2E tests against production build
npm run build
npm run test:e2e
```

E2E tests are located in `cypress/e2e/` and test complete user workflows.

## Technology Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Type Safety**: TypeScript
- **State Management**: Pinia with persistence
- **Styling**: TailwindCSS with DaisyUI components
- **Build Tool**: Vite
- **Testing**: Vitest (unit) + Cypress (E2E)
- **Validation**: Zod schemas

## Architecture Benefits

### Separation of Concerns
Each layer has a single responsibility, making the codebase easier to understand and maintain.

### Testability
Dependencies are injected and abstracted, allowing for easy mocking and testing of individual components.

### Flexibility
The architecture allows for easy swapping of implementations (e.g., changing from REST API to GraphQL).

### Scalability
New features can be added following established patterns without affecting existing code.

## Adding New Features

To add a new feature following clean architecture principles:

1. **Define Domain Entity** (if needed)
   ```typescript
   // src/domain/entities/NewEntity.ts
   export interface NewEntity {
     id: string;
     // ... other properties
   }
   ```

2. **Create Repository Interface**
   ```typescript
   // src/domain/repositories/NewEntityRepository.ts
   export interface NewEntityRepository {
     findAll(): Promise<NewEntity[]>;
     // ... other methods
   }
   ```

3. **Implement Repository**
   ```typescript
   // src/infrastructure/repositories-impl/NewEntityRepositoryImpl.ts
   export class NewEntityRepositoryImpl implements NewEntityRepository {
     // Implementation details
   }
   ```

4. **Create Use Cases**
   ```typescript
   // src/application/use-cases/NewEntityUseCases.ts
   export class GetAllNewEntitiesUseCase {
     constructor(private repository: NewEntityRepository) {}
     // Use case logic
   }
   ```

5. **Setup Store**
   ```typescript
   // src/application/stores/NewEntityStore.ts
   export const useNewEntityStore = defineStore('newEntity', () => {
     // Store implementation
   });
   ```

6. **Create UI Components**
   ```vue
   <!-- src/presentation/views/NewEntityView.vue -->
   <template>
     <!-- Component template -->
   </template>
   ```

## Folder Structure

```
src/
├── domain/                 # Core business logic
│   ├── entities/          # Business models
│   └── repositories/      # Repository interfaces
├── application/           # Business logic orchestration
│   ├── use-cases/        # Business operations
│   └── stores/           # Application state
├── infrastructure/        # External dependencies
│   ├── config/           # Configuration
│   └── repositories-impl/ # Repository implementations
└── presentation/          # User interface
    ├── components/       # Reusable UI components
    ├── views/           # Page components
    ├── router/          # Navigation
    └── stores/          # UI-specific state
```

## Code Quality

The project maintains high code quality through:

- **TypeScript**: Strong typing throughout the application
- **Testing**: Comprehensive unit and E2E test coverage
- **Prettier**: Code formatting consistency
- **Clean Architecture**: Separation of concerns and dependency inversion

## Contributing

1. Follow the established clean architecture patterns
2. Write tests for new features
3. Ensure type safety with TypeScript
4. Format code with Prettier: `npm run format`
5. Run tests before submitting: `npm run test:unit`

## Development Tools

### Recommended IDE Setup
- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur)

### Type Support
The project uses `vue-tsc` for TypeScript type checking with Vue files. Volar extension provides TypeScript language service support for `.vue` files.