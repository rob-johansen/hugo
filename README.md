# Rob Johansen - Hugo Project

## Setup Steps

If you have any problems getting set up, please let me know and I'd be happy to help!

1. Install Node.js v20 (or at least v18.12) however you like. I use [nvm](https://github.com/nvm-sh/nvm).
2. Install [pnpm](https://pnpm.io/installation) and make sure it's on your path.
3. Install PostgreSQL however you like, and make sure it's running. I'm on a Mac and
   I use [Postgres.app](https://postgresapp.com), but you could use Docker or some
   other installation means. (Note that I used PostgreSQL v14 for this project.)
4. Open a terminal and launch `pqsl` as the `postgres` user:
    
    ```
    psql -U postgres
    ```
    
5. Create the database (I recommend `hugo` for the `<DB_NAME>`):
    
    ```
    CREATE DATABASE <DB_NAME>;
    ```
    
6. Create the user (I recommend `braveheart` for the `<DB_USER>` and `SomeReallyStrongPassword` for the `<DB_PASSWORD>`):
    
    ```
    CREATE USER <DB_USER> WITH PASSWORD '<DB_PASSWORD>';
    ```
    
7. Connect to the database:
    
    ```
    \c <DB_NAME>
    ```
    
8. Grant `DB_USER` access to all tables:
    
    ```
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <DB_USER>;
    ```
    
9. Quit as the `postgres` user:
    
    ```
    \q
    ```
    
10. Clone this repository:
    
    ```
    git clone https://github.com/rob-johansen/hugo.git
    ```
    
11. Install packages via `pnpm` from the root of the repository:
    
    ```
    pnpm install
    ```
    
12. Change to the `packages/api` directory and rename the `.env.example` file to `.env`.
    Make sure all the `DB_` environment variables match the values you chose when setting
    up PostgreSQL.
13. Run the database migrations:
    
    ```
    pnpm db-migrate-dev
    ```
    
14. Change to the `packages/shared/types` directory and build the types that are shared
    between the API and UI:
    
    ```
    pnpm build
    ```
    
15. Change to the `packages/shared/validations` directory and build the validations that are shared
    between the API and UI:

    ```
    pnpm build
    ```
    
16. Change back to the `packages/api` directory and start the API server:
    
    ```
    pnpm run start-api-dev
    ```    
    
17. Change to the `packages/ui` directory and start the UI server (Next.js):
    
    ```
    pnpm run dev
    ```
    
18. Open your browser to http://localhost:3000 and click `Get started` to create a quote!
