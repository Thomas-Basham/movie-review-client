# Codex Jan2024 Cohort Movie Reviewer Frontend

Welcome to the **Codex Jan2024 Cohort Movie Reviewer Frontend**! This project is the frontend interface for the Codex movie reviewer app, where users can explore movies, read reviews, and soon manage profiles. This frontend is built with **Next.js** and styled using **Tailwind CSS** to provide a fast, modern, and responsive user experience.

## Table of Contents

- [Codex Jan2024 Cohort Movie Reviewer Frontend](#codex-jan2024-cohort-movie-reviewer-frontend)
  - [Table of Contents](#table-of-contents)
  - [About the Project](#about-the-project)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [API Integration](#api-integration)
  - [Development](#development)
    - [Available Scripts](#available-scripts)
    - [Linting and Formatting](#linting-and-formatting)
  - [Contributing](#contributing)
  - [License](#license)
    - [Acknowledgements](#acknowledgements)
    - [Contact](#contact)

---

## About the Project

The **Codex Movie Reviewer** app is designed for the **January 2024 cohort of Code Fellows**. The app allows users to browse and review movies while showcasing the latest movies released during the cohort's learning journey. This project represents the frontend interface of the application and interacts with the backend API to fetch and display movie data, ratings, and reviews.

---

## Features

- **Browse Movies**: Explore a collection of movies with titles, descriptions, release dates, and ratings.
- **Read Reviews**: Users can view reviews and average ratings for each movie.
- **Responsive Design**: The application is fully responsive, providing a seamless experience across desktop, tablet, and mobile devices.
- **Profile Management**: (Coming Soon) Profile page where users can manage their personal movie reviews and preferences.
- **Dynamic Loading**: Fast page loading with lazy loading of images and dynamic fetching of movie data using **React Query**.

---

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (React-based framework for server-side rendering and static site generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **State Management**: [React Query (TanStack)](https://tanstack.com/query/latest) for server-side state fetching and caching
- **Icons**: [Heroicons](https://heroicons.com/) for SVG icons
- **Fonts**: Custom local fonts integrated with `next/font`
- **API**: Integration with a custom backend API for fetching movie data, ratings, and reviews

---

## Installation

### Prerequisites

Before you start, make sure you have the following tools installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/codex-movie-reviewer-frontend.git
   cd codex-movie-reviewer-frontend
   ```

2. **Install dependencies**:

   If you are using npm:

   ```bash
   npm install
   ```

   Or if you're using yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root of your project and add the following environment variables:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://your-api-url-here.com
   NEXT_PUBLIC_OMDB_API_KEY=your-omdb-api-key
   ```

4. **Run the development server**:

   To start the app in development mode, run the following:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

---

## Usage

- **Home Page**: Displays the title of the app and provides access to the movie collection.
- **Movies Page**: A list of available movies, sorted by their ratings. Each movie card contains a thumbnail, title, release year, and a brief description.
- **Movie Details Page**: Click on any movie to view detailed information, including a full description, reviews, and ratings.
- **Profile Page**: (Coming Soon) Displays a "Coming Soon" message when accessed via the header.

---

## API Integration

This project connects to a backend API to fetch and display data about movies and reviews.

- **Movies Endpoint**: Fetches a list of movies along with details like title, release year, and descriptions.
- **Ratings Endpoint**: Fetches the average rating for each movie.
- **OMDb API**: Used to fetch movie thumbnails based on the movie's title and release year.

You can modify the API base URL and OMDb API key by updating the `.env.local` file.

---

## Development

### Available Scripts

In the project directory, you can run:

- `npm run dev` or `yarn dev`: Runs the app in development mode.
- `npm run build` or `yarn build`: Builds the app for production.
- `npm run lint` or `yarn lint`: Lints the code for errors or warnings.

### Linting and Formatting

This project follows best practices for coding style using **ESLint** and **Prettier**.

- **Linting**: Run `npm run lint` to check for code quality issues.
- **Formatting**: Ensure code is formatted consistently by running `npm run format`.

---

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Make your changes**.
4. **Commit your changes**:
   ```bash
   git commit -m "Add my new feature"
   ```
5. **Push to your branch**:
   ```bash
   git push origin feature/my-feature
   ```
6. **Create a pull request**.

Please make sure to follow the [Code of Conduct](./CODE_OF_CONDUCT.md) and the [Contributing Guidelines](./CONTRIBUTING.md) when submitting pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

### Acknowledgements

- **Code Fellows**: This project is part of the January 2024 cohort.
- **Heroicons**: For the free and beautiful icons.
- **OMDb API**: For providing movie thumbnails and additional data.

---

### Contact

For any questions or suggestions, feel free to reach out to the maintainers.

---
