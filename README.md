# Project Documentation

This project is developed using Next.js as the front-end framework and Chakra UI as the primary UI library. Below are the steps to set up the project locally on your development environment.

## Prerequisites

Before setting up the project, make sure you have the following prerequisites installed on your system:

1. **Node.js**: Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
2. **npm**: npm is typically included with Node.js installation, so you don't need to install it separately.

Additionally, for working with TypeScript, ensure that you have TypeScript and ts-node installed on your system.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository**: Begin by cloning the project repository to your local machine.

    ```bash
    git clone https://github.com/samuelp244/bookstore-ui.git
    ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm.

    ```bash
    cd bookstore-ui
    npm install
    ```

3. **Create Environment File**: Create a `.env` file at the root of your project directory. You can copy the `.env.example` file if available and customize it for your specific environment.

4. **Add Backend URL**: In the `.env` file, add the URL of your backend server. For example:

    ```plaintext
    NEXT_PUBLIC_BACKEND_URL=http://your-backend-url
    ```

## Development

To start the development server, run the following command:

```bash
npm run dev
