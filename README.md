# Project Setup Instructions

## Backend Setup

### Prerequisites
1. Install Docker from [Docker's official website](https://www.docker.com/get-started).

### Steps
1. Navigate to the `Laboratories` directory in your terminal.
2. Run the following command to build and start the Docker containers:
    ```sh
    docker compose up --build -d
    ```

## Frontend Setup

### Prerequisites
1. Ensure you are using Node.js version 16.

### Node.js Installation
1. If Node.js is not installed, download and install it from [Node.js official website](https://nodejs.org/en).
2. After installation, open a new terminal and verify the installation by running:
    ```sh
    node -v
    npm -v
    ```

### NVM (Node Version Manager) Installation
1. Download and install NVM from [NVM for Windows release page](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe).
2. After installation, open a new terminal and verify the installation by running:
    ```sh
    nvm --version
    ```

### Switching Node Version
1. Install Node.js version 16 using NVM:
    ```sh
    nvm install 16
    ```
2. Use Node.js version 16:
    ```sh
    nvm use 16
    ```
3. Verify the Node.js version:
    ```sh
    node -v
    ```

### Frontend Installation and Startup
1. Navigate to the `frontend` directory in your terminal.
2. Install dependencies using Yarn:
    ```sh
    yarn install
    ```
    If Yarn is not installed, install it globally using npm:
    ```sh
    npm install -g yarn
    ```
3. Start the development server:
    ```sh
    yarn dev
    ```

## Accessing the Application

1. Frontend (website): [localhost:3000](http://localhost:3000)
2. Swagger Documentation: [localhost:8080](http://localhost:8080)
3. Admin Panel: [localhost/admin](http://localhost/admin)
