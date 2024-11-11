# Database

## Table of Contents

* [Creation](#creation)
* [Migrations](#migrations)

---

### Creation

1. Launch `pqsl` as the `postgres` user:
    
    ```
    psql -U postgres
    ```
    
2. Create the database:
    
    ```
    CREATE DATABASE <DB_NAME>;
    ```
    
3. Create the user:
    
    ```
    CREATE USER <DB_USER> WITH PASSWORD '<DB_PASSWORD>';
    ```
    
4. Connect to the database:
    
    ```
    \c <DB_NAME>
    ```
    
5. Grant `DB_USER` access to all tables:
    
    ```
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <DB_USER>;
    ```
    
6. Quit as the `postgres` user:
    
    ```
    \q
    ```
    
7. Connect as `DB_USER` (provide the password when prompted):
    
    ```
    psql -U <DB_USER> <DB_NAME>
    ```
    

---

### Migrations

1. Open a shell and change to the `packages/api` directory.
2. Execute the following:
     
    ```
    pn db-migrate-dev
    ```
    
