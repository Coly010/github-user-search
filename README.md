# This Dot Coding Exercise - Github User Search

Deployed at [https://github-user-search.vercel.app/](https://github-user-search.vercel.app/)!

### Running Locally

- Clone the repo
- Run `npm install`
- Please set an OAuth Github Token in the `.env` file
- After doing so, run `npm start`

## Highlights

- Using [Nrwl/Nx](https://github.com/nwrl/nx) CLI for following benefits
  - Monorepo tooling to allow for future maintainability and scalability, potentially across teams.
  - Cypress e2e testing out of the box
  - Jest unit testing out of the box
  - Prettier config for consistent code style across the team
- GraphQL with [Apollo](https://www.apollographql.com/docs/angular/) for powerful API calls!
- [Angular Material](https://material.angular.io) used for UI Library
  - Not only does it provide pre-created components matching Material Design, it also provides some a11y benefits
- [NgRx](https://ngrx.io/) is used as the state management solution
- [Transloco](https://ngneat.github.io/transloco/) used as the I18n solution
  - Languages supported are English and Spanish (NOTE: the Spanish translations will be far from accurate)
- [Spectator](https://github.com/ngneat/spectator) used for rapid unit test creation
- Deployed via [Vercel](https://vercel.com/) for that JAMStack goodness!
- Commitizen-friendly repo to ensure consistent commit message structure
  - Useful for tooling such as semantic-release
- Husky
  - Another useful tool for maintaining consistency across the team
  - It hooks into certain events and runs custom scripts
  - In this project, it is used to ensure commit message consistency, check for any linting errors and format staged files

## Deploying on Vercel Notes

We need two environment variables to be set when deploying to Vercel:

```
DEPLOY='vercel'
GITHUB_ACCESS_TOKEN='your token here'
```

Vercel makes it easy to manage the environment variables that are set when deploying the project on their project settings page.

## Development server

Run `ng serve github-user-search` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `ng build github-user-search` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test github-user-search` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e github-user-search` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.
