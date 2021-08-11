# Application Guidelines

## Folder Structure

Description of the project files and directories.

```bash
├── public/                    # Files that will write to dist on build
├── components/                # React components
├── contexts/                  # React context global state without Redux
├── pages/                     # Next.js pages
├── sagas/                     # Redux sagas
├── selectors/                 # Redux Toolkit selectors
├── slices/                    # Redux Toolkit slices
├── store/                     # Redux Toolkit store
├── theme/                     # App theme configuration
├── types/                     # TypeScript types
├── utils/                     # Utility functions
├── .env                       # Environment
├── .eslintrc.js               # Eslint Configuration
├── .gitignore                 # Files ignored by git
├── .prettierrc                # Code convention enforced by Prettier
├── SOLUTION.md
├── package-lock.json          # Package lockfile
├── package.json               # Dependencies and additional information
├── README.md
└── tsconfig.json              # Typescript configuration
```

## Scripts

An explanation of the `package.json` scripts.

| Command      | Description                                               |
| ------------ | --------------------------------------------------------- |
| `start`      | Run App in a development environment                      |
| `build`      | Create a production build of App                          |
| `eslint`     | Run Eslint and Find Problems                              |
| `eslint:fix` | Instructs ESLint to try to fix as many issues as possible |

## Technologies

This project is possible thanks to all these open source languages, libraries, and frameworks.

| Tech                                                       | Description                                                       |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| [React](https://reactjs.org/)                              | Front end user interface                                          |
| [Next.js](https://nextjs.org/)                             | The React Framework for Production                                |
| [TypeScript](https://www.typescriptlang.org/)              | Static type-checking programming language                         |
| [Redux](https://redux.js.org/)                             | Global state management                                           |
| [Redux Thunk](https://github.com/reduxjs/redux-thunk/)     | Thunk middleware for Redux                                        |
| [Redux Saga](https://redux-saga.js.org/)                   | An intuitive Redux side effect manager                            |
| [JSON Server](https://github.com/typicode/json-server)     | fake REST API                                                     |
| [react-i18next](https://react.i18next.com/)                | powerful internationalization framework for React                 |
| [Axios](https://sass-lang.com/)                            | Promise based HTTP client for the browser and node.js             |
| [Sass](https://sass-lang.com/)                             | Style preprocessor                                                |
| [ESLint](https://eslint.org/)                              | TypeScript linting                                                |
| [Material-UI](https://material-ui.com/)                    | A popular React UI framework                                      |
| [Redux Toolkit](https://github.com/reduxjs/redux-toolkit/) | The official, opinionated toolset for efficient Redux development |
| [Day.js](https://day.js.org/)                              | Fast 2kB alternative to Moment.js with the same modern API        |
| [Prettier](https://prettier.io/)                           | An opinionated code formatter                                     |
| [lint-staged](https://www.cypress.io/)                     | Run linters on git staged files                                   |
| [Concurrently](https://www.npmjs.com/package/concurrently) | Run multiple commands concurrently                                |

## Styleguide

Coding conventions are enforced by [ESLint](.eslintrc.js) and [Prettier](.prettierrc).

- No semicolons
- Single quotes
- Two space indentation
- Trailing commas in arrays and objects
- [Non-default exports](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/) are preferred for components
- Module imports are ordered and separated: **built-in** -> **external** -> **internal** -> **css/assets/other**
- TypeScript: strict mode, with no implicitly any
- React: functional style with Hooks (no classes)
- `const` preferred over `let`
