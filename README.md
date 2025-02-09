# Scribe-Backend Setup

Follow the steps below to set up and run the Scribe-Backend application.

## 1. Clone the repository
To clone the repository, use the following command:
```shell
git clone https://github.com/Manoo07/Scribe-Backend.git
```

## 2. Create and Add the Required Environment Variables
Create the `.env` file and copy the contents of `.env.example` into it:
```shell
touch .env && cp .env.example .env
```

## 3. Install Required Node Modules
To install all the required dependencies, run:
```shell
yarn
```

## 4. Start the Application

### Option 1: Start the application without hot-reloading
This command will start the application without hot-reloading (without `nodemon`):
```shell
yarn start
```

### Option 2: Start the application with hot-reloading
This command will start the application with hot-reloading using `nodemon`:
```shell
yarn dev
```

## 5. Run Migrations
To apply database migrations, use the following command:
```shell
yarn prisma migrate dev --name <MIGRATION_NAME>
```
Alternatively, you can run:
```shell
yarn generate
```

## 6. Create a Prisma Client
To generate a Prisma client, run the following command:
```shell
yarn prisma generate
```

Alternatively, you can run:
```shell
yarn migrate --name <MIGRATION_NAME>
```

---

This should guide you through setting up the application and running it locally at `http://localhost:{process.env.PORT}`
