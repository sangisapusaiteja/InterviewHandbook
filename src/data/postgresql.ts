import type { PostgreSQLTopic, PostgreSQLModule } from "@/types/postgresql";

export const postgresqlTopics: PostgreSQLTopic[] = [
  // ─────────────────────────────────────────────
  // 1. Introduction to PostgreSQL
  // ─────────────────────────────────────────────
  {
    id: "introduction-to-postgresql",
    title: "Introduction to PostgreSQL",
    slug: "introduction-to-postgresql",
    icon: "Database",
    difficulty: "Beginner",
    description:
      "Understand what PostgreSQL is, its history, and why it is one of the most advanced open-source relational database systems.",
    concept: {
      explanation:
        "PostgreSQL is a powerful, open-source object-relational database management system (ORDBMS) that has been actively developed for over 35 years. It originated from the POSTGRES project at the University of California, Berkeley in 1986, led by Professor Michael Stonebraker. PostgreSQL is known for its reliability, feature robustness, and standards compliance. It fully supports SQL and offers many advanced features such as complex queries, foreign keys, triggers, updatable views, transactional integrity, and multiversion concurrency control (MVCC). Unlike many databases, PostgreSQL is truly open-source under the PostgreSQL License, meaning it is free to use, modify, and distribute for any purpose. It runs on all major operating systems including Linux, macOS, and Windows, and supports a wide range of data types including JSON, arrays, and custom types.",
      realLifeAnalogy:
        "Think of PostgreSQL as a highly organised warehouse manager. Just as a warehouse manager keeps track of every item, knows exactly where everything is stored, ensures nothing is lost or duplicated, and can quickly retrieve any item on request — PostgreSQL does the same for your data. It organises information into neat shelves (tables), labels everything clearly (columns and types), and can find any piece of data in milliseconds, no matter how large the warehouse grows.",
      keyPoints: [
        "PostgreSQL is a free, open-source relational database management system",
        "It originated from the POSTGRES project at UC Berkeley in 1986",
        "PostgreSQL is ACID-compliant, ensuring reliable transactions",
        "It supports SQL standards along with many proprietary extensions",
        "MVCC (Multi-Version Concurrency Control) allows multiple users to work simultaneously",
        "It runs on Linux, macOS, Windows, and other major operating systems",
        "PostgreSQL supports advanced data types like JSON, arrays, and hstore",
        "It is used by companies like Apple, Netflix, Spotify, and Instagram",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Introduction to PostgreSQL =====

-- PostgreSQL is a relational database.
-- You interact with it using SQL (Structured Query Language).

-- 1. Check the PostgreSQL version
SELECT version();

-- 2. Get the current date and time
SELECT NOW();

-- 3. Do simple math
SELECT 2 + 3 AS sum;
SELECT 10 * 5 AS product;

-- 4. Work with text
SELECT 'Hello, PostgreSQL!' AS greeting;
SELECT CONCAT('Welcome to ', 'PostgreSQL!') AS message;

-- 5. Use built-in functions
SELECT UPPER('hello') AS uppercased;
SELECT LENGTH('PostgreSQL') AS name_length;

-- 6. Get current database and user
SELECT current_database();
SELECT current_user;

-- Try modifying the queries above and run them!
`,
    },
    interviewQuestions: [
      {
        question: "What is PostgreSQL and how is it different from MySQL?",
        difficulty: "Easy",
        hint: "PostgreSQL is an object-relational database with full ACID compliance, MVCC, and support for advanced data types. MySQL is simpler and faster for read-heavy workloads but has fewer advanced features. PostgreSQL supports table inheritance, custom types, and full-text search natively.",
      },
      {
        question: "What does ACID stand for and why is it important in databases?",
        difficulty: "Medium",
        hint: "ACID stands for Atomicity (transactions are all-or-nothing), Consistency (data remains valid after transactions), Isolation (concurrent transactions don't interfere), and Durability (committed data survives crashes). ACID ensures data integrity and reliability.",
      },
      {
        question: "What is MVCC and how does PostgreSQL use it?",
        difficulty: "Hard",
        hint: "MVCC (Multi-Version Concurrency Control) allows PostgreSQL to handle multiple concurrent transactions without locking. Each transaction sees a snapshot of the data. Writers don't block readers and readers don't block writers. PostgreSQL implements this by keeping multiple versions of rows.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Installing PostgreSQL
  // ─────────────────────────────────────────────
  {
    id: "installing-postgresql",
    title: "Installing PostgreSQL",
    slug: "installing-postgresql",
    icon: "Download",
    difficulty: "Beginner",
    description:
      "Learn how to install PostgreSQL on different operating systems and verify the installation using the command line.",
    concept: {
      explanation:
        "Installing PostgreSQL involves downloading the database server software and setting it up on your machine. On Linux, you can install it via package managers like apt (Ubuntu/Debian) or yum (CentOS/RHEL). On macOS, you can use Homebrew or the Postgres.app graphical installer. On Windows, the EnterpriseDB installer provides a straightforward setup wizard. After installation, PostgreSQL runs as a background service (daemon) that listens for connections on port 5432 by default. The installation includes several key tools: psql (the command-line interface), createdb (to create databases), pg_dump (for backups), and pgAdmin (a web-based GUI). PostgreSQL creates a default superuser called 'postgres' during installation. You connect to the database using psql, which gives you an interactive terminal to run SQL commands.",
      realLifeAnalogy:
        "Installing PostgreSQL is like setting up a filing cabinet system in your office. First you buy the cabinet (download the software), then you assemble it and place it in a room (install and configure). You designate a manager who has the master key (the postgres superuser). The cabinet starts empty but is ready to store folders (databases) containing organised documents (tables with data). The psql tool is like a desk where you sit to file and retrieve documents.",
      keyPoints: [
        "PostgreSQL can be installed on Linux, macOS, and Windows",
        "On Ubuntu/Debian: sudo apt install postgresql postgresql-contrib",
        "On macOS: brew install postgresql or use Postgres.app",
        "On Windows: use the EnterpriseDB graphical installer",
        "PostgreSQL runs as a service on port 5432 by default",
        "psql is the built-in command-line tool for interacting with PostgreSQL",
        "A default superuser named 'postgres' is created during installation",
        "pgAdmin provides a web-based graphical interface for management",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Installing PostgreSQL =====

-- After installing PostgreSQL, use these commands to verify:

-- 1. Connect to PostgreSQL using psql
-- In your terminal: psql -U postgres

-- 2. Check PostgreSQL version
SELECT version();

-- 3. List all databases
\\l

-- 4. List all users/roles
\\du

-- 5. Show connection info
\\conninfo

-- 6. Check server status
SELECT pg_is_in_recovery();

-- 7. Show the data directory location
SHOW data_directory;

-- 8. Show the current port
SHOW port;

-- Common psql meta-commands:
-- \\q    - Quit psql
-- \\l    - List databases
-- \\dt   - List tables
-- \\du   - List users
-- \\?    - Help with psql commands
-- \\h    - Help with SQL commands
`,
    },
    interviewQuestions: [
      {
        question: "What is the default port for PostgreSQL and how would you change it?",
        difficulty: "Easy",
        hint: "The default port is 5432. You can change it by editing the 'port' parameter in postgresql.conf, which is located in the data directory. After changing, restart the PostgreSQL service for the change to take effect.",
      },
      {
        question: "What is the difference between psql and pgAdmin?",
        difficulty: "Easy",
        hint: "psql is a command-line interface for PostgreSQL that allows you to run SQL queries and meta-commands directly in the terminal. pgAdmin is a web-based graphical user interface that provides a visual way to manage databases, run queries, and monitor performance. Both connect to the same PostgreSQL server.",
      },
      {
        question: "How would you verify that PostgreSQL is running on a Linux server?",
        difficulty: "Medium",
        hint: "You can check with: sudo systemctl status postgresql, or pg_isready to test if the server is accepting connections, or try connecting with psql -U postgres. You can also check if the process is running with ps aux | grep postgres.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. PostgreSQL Architecture
  // ─────────────────────────────────────────────
  {
    id: "postgresql-architecture",
    title: "PostgreSQL Architecture",
    slug: "postgresql-architecture",
    icon: "Layers",
    difficulty: "Beginner",
    description:
      "Explore the internal architecture of PostgreSQL including its process model, memory structure, and storage layout.",
    concept: {
      explanation:
        "PostgreSQL follows a client-server architecture with a multi-process model. When the PostgreSQL server starts, it launches a main process called the Postmaster, which listens for incoming client connections. For each new connection, the Postmaster forks a dedicated backend process that handles all queries for that client. The server uses shared memory for caching data pages (the shared buffer pool), tracking transactions, and managing locks. The Write-Ahead Log (WAL) ensures durability by recording changes before they are written to the actual data files. PostgreSQL stores data in a directory called the data directory (PGDATA), which contains configuration files (postgresql.conf, pg_hba.conf), WAL files, and the actual table data stored as files on disk. Background processes like the autovacuum daemon, WAL writer, checkpointer, and stats collector perform maintenance tasks automatically.",
      realLifeAnalogy:
        "Think of PostgreSQL architecture like a restaurant. The Postmaster is the host at the front door who greets every customer and assigns them a waiter (backend process). Each waiter exclusively serves their assigned table (client connection). The kitchen (shared memory) is where all the food preparation happens — multiple waiters bring orders to the same kitchen. The recipe book (WAL) records every dish made, so if there is a fire (crash), they can recreate everything. The pantry (data directory) stores all the raw ingredients (data files).",
      keyPoints: [
        "PostgreSQL uses a multi-process architecture, not multi-threaded",
        "The Postmaster process manages connections and forks backend processes",
        "Each client connection gets its own dedicated backend process",
        "Shared buffers cache frequently accessed data pages in memory",
        "WAL (Write-Ahead Log) ensures data durability and crash recovery",
        "The data directory (PGDATA) contains all database files and configurations",
        "postgresql.conf controls server settings; pg_hba.conf controls authentication",
        "Background workers handle vacuuming, WAL writing, and statistics collection",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== PostgreSQL Architecture =====

-- 1. Show the data directory
SHOW data_directory;

-- 2. Show shared buffer size
SHOW shared_buffers;

-- 3. Show maximum connections allowed
SHOW max_connections;

-- 4. Show WAL level
SHOW wal_level;

-- 5. View active connections (backend processes)
SELECT pid, usename, datname, state, query
FROM pg_stat_activity
LIMIT 5;

-- 6. Check database size
SELECT pg_database.datname,
       pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database
ORDER BY pg_database_size(pg_database.datname) DESC;

-- 7. Show important configuration settings
SELECT name, setting, unit, short_desc
FROM pg_settings
WHERE name IN ('shared_buffers', 'work_mem', 'max_connections', 'wal_level')
ORDER BY name;

-- 8. Check background processes
SELECT pid, backend_type
FROM pg_stat_activity
WHERE backend_type != 'client backend';
`,
    },
    interviewQuestions: [
      {
        question: "Explain the PostgreSQL client-server architecture.",
        difficulty: "Medium",
        hint: "PostgreSQL uses a multi-process model. The Postmaster listens for connections and forks a new backend process for each client. Each backend handles queries independently. They communicate through shared memory for data caching and lock management.",
      },
      {
        question: "What is the Write-Ahead Log (WAL) and why is it important?",
        difficulty: "Hard",
        hint: "WAL ensures durability by writing changes to a log file before modifying the actual data files. If the server crashes, PostgreSQL replays the WAL to recover committed transactions. WAL is also used for replication — replicas can apply WAL records to stay in sync with the primary.",
      },
      {
        question: "What are the key configuration files in PostgreSQL?",
        difficulty: "Easy",
        hint: "postgresql.conf controls server settings like memory allocation, connections, and logging. pg_hba.conf controls client authentication — who can connect and how. pg_ident.conf maps OS usernames to PostgreSQL usernames for ident-based authentication.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Creating a Database
  // ─────────────────────────────────────────────
  {
    id: "creating-a-database",
    title: "Creating a Database",
    slug: "creating-a-database",
    icon: "FolderPlus",
    difficulty: "Beginner",
    description:
      "Learn how to create, connect to, and manage databases in PostgreSQL using SQL commands and psql.",
    concept: {
      explanation:
        "A database in PostgreSQL is a named collection of schemas, tables, functions, and other objects. Each PostgreSQL server (cluster) can host multiple databases, and each database is isolated from others — you cannot directly query across databases in a single SQL statement. You create a database using the CREATE DATABASE command, specifying options like the owner, encoding (usually UTF8), and a template. PostgreSQL comes with a template database called template1 that serves as the blueprint for new databases. You can also use the createdb command-line utility. To connect to a specific database, use \\c database_name in psql or specify it when connecting. Databases can be renamed, have their settings altered, or be dropped when no longer needed. The default database 'postgres' is created during installation and is commonly used for administrative tasks.",
      realLifeAnalogy:
        "A PostgreSQL server is like a large office building, and each database is a separate office suite within it. Each suite (database) has its own rooms (schemas), filing cabinets (tables), and employees (functions). People in one suite cannot directly access files in another suite. When you create a new database, it is like leasing a new office suite that comes with basic furniture (from template1) — you then customise it to fit your needs.",
      keyPoints: [
        "CREATE DATABASE creates a new database with specified settings",
        "Each database is isolated — cross-database queries are not directly possible",
        "template1 is the default template used when creating new databases",
        "UTF8 is the recommended encoding for new databases",
        "The 'postgres' database is created by default during installation",
        "Use \\c or \\connect in psql to switch between databases",
        "DROP DATABASE permanently deletes a database and all its data",
        "Only superusers or database owners can drop databases",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Creating a Database =====

-- 1. Create a simple database
CREATE DATABASE my_first_db;

-- 2. Create a database with options
CREATE DATABASE company_db
  OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'en_US.UTF-8'
  LC_CTYPE = 'en_US.UTF-8';

-- 3. Create database only if it does not exist
-- (PostgreSQL 9.0+)
-- SELECT 'CREATE DATABASE test_db'
-- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'test_db');

-- 4. List all databases
SELECT datname, datdba, encoding, datcollate
FROM pg_database
ORDER BY datname;

-- 5. Connect to a database (in psql)
-- \\c my_first_db

-- 6. Check the current database
SELECT current_database();

-- 7. Rename a database
-- ALTER DATABASE my_first_db RENAME TO my_app_db;

-- 8. Drop a database (use with caution!)
-- DROP DATABASE my_first_db;

-- 9. Check database size
SELECT pg_size_pretty(pg_database_size('my_first_db')) AS db_size;
`,
    },
    interviewQuestions: [
      {
        question: "How do you create a database in PostgreSQL?",
        difficulty: "Easy",
        hint: "Use CREATE DATABASE db_name; to create a database with defaults. You can specify options like OWNER, ENCODING, and TEMPLATE. You can also use the createdb command-line tool. Only users with the CREATEDB privilege or superusers can create databases.",
      },
      {
        question: "What is the template database in PostgreSQL?",
        difficulty: "Medium",
        hint: "template1 is the default template used when creating new databases — any objects in template1 are copied to new databases. template0 is a clean template that should never be modified. You can specify TEMPLATE template0 when you need a pristine database, especially when restoring from a dump with a different encoding.",
      },
      {
        question: "Can you query across multiple databases in PostgreSQL?",
        difficulty: "Medium",
        hint: "PostgreSQL does not support cross-database queries directly like SQL Server. However, you can use the dblink extension or foreign data wrappers (FDW) to query data from another database. Alternatively, use schemas within a single database to organise data instead of multiple databases.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. PostgreSQL Data Types
  // ─────────────────────────────────────────────
  {
    id: "postgresql-data-types",
    title: "PostgreSQL Data Types",
    slug: "postgresql-data-types",
    icon: "Blocks",
    difficulty: "Beginner",
    description:
      "Explore the rich set of data types available in PostgreSQL including numeric, text, date/time, boolean, and special types.",
    concept: {
      explanation:
        "PostgreSQL offers a rich set of built-in data types that cover virtually every data storage need. Numeric types include INTEGER (4 bytes), BIGINT (8 bytes), SMALLINT (2 bytes), DECIMAL/NUMERIC (exact precision), REAL (4-byte floating point), and DOUBLE PRECISION (8-byte floating point). SERIAL and BIGSERIAL are auto-incrementing integer types commonly used for primary keys. Text types include CHAR(n) (fixed length), VARCHAR(n) (variable length with limit), and TEXT (unlimited length). Date/time types include DATE, TIME, TIMESTAMP, TIMESTAMPTZ (with time zone), and INTERVAL. BOOLEAN stores true/false values. PostgreSQL also provides special types like UUID, JSON/JSONB (binary JSON for faster queries), ARRAY (store multiple values in one column), BYTEA (binary data), INET/CIDR (network addresses), and user-defined ENUM types. Choosing the right data type is crucial for data integrity, storage efficiency, and query performance.",
      realLifeAnalogy:
        "Data types are like different types of containers in a kitchen. You use a measuring cup for liquids (NUMERIC), a labelled jar for spices with names (VARCHAR), a calendar for dates (DATE), a timer for durations (INTERVAL), and a light switch for yes/no states (BOOLEAN). Using the right container ensures nothing spills, nothing gets mixed up, and you can find what you need quickly. Using the wrong container — like storing a date in a text field — is like putting soup in a paper bag.",
      keyPoints: [
        "INTEGER (4 bytes), BIGINT (8 bytes), SMALLINT (2 bytes) for whole numbers",
        "NUMERIC/DECIMAL for exact precision (money, measurements)",
        "VARCHAR(n) for variable-length text, TEXT for unlimited text",
        "TIMESTAMP and TIMESTAMPTZ for date and time values",
        "BOOLEAN stores TRUE, FALSE, or NULL",
        "SERIAL/BIGSERIAL auto-increment for primary keys",
        "JSONB stores JSON data in binary format for fast querying",
        "ARRAY allows storing multiple values of the same type in one column",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== PostgreSQL Data Types =====

-- 1. Numeric types
SELECT 42 AS integer_val,
       3.14159 AS numeric_val,
       1000000000000 AS bigint_val;

-- 2. Text types
SELECT 'Hello'::CHAR(10) AS fixed_char,
       'Hello'::VARCHAR(50) AS varchar_val,
       'Hello World'::TEXT AS text_val;

-- 3. Boolean type
SELECT TRUE AS is_active,
       FALSE AS is_deleted,
       NULL::BOOLEAN AS unknown;

-- 4. Date and time types
SELECT CURRENT_DATE AS today,
       CURRENT_TIME AS now_time,
       CURRENT_TIMESTAMP AS now_full,
       INTERVAL '2 hours 30 minutes' AS duration;

-- 5. Date arithmetic
SELECT CURRENT_DATE + INTERVAL '7 days' AS next_week,
       CURRENT_DATE - INTERVAL '1 month' AS last_month;

-- 6. JSON type
SELECT '{"name": "Alice", "age": 30}'::JSONB AS person;
SELECT '{"name": "Alice"}'::JSONB ->> 'name' AS extracted_name;

-- 7. Array type
SELECT ARRAY[1, 2, 3, 4, 5] AS numbers;
SELECT ARRAY['red', 'green', 'blue'] AS colors;

-- 8. UUID type
SELECT gen_random_uuid() AS random_id;

-- 9. Check the type of a value
SELECT pg_typeof(42) AS int_type,
       pg_typeof('hello') AS text_type,
       pg_typeof(3.14) AS numeric_type,
       pg_typeof(TRUE) AS bool_type;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between CHAR, VARCHAR, and TEXT in PostgreSQL?",
        difficulty: "Easy",
        hint: "CHAR(n) is fixed-length — it pads with spaces to fill n characters. VARCHAR(n) is variable-length with a maximum of n characters. TEXT has no length limit. In PostgreSQL, TEXT and VARCHAR without a length specifier are essentially the same. There is no performance difference between VARCHAR and TEXT in PostgreSQL.",
      },
      {
        question: "When would you use NUMERIC vs REAL/DOUBLE PRECISION?",
        difficulty: "Medium",
        hint: "Use NUMERIC/DECIMAL for exact precision where rounding errors are unacceptable, like financial calculations (money). Use REAL or DOUBLE PRECISION for scientific calculations where slight imprecision is acceptable but speed matters. Floating-point types are faster but can introduce rounding errors.",
      },
      {
        question: "What is the difference between JSON and JSONB in PostgreSQL?",
        difficulty: "Medium",
        hint: "JSON stores data as plain text and preserves formatting, key order, and duplicate keys. JSONB stores data in a decomposed binary format — it is slower to insert (due to parsing) but much faster to query, supports indexing (GIN indexes), and removes duplicate keys. Use JSONB in almost all cases.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Creating Tables
  // ─────────────────────────────────────────────
  {
    id: "creating-tables",
    title: "Creating Tables",
    slug: "creating-tables",
    icon: "Table",
    difficulty: "Beginner",
    description:
      "Learn how to create tables in PostgreSQL with columns, data types, and default values using the CREATE TABLE statement.",
    concept: {
      explanation:
        "Tables are the fundamental storage structure in a relational database. A table is organised into rows (records) and columns (fields), where each column has a name and a specific data type. You create tables using the CREATE TABLE statement, specifying the table name, column definitions, and optional constraints. Each column definition includes the column name, data type, and any column-level constraints (like NOT NULL or DEFAULT). You can use IF NOT EXISTS to avoid errors when a table already exists. Tables belong to a schema (default is 'public') and a database. PostgreSQL supports temporary tables that exist only for the duration of a session. You can also create a table based on the structure of an existing table using CREATE TABLE ... (LIKE ...) or from a query using CREATE TABLE ... AS SELECT.",
      realLifeAnalogy:
        "Creating a table is like designing a spreadsheet. You first decide on the column headers (column names), what type of data goes in each column (data types), and any rules (constraints). For example, an 'employees' spreadsheet would have columns for name (text), age (number), hire date (date), and salary (number). Once the spreadsheet template is designed, you can start filling in rows of data. The template ensures everyone enters data consistently.",
      keyPoints: [
        "CREATE TABLE defines a new table with columns and their data types",
        "Each column must have a name and a data type",
        "IF NOT EXISTS prevents errors when the table already exists",
        "DEFAULT sets a value when no value is provided during INSERT",
        "Tables are created in the 'public' schema by default",
        "SERIAL or GENERATED ALWAYS AS IDENTITY for auto-incrementing IDs",
        "Temporary tables (CREATE TEMP TABLE) exist only during the session",
        "CREATE TABLE ... AS SELECT creates a table from a query result",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Creating Tables =====

-- 1. Create a simple table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    hire_date DATE DEFAULT CURRENT_DATE,
    salary NUMERIC(10, 2),
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Create a table with IF NOT EXISTS
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create a table with GENERATED ALWAYS AS IDENTITY
CREATE TABLE products (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(8, 2) NOT NULL,
    description TEXT
);

-- 4. List all tables in the current schema
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 5. Describe a table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'employees'
ORDER BY ordinal_position;

-- 6. Drop tables (cleanup)
-- DROP TABLE IF EXISTS employees, departments, products;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between SERIAL and GENERATED ALWAYS AS IDENTITY?",
        difficulty: "Medium",
        hint: "SERIAL creates a sequence and sets a default, but you can still manually insert values. GENERATED ALWAYS AS IDENTITY (SQL standard) prevents manual value insertion unless you use OVERRIDING SYSTEM VALUE. GENERATED BY DEFAULT AS IDENTITY allows manual values. Identity columns are the modern, preferred approach.",
      },
      {
        question: "How do you create a table from the result of a query?",
        difficulty: "Easy",
        hint: "Use CREATE TABLE new_table AS SELECT ... FROM existing_table. This creates the table and copies the data. To copy only the structure without data, add WHERE FALSE or use CREATE TABLE new_table (LIKE existing_table INCLUDING ALL).",
      },
      {
        question: "What is a temporary table and when would you use one?",
        difficulty: "Medium",
        hint: "A temporary table is created with CREATE TEMP TABLE and exists only for the current database session. It is automatically dropped when the session ends. Use them for intermediate results in complex queries, staging data during ETL processes, or storing session-specific calculations.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. Altering Tables
  // ─────────────────────────────────────────────
  {
    id: "altering-tables",
    title: "Altering Tables",
    slug: "altering-tables",
    icon: "Pencil",
    difficulty: "Beginner",
    description:
      "Learn how to modify existing table structures by adding, dropping, or renaming columns and changing data types.",
    concept: {
      explanation:
        "The ALTER TABLE statement allows you to modify an existing table's structure without losing the data it contains. You can add new columns, drop existing columns, rename columns or the table itself, change a column's data type, set or remove default values, and add or drop constraints. When adding a column, existing rows get NULL (or the specified default) for the new column. When changing a data type, PostgreSQL attempts to cast existing values to the new type — if the conversion is not possible, the operation fails. Dropping a column does not immediately reclaim disk space; the space is reclaimed during the next VACUUM operation. ALTER TABLE can also be used to change table ownership, move a table to a different schema, or set storage parameters. For large tables, some ALTER TABLE operations can be very fast (like adding a column with no default) while others require rewriting the entire table (like changing a column's type).",
      realLifeAnalogy:
        "Altering a table is like renovating a building while people are still living in it. You can add a new room (add column), knock down a wall (drop column), rename a room (rename column), or change a room's purpose from a bedroom to an office (change data type). The key challenge is making these changes without disrupting the current residents (existing data). Some renovations are simple — hanging a new sign is quick (rename). Others are complex — changing the plumbing (data type change) might require temporary disruptions.",
      keyPoints: [
        "ALTER TABLE modifies an existing table's structure",
        "ADD COLUMN adds a new column — existing rows get NULL or the default value",
        "DROP COLUMN removes a column (space reclaimed during VACUUM)",
        "RENAME COLUMN changes a column's name without affecting data",
        "ALTER COLUMN ... TYPE changes a column's data type (may require casting)",
        "SET DEFAULT / DROP DEFAULT changes or removes column defaults",
        "SET NOT NULL / DROP NOT NULL adds or removes the NOT NULL constraint",
        "RENAME TO changes the table name itself",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Altering Tables =====

-- Setup: create a sample table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

-- 1. Add a new column
ALTER TABLE employees ADD COLUMN age INTEGER;

-- 2. Add a column with a default value
ALTER TABLE employees ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

-- 3. Drop a column
ALTER TABLE employees DROP COLUMN IF EXISTS age;

-- 4. Rename a column
ALTER TABLE employees RENAME COLUMN name TO full_name;

-- 5. Change a column's data type
ALTER TABLE employees ALTER COLUMN full_name TYPE VARCHAR(100);

-- 6. Set a default value
ALTER TABLE employees ALTER COLUMN email SET DEFAULT 'not@provided.com';

-- 7. Add NOT NULL constraint
-- (ensure no NULLs exist first)
-- ALTER TABLE employees ALTER COLUMN full_name SET NOT NULL;

-- 8. Drop NOT NULL constraint
-- ALTER TABLE employees ALTER COLUMN full_name DROP NOT NULL;

-- 9. Rename the table
-- ALTER TABLE employees RENAME TO staff;

-- 10. Add multiple columns at once
ALTER TABLE employees
    ADD COLUMN department VARCHAR(50),
    ADD COLUMN salary NUMERIC(10, 2);

-- Check the updated structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'employees'
ORDER BY ordinal_position;
`,
    },
    interviewQuestions: [
      {
        question: "How do you add a column to an existing table in PostgreSQL?",
        difficulty: "Easy",
        hint: "Use ALTER TABLE table_name ADD COLUMN column_name data_type. You can include constraints like NOT NULL (if you also provide a DEFAULT), DEFAULT, UNIQUE, etc. Existing rows will have NULL or the default value for the new column.",
      },
      {
        question: "What happens when you change a column's data type?",
        difficulty: "Medium",
        hint: "PostgreSQL attempts to implicitly cast all existing values to the new type. If conversion is not possible (e.g., text 'abc' to INTEGER), the operation fails. You can use USING to provide a custom conversion expression: ALTER COLUMN col TYPE INTEGER USING col::INTEGER.",
      },
      {
        question: "Does dropping a column immediately free up disk space?",
        difficulty: "Hard",
        hint: "No. When you drop a column, PostgreSQL marks it as invisible but does not physically remove the data from existing rows. The space is reclaimed when the table is rewritten, which happens during VACUUM FULL or when the table is otherwise rewritten. This makes DROP COLUMN fast even for large tables.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. Dropping Tables
  // ─────────────────────────────────────────────
  {
    id: "dropping-tables",
    title: "Dropping Tables",
    slug: "dropping-tables",
    icon: "Trash2",
    difficulty: "Beginner",
    description:
      "Learn how to safely remove tables from a PostgreSQL database using DROP TABLE and understand its implications.",
    concept: {
      explanation:
        "The DROP TABLE statement permanently removes a table and all its data from the database. Once dropped, the table, its data, indexes, triggers, constraints, and permissions are all deleted and cannot be recovered without a backup. You can use IF EXISTS to prevent errors when the table does not exist. The CASCADE option automatically drops dependent objects (like views or foreign key constraints that reference the table), while RESTRICT (the default) prevents dropping if any dependencies exist. You can drop multiple tables in a single statement by listing them separated by commas. The TRUNCATE command is an alternative when you want to remove all data but keep the table structure. Unlike DELETE, TRUNCATE is faster because it does not scan every row — it deallocates the data pages directly.",
      realLifeAnalogy:
        "DROP TABLE is like demolishing a building. Everything inside — furniture, files, decorations — is destroyed along with the structure. IF EXISTS is like checking whether the building actually exists before sending the demolition crew, avoiding wasted effort. CASCADE is like also demolishing any bridges or walkways connected to the building (dependent objects). TRUNCATE is different — it is like emptying all the furniture and files from the building but leaving the structure standing, ready to be refurnished.",
      keyPoints: [
        "DROP TABLE permanently removes a table and all its data",
        "IF EXISTS prevents errors if the table does not exist",
        "CASCADE drops dependent objects like views and foreign key references",
        "RESTRICT (default) prevents dropping if dependencies exist",
        "Multiple tables can be dropped in one statement: DROP TABLE t1, t2, t3",
        "TRUNCATE removes all rows but keeps the table structure",
        "TRUNCATE is faster than DELETE for removing all rows",
        "Dropped tables cannot be recovered without a backup",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Dropping Tables =====

-- Setup: create sample tables
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product VARCHAR(50),
    quantity INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    item_name VARCHAR(100),
    price NUMERIC(8, 2)
);

-- 1. Drop a table (basic)
-- DROP TABLE orders;

-- 2. Drop with IF EXISTS (safe)
DROP TABLE IF EXISTS temp_table;

-- 3. Drop with CASCADE (removes dependencies too)
-- DROP TABLE orders CASCADE;

-- 4. Drop multiple tables at once
-- DROP TABLE IF EXISTS orders, order_items;

-- 5. TRUNCATE - remove all rows but keep the table
INSERT INTO orders (product, quantity) VALUES ('Widget', 10);
INSERT INTO orders (product, quantity) VALUES ('Gadget', 5);

SELECT * FROM orders;  -- shows data

TRUNCATE TABLE orders CASCADE;

SELECT * FROM orders;  -- empty table, structure intact

-- 6. TRUNCATE and reset the identity/serial counter
-- TRUNCATE TABLE orders RESTART IDENTITY;

-- 7. Check if a table exists
SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'orders'
) AS table_exists;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between DROP TABLE and TRUNCATE TABLE?",
        difficulty: "Easy",
        hint: "DROP TABLE removes the entire table (structure + data) from the database. TRUNCATE TABLE removes all rows but keeps the table structure, indexes, and constraints intact. TRUNCATE is also faster than DELETE FROM table because it doesn't scan individual rows.",
      },
      {
        question: "What is the difference between TRUNCATE and DELETE?",
        difficulty: "Medium",
        hint: "DELETE removes rows one by one, logs each deletion, fires triggers, and can have a WHERE clause. TRUNCATE deallocates entire data pages at once, is much faster, does not fire row-level triggers, and cannot have a WHERE clause. TRUNCATE also resets identity columns with RESTART IDENTITY.",
      },
      {
        question: "What does CASCADE mean in DROP TABLE ... CASCADE?",
        difficulty: "Medium",
        hint: "CASCADE automatically drops all objects that depend on the table, such as views that reference it, foreign key constraints from other tables, and materialized views. Without CASCADE (using default RESTRICT), PostgreSQL refuses to drop the table if any dependencies exist.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. PostgreSQL Constraints
  // ─────────────────────────────────────────────
  {
    id: "postgresql-constraints",
    title: "PostgreSQL Constraints",
    slug: "postgresql-constraints",
    icon: "ShieldCheck",
    difficulty: "Beginner",
    description:
      "Learn about constraints in PostgreSQL that enforce data integrity rules — NOT NULL, UNIQUE, CHECK, DEFAULT, and EXCLUSION.",
    concept: {
      explanation:
        "Constraints are rules enforced on table columns to ensure the integrity and accuracy of data. PostgreSQL supports several types of constraints. NOT NULL ensures a column cannot contain NULL values. UNIQUE ensures all values in a column (or combination of columns) are distinct. CHECK allows you to define a custom boolean expression that must be true for every row. DEFAULT specifies a value to use when no value is provided during INSERT. EXCLUSION constraints use operators to ensure that if any two rows are compared, at least one of the specified comparisons returns false (useful for preventing overlapping ranges). Constraints can be defined at the column level (inline with the column definition) or at the table level (after all column definitions). Table-level constraints are required when the constraint involves multiple columns. You can name constraints for easier identification and management. Constraints can be added to existing tables using ALTER TABLE and removed using ALTER TABLE ... DROP CONSTRAINT.",
      realLifeAnalogy:
        "Constraints are like rules in a library. NOT NULL is like requiring every book to have a title — you cannot register a book without one. UNIQUE is like requiring every book to have a unique ISBN — no duplicates allowed. CHECK is like a rule that says the publication year must be between 1450 and the current year. DEFAULT is like automatically stamping today's date when a book is checked in without specifying a date. These rules prevent errors and keep the library's records clean and reliable.",
      keyPoints: [
        "NOT NULL prevents a column from storing NULL values",
        "UNIQUE ensures all values in a column are distinct (NULLs are allowed)",
        "CHECK validates data against a custom boolean expression",
        "DEFAULT provides a fallback value when none is specified on INSERT",
        "Constraints can be column-level (inline) or table-level (after columns)",
        "Named constraints are easier to manage: CONSTRAINT name CHECK (...)",
        "Use ALTER TABLE ADD CONSTRAINT to add constraints to existing tables",
        "Use ALTER TABLE DROP CONSTRAINT to remove constraints",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== PostgreSQL Constraints =====

-- 1. NOT NULL constraint
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,       -- cannot be NULL
    email VARCHAR(100) NOT NULL UNIQUE -- cannot be NULL + must be unique
);

-- 2. CHECK constraint
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(8, 2) CHECK (price > 0),
    quantity INTEGER CHECK (quantity >= 0),
    category VARCHAR(50) CHECK (category IN ('Electronics', 'Books', 'Clothing'))
);

-- 3. DEFAULT constraint
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Named constraints (easier to manage)
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    age INTEGER,
    salary NUMERIC(10, 2),
    CONSTRAINT emp_email_unique UNIQUE (email),
    CONSTRAINT emp_age_check CHECK (age >= 18 AND age <= 120),
    CONSTRAINT emp_salary_positive CHECK (salary > 0)
);

-- 5. Test the constraints
INSERT INTO students (name, email) VALUES ('Alice', 'alice@example.com');
-- This will fail: NOT NULL violation
-- INSERT INTO students (name, email) VALUES (NULL, 'bob@example.com');
-- This will fail: UNIQUE violation
-- INSERT INTO students (name, email) VALUES ('Bob', 'alice@example.com');

-- 6. Test CHECK constraint
INSERT INTO products (name, price, quantity, category)
VALUES ('Laptop', 999.99, 10, 'Electronics');
-- This will fail: CHECK violation
-- INSERT INTO products (name, price, quantity, category)
-- VALUES ('Free Item', -5, 10, 'Books');

-- 7. Add a constraint to an existing table
-- ALTER TABLE students ADD CONSTRAINT age_check CHECK (age > 0);

-- 8. Drop a constraint
-- ALTER TABLE employees DROP CONSTRAINT emp_age_check;

-- 9. View constraints on a table
SELECT conname, contype, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'employees'::regclass;
`,
    },
    interviewQuestions: [
      {
        question: "What are the different types of constraints in PostgreSQL?",
        difficulty: "Easy",
        hint: "PostgreSQL supports NOT NULL (no null values), UNIQUE (no duplicate values), PRIMARY KEY (NOT NULL + UNIQUE), FOREIGN KEY (references another table), CHECK (custom validation), DEFAULT (fallback value), and EXCLUSION (prevents overlapping values). Constraints enforce data integrity at the database level.",
      },
      {
        question: "Can a UNIQUE column contain multiple NULL values?",
        difficulty: "Medium",
        hint: "Yes, in PostgreSQL, a UNIQUE constraint allows multiple NULL values because NULL is considered unknown and not equal to any other NULL. This follows the SQL standard. If you need to treat NULLs as equal, you can create a unique index with NULLS NOT DISTINCT (PostgreSQL 15+).",
      },
      {
        question: "What is the difference between column-level and table-level constraints?",
        difficulty: "Medium",
        hint: "Column-level constraints are defined inline with the column definition and apply to a single column. Table-level constraints are defined after all columns and can reference multiple columns. For example, a composite UNIQUE constraint on (first_name, last_name) must be table-level. PRIMARY KEY, UNIQUE, CHECK, and FOREIGN KEY can be either level.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. Primary Key and Foreign Key
  // ─────────────────────────────────────────────
  {
    id: "primary-key-and-foreign-key",
    title: "Primary Key and Foreign Key",
    slug: "primary-key-and-foreign-key",
    icon: "KeyRound",
    difficulty: "Beginner",
    description:
      "Understand primary keys for unique row identification and foreign keys for establishing relationships between tables.",
    concept: {
      explanation:
        "A PRIMARY KEY is a column (or combination of columns) that uniquely identifies each row in a table. It combines the NOT NULL and UNIQUE constraints — every row must have a value and no two rows can have the same primary key value. Each table can have only one primary key. A primary key can be a single column (simple) or multiple columns (composite). Common choices include auto-incrementing integers (SERIAL) or UUIDs. A FOREIGN KEY is a column in one table that references the primary key of another table, establishing a relationship between the two tables. Foreign keys enforce referential integrity — you cannot insert a value in the foreign key column that does not exist in the referenced table. Foreign keys support actions on DELETE and UPDATE: CASCADE (propagate the change), SET NULL (set to NULL), SET DEFAULT (set to default), and RESTRICT/NO ACTION (prevent the change). Foreign keys are the foundation of relational database design.",
      realLifeAnalogy:
        "A primary key is like a national ID number — every citizen has one, no two people share the same number, and it uniquely identifies each person. A foreign key is like the 'emergency contact' field on a form that must reference a real person's ID. If you write a non-existent ID number, the form is rejected (referential integrity). If a person moves away (deleted), the system can either update all references to their new ID (CASCADE), clear the emergency contact field (SET NULL), or refuse to let them leave until all references are resolved (RESTRICT).",
      keyPoints: [
        "PRIMARY KEY = NOT NULL + UNIQUE, and each table can have only one",
        "Primary keys can be simple (single column) or composite (multiple columns)",
        "SERIAL or UUID are common primary key types",
        "FOREIGN KEY references the primary key of another table",
        "Foreign keys enforce referential integrity between tables",
        "ON DELETE CASCADE automatically deletes child rows when the parent is deleted",
        "ON DELETE SET NULL sets the foreign key to NULL when the parent is deleted",
        "ON DELETE RESTRICT prevents deleting a parent row that has child references",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Primary Key and Foreign Key =====

-- 1. Simple primary key
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(100)
);

-- 2. Table with a foreign key
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INTEGER REFERENCES departments(id)
);

-- 3. Foreign key with ON DELETE actions
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    lead_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE
);

-- 4. Composite primary key
CREATE TABLE enrollments (
    student_id INTEGER,
    course_id INTEGER,
    enrolled_at DATE DEFAULT CURRENT_DATE,
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id)
);

-- 5. Named foreign key constraint
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    assigned_to INTEGER,
    CONSTRAINT fk_assigned_employee
        FOREIGN KEY (assigned_to)
        REFERENCES employees(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- 6. Insert data respecting relationships
INSERT INTO departments (name, location) VALUES
    ('Engineering', 'Floor 3'),
    ('Marketing', 'Floor 2'),
    ('Sales', 'Floor 1');

INSERT INTO employees (name, email, department_id) VALUES
    ('Alice', 'alice@company.com', 1),
    ('Bob', 'bob@company.com', 2),
    ('Charlie', 'charlie@company.com', 1);

-- This would fail: department_id 99 does not exist
-- INSERT INTO employees (name, email, department_id)
-- VALUES ('Dave', 'dave@company.com', 99);

-- 7. Query with a JOIN using the relationship
SELECT e.name AS employee, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id;

-- 8. View foreign keys on a table
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table,
    ccu.column_name AS foreign_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_name = 'employees';
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between a primary key and a unique key?",
        difficulty: "Easy",
        hint: "A primary key is NOT NULL + UNIQUE and there can be only one per table. A unique key allows NULL values (multiple NULLs in PostgreSQL) and a table can have many unique constraints. The primary key is the main identifier for rows and is referenced by foreign keys.",
      },
      {
        question: "What are the different ON DELETE actions for foreign keys?",
        difficulty: "Medium",
        hint: "CASCADE deletes child rows when the parent is deleted. SET NULL sets the foreign key column to NULL. SET DEFAULT sets it to the column's default value. RESTRICT prevents the deletion if child rows exist. NO ACTION is similar to RESTRICT but the check is deferred to the end of the transaction.",
      },
      {
        question: "When would you use a composite primary key vs a surrogate key?",
        difficulty: "Hard",
        hint: "A composite primary key uses natural business columns (like student_id + course_id for enrollments) and is useful for junction/association tables. A surrogate key is an artificial auto-incrementing ID with no business meaning. Surrogate keys are simpler for foreign key references and JOINs. Use composite keys when the combination naturally identifies the row and the table represents a many-to-many relationship.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // LEVEL 2 — Basic Queries
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 11. SELECT Statement
  // ─────────────────────────────────────────────
  {
    id: "select-statement",
    title: "SELECT Statement",
    slug: "select-statement",
    icon: "Table",
    difficulty: "Beginner",
    description:
      "Learn how to retrieve data from tables using the SELECT statement — the most fundamental SQL command for querying databases.",
    concept: {
      explanation:
        "The SELECT statement is the cornerstone of SQL and is used to retrieve data from one or more tables. At its simplest, SELECT lets you specify which columns you want to see from a table. Using SELECT * retrieves all columns, while listing specific column names returns only those columns. The SELECT statement can also evaluate expressions, call functions, and perform calculations without even referencing a table. Every query you write in PostgreSQL starts with SELECT. The result of a SELECT statement is called a result set — a temporary table that holds the rows returned by your query. Understanding SELECT is essential because every other query concept (filtering, sorting, joining) builds on top of it.",
      realLifeAnalogy:
        "Think of SELECT as placing an order at a restaurant. The menu (table) has many dishes (columns) available. You don't have to order everything — you pick exactly what you want. Saying SELECT * is like saying 'give me one of everything', while SELECT name, price is like saying 'just tell me the dish names and prices'. The waiter (database engine) brings back exactly what you asked for, neatly arranged on your table (result set).",
      keyPoints: [
        "SELECT is used to retrieve data from database tables",
        "SELECT * returns all columns from a table",
        "You can select specific columns by listing their names",
        "SELECT can evaluate expressions like SELECT 2 + 3",
        "The result of a SELECT query is called a result set",
        "Column names in the result match the selected columns or expressions",
        "SELECT works with functions like NOW(), UPPER(), LENGTH()",
        "Always prefer selecting specific columns over SELECT * in production code",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== SELECT Statement =====

-- First, create a sample table with data
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(50),
  salary NUMERIC(10, 2),
  hire_date DATE
);

INSERT INTO employees (name, department, salary, hire_date) VALUES
  ('Alice Johnson', 'Engineering', 95000, '2021-03-15'),
  ('Bob Smith', 'Marketing', 72000, '2020-07-01'),
  ('Carol Williams', 'Engineering', 105000, '2019-11-20'),
  ('David Brown', 'Sales', 68000, '2022-01-10'),
  ('Eve Davis', 'Marketing', 78000, '2021-09-05'),
  ('Frank Miller', 'Engineering', 112000, '2018-06-12');

-- 1. Select ALL columns
SELECT * FROM employees;

-- 2. Select specific columns
SELECT name, department, salary FROM employees;

-- 3. Select with expressions
SELECT name, salary, salary * 12 AS annual_salary FROM employees;

-- 4. Select without a table (expressions only)
SELECT 'Hello, SQL!' AS greeting, 2 + 3 AS sum, NOW() AS current_time;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between SELECT * and selecting specific columns?",
        difficulty: "Easy",
        hint: "SELECT * retrieves all columns from a table, which is convenient for exploration but inefficient in production. Selecting specific columns reduces data transfer, improves performance, and makes code more maintainable. If columns are added later, SELECT * may return unexpected data.",
      },
      {
        question: "Can you use SELECT without a FROM clause? Give examples.",
        difficulty: "Medium",
        hint: "Yes, PostgreSQL allows SELECT without FROM for evaluating expressions: SELECT 1 + 1, SELECT NOW(), SELECT 'hello'. This is useful for testing functions, doing calculations, and checking system values. Other databases like Oracle require FROM DUAL for this.",
      },
      {
        question: "What is a result set and how does PostgreSQL process a SELECT query internally?",
        difficulty: "Hard",
        hint: "A result set is a virtual table returned by a query. Internally, PostgreSQL parses the SQL into a parse tree, rewrites it using rules, creates a query plan (using the optimizer), and then the executor retrieves rows. The planner decides whether to use sequential scan, index scan, etc. The result set exists in memory and is streamed to the client.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. WHERE Clause
  // ─────────────────────────────────────────────
  {
    id: "where-clause",
    title: "WHERE Clause",
    slug: "where-clause",
    icon: "Filter",
    difficulty: "Beginner",
    description:
      "Learn how to filter rows using the WHERE clause with comparison operators to retrieve only the data you need.",
    concept: {
      explanation:
        "The WHERE clause filters rows returned by a SELECT statement based on specified conditions. It acts as a gatekeeper — only rows that satisfy the condition pass through to the result set. You can use comparison operators like = (equal), != or <> (not equal), < (less than), > (greater than), <= (less than or equal), and >= (greater than or equal). WHERE can compare columns to literal values, other columns, or expressions. The condition is evaluated for each row in the table, and only rows where the condition evaluates to TRUE are included in the result. NULL comparisons require special handling with IS NULL or IS NOT NULL, because any comparison with NULL using = returns NULL (not TRUE or FALSE).",
      realLifeAnalogy:
        "Think of WHERE as a bouncer at a club. The bouncer checks each person (row) against the entry criteria (condition). 'Only people over 21' is like WHERE age > 21. The bouncer doesn't let everyone in — only those who meet the criteria. If someone doesn't have an ID (NULL), the bouncer can't verify them, which is why you need a special check (IS NULL) rather than comparing with =.",
      keyPoints: [
        "WHERE filters rows based on conditions after the FROM clause",
        "Comparison operators: =, !=, <>, <, >, <=, >=",
        "Text comparisons are case-sensitive by default in PostgreSQL",
        "Use IS NULL and IS NOT NULL for NULL checks (not = NULL)",
        "WHERE is evaluated before SELECT, so column aliases cannot be used in WHERE",
        "String values must be enclosed in single quotes",
        "Numeric comparisons work with integers, decimals, and dates",
        "WHERE can compare columns to other columns in the same row",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== WHERE Clause =====

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  price NUMERIC(10, 2),
  stock INT,
  discontinued BOOLEAN DEFAULT FALSE
);

INSERT INTO products (name, category, price, stock, discontinued) VALUES
  ('Laptop', 'Electronics', 999.99, 50, FALSE),
  ('Mouse', 'Electronics', 29.99, 200, FALSE),
  ('Desk Chair', 'Furniture', 349.00, 30, FALSE),
  ('Notebook', 'Stationery', 4.99, 500, FALSE),
  ('Monitor', 'Electronics', 449.99, 0, FALSE),
  ('Pen Pack', 'Stationery', 2.49, 1000, FALSE),
  ('Old Keyboard', 'Electronics', 19.99, 5, TRUE),
  ('Standing Desk', 'Furniture', 599.00, NULL, FALSE);

-- 1. Filter by exact match
SELECT * FROM products WHERE category = 'Electronics';

-- 2. Filter by numeric comparison
SELECT name, price FROM products WHERE price > 100;

-- 3. Filter for non-discontinued items
SELECT name, price FROM products WHERE discontinued = FALSE;

-- 4. Filter for NULL values (unknown stock)
SELECT name, stock FROM products WHERE stock IS NULL;

-- 5. Filter with not equal
SELECT name, category FROM products WHERE category != 'Stationery';

-- 6. Compare columns
SELECT name, price, stock FROM products WHERE stock > 0 AND price < 50;
`,
    },
    interviewQuestions: [
      {
        question: "Why can't you use = to compare with NULL? What should you use instead?",
        difficulty: "Easy",
        hint: "In SQL, NULL represents an unknown value. Any comparison with NULL using = returns NULL (not TRUE or FALSE), so WHERE column = NULL returns no rows. Use IS NULL or IS NOT NULL instead. This follows three-valued logic (TRUE, FALSE, NULL).",
      },
      {
        question: "In what order are SELECT and WHERE evaluated? Can you use a column alias in WHERE?",
        difficulty: "Medium",
        hint: "PostgreSQL evaluates FROM first, then WHERE, then SELECT. Since column aliases are defined in SELECT, they aren't available in WHERE. For example, SELECT price * 1.1 AS taxed_price WHERE taxed_price > 100 fails. You must repeat the expression: WHERE price * 1.1 > 100.",
      },
      {
        question: "How does PostgreSQL optimize WHERE clause evaluation for large tables?",
        difficulty: "Hard",
        hint: "PostgreSQL uses indexes (B-tree, Hash, GIN, GiST) to speed up WHERE lookups. The query planner estimates selectivity and cost to choose between sequential scan and index scan. For composite conditions, it can use bitmap index scans combining multiple indexes. The planner also uses statistics from ANALYZE to make decisions.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. ORDER BY
  // ─────────────────────────────────────────────
  {
    id: "order-by",
    title: "ORDER BY",
    slug: "order-by",
    icon: "ArrowUpDown",
    difficulty: "Beginner",
    description:
      "Learn how to sort query results in ascending or descending order using the ORDER BY clause.",
    concept: {
      explanation:
        "The ORDER BY clause sorts the result set of a query by one or more columns. By default, ORDER BY sorts in ascending order (ASC) — smallest to largest for numbers, A to Z for text, earliest to latest for dates. You can explicitly specify DESC for descending order. You can sort by multiple columns, where the second column breaks ties in the first. PostgreSQL also allows sorting by column position (ORDER BY 1, 2) or by expressions. NULL values are sorted last in ascending order and first in descending order by default, but you can control this with NULLS FIRST or NULLS LAST. Without ORDER BY, PostgreSQL does not guarantee any particular row order — rows may come back in insertion order, but this is not reliable.",
      realLifeAnalogy:
        "Think of ORDER BY as organising books on a shelf. You can arrange them alphabetically by title (ASC), from newest to oldest by publication year (DESC), or by author name and then by title within each author. If two books have the same author, the second sort criterion (title) determines their order — just like sorting by multiple columns in SQL.",
      keyPoints: [
        "ORDER BY sorts results — ASC (default) for ascending, DESC for descending",
        "You can sort by multiple columns separated by commas",
        "The second sort column breaks ties in the first",
        "You can sort by column position: ORDER BY 1, 2",
        "NULLs sort last in ASC, first in DESC by default",
        "Use NULLS FIRST or NULLS LAST to control NULL placement",
        "ORDER BY can use expressions and functions",
        "Without ORDER BY, row order is not guaranteed",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== ORDER BY =====

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  grade CHAR(1),
  score NUMERIC(5, 2),
  enrolled_date DATE
);

INSERT INTO students (name, grade, score, enrolled_date) VALUES
  ('Alice', 'A', 95.5, '2023-01-15'),
  ('Bob', 'B', 82.0, '2023-03-20'),
  ('Carol', 'A', 91.0, '2022-09-01'),
  ('David', 'C', 73.5, '2023-01-15'),
  ('Eve', 'B', 85.5, '2022-11-10'),
  ('Frank', 'A', 95.5, '2023-06-01'),
  ('Grace', 'B', NULL, '2023-02-14');

-- 1. Sort by score ascending (default)
SELECT name, score FROM students ORDER BY score;

-- 2. Sort by score descending (highest first)
SELECT name, score FROM students ORDER BY score DESC;

-- 3. Sort by multiple columns
SELECT name, grade, score FROM students ORDER BY grade ASC, score DESC;

-- 4. Handle NULLs explicitly
SELECT name, score FROM students ORDER BY score ASC NULLS LAST;
SELECT name, score FROM students ORDER BY score DESC NULLS LAST;

-- 5. Sort by expression
SELECT name, score, enrolled_date FROM students ORDER BY AGE(enrolled_date) DESC;

-- 6. Sort by column position
SELECT name, grade, score FROM students ORDER BY 2, 3 DESC;
`,
    },
    interviewQuestions: [
      {
        question: "What is the default sort order in ORDER BY, and how are NULLs handled?",
        difficulty: "Easy",
        hint: "The default sort order is ASC (ascending). NULLs are treated as the largest possible value in PostgreSQL — they appear last in ASC order and first in DESC order. You can override this with NULLS FIRST or NULLS LAST.",
      },
      {
        question: "Can you use column aliases defined in SELECT within ORDER BY?",
        difficulty: "Medium",
        hint: "Yes! Unlike WHERE, ORDER BY can use column aliases because ORDER BY is evaluated after SELECT. So SELECT salary * 12 AS annual ORDER BY annual works. You can also use column positions like ORDER BY 1.",
      },
      {
        question: "How does ORDER BY impact query performance, and when should you avoid it?",
        difficulty: "Hard",
        hint: "ORDER BY requires sorting, which is O(n log n) and may use disk-based sorting for large result sets (work_mem setting controls this). If an index matches the ORDER BY columns, PostgreSQL can avoid sorting entirely by reading the index in order. Avoid ORDER BY on large unindexed columns or when the result order doesn't matter. LIMIT + ORDER BY with an index is very efficient.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. LIMIT and OFFSET
  // ─────────────────────────────────────────────
  {
    id: "limit-and-offset",
    title: "LIMIT and OFFSET",
    slug: "limit-and-offset",
    icon: "ListFilter",
    difficulty: "Beginner",
    description:
      "Learn how to control the number of rows returned and implement pagination using LIMIT and OFFSET.",
    concept: {
      explanation:
        "LIMIT restricts the number of rows returned by a query, while OFFSET skips a specified number of rows before starting to return results. Together, they enable pagination — showing results in pages. LIMIT 10 returns at most 10 rows. OFFSET 20 skips the first 20 rows. LIMIT 10 OFFSET 20 returns rows 21–30, perfect for page 3 of a 10-rows-per-page display. LIMIT and OFFSET should always be used with ORDER BY to ensure consistent, predictable pagination. Without ORDER BY, the same LIMIT/OFFSET query might return different rows each time because PostgreSQL doesn't guarantee row order. For large datasets, OFFSET-based pagination can be slow because PostgreSQL must scan and discard all the skipped rows. Cursor-based (keyset) pagination is more efficient for deep pages.",
      realLifeAnalogy:
        "Think of LIMIT and OFFSET like reading search results on Google. Each page shows 10 results (LIMIT 10). Page 1 starts from the beginning, page 2 skips 10 results (OFFSET 10), page 3 skips 20 (OFFSET 20). You don't want to see all 1 million results at once — you want them in manageable chunks. But going to page 100,000 would be slow because Google still has to figure out what to skip.",
      keyPoints: [
        "LIMIT n returns at most n rows from the result set",
        "OFFSET n skips the first n rows before returning results",
        "Always use ORDER BY with LIMIT/OFFSET for consistent results",
        "Page formula: OFFSET = (page_number - 1) * page_size",
        "LIMIT without OFFSET returns the first n rows",
        "OFFSET without LIMIT skips rows but returns all remaining",
        "Large OFFSET values are slow — consider keyset pagination",
        "PostgreSQL also supports the SQL standard FETCH FIRST n ROWS ONLY",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== LIMIT and OFFSET =====

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  author VARCHAR(100),
  published_year INT,
  price NUMERIC(6, 2)
);

INSERT INTO books (title, author, published_year, price) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 12.99),
  ('To Kill a Mockingbird', 'Harper Lee', 1960, 14.99),
  ('1984', 'George Orwell', 1949, 11.99),
  ('Pride and Prejudice', 'Jane Austen', 1813, 9.99),
  ('The Catcher in the Rye', 'J.D. Salinger', 1951, 13.99),
  ('Brave New World', 'Aldous Huxley', 1932, 10.99),
  ('Animal Farm', 'George Orwell', 1945, 8.99),
  ('Lord of the Flies', 'William Golding', 1954, 11.49),
  ('The Hobbit', 'J.R.R. Tolkien', 1937, 15.99),
  ('Fahrenheit 451', 'Ray Bradbury', 1953, 10.49);

-- 1. Get only the first 3 books
SELECT title, author FROM books ORDER BY title LIMIT 3;

-- 2. Get top 3 most expensive books
SELECT title, price FROM books ORDER BY price DESC LIMIT 3;

-- 3. Pagination: Page 1 (first 3 results)
SELECT title, price FROM books ORDER BY title LIMIT 3 OFFSET 0;

-- 4. Pagination: Page 2 (next 3 results)
SELECT title, price FROM books ORDER BY title LIMIT 3 OFFSET 3;

-- 5. Pagination: Page 3 (next 3 results)
SELECT title, price FROM books ORDER BY title LIMIT 3 OFFSET 6;

-- 6. SQL standard syntax (alternative)
SELECT title, price FROM books ORDER BY title FETCH FIRST 3 ROWS ONLY;
`,
    },
    interviewQuestions: [
      {
        question: "Why should you always use ORDER BY with LIMIT and OFFSET?",
        difficulty: "Easy",
        hint: "Without ORDER BY, PostgreSQL doesn't guarantee row order. The same LIMIT/OFFSET query might return different rows each time, making pagination unreliable. ORDER BY ensures consistent, predictable results across pages.",
      },
      {
        question: "How would you implement pagination for page N with P items per page?",
        difficulty: "Medium",
        hint: "Use LIMIT P OFFSET (N - 1) * P. For example, page 3 with 10 items per page: LIMIT 10 OFFSET 20. Always include ORDER BY for consistency. Also consider returning total count with a separate COUNT(*) query for UI pagination controls.",
      },
      {
        question: "Why is OFFSET-based pagination slow for large offsets? What's the alternative?",
        difficulty: "Hard",
        hint: "OFFSET n forces PostgreSQL to fetch and discard n rows before returning results. OFFSET 1000000 scans 1 million rows just to skip them. Keyset (cursor) pagination is faster: use WHERE id > last_seen_id ORDER BY id LIMIT n. This uses an index seek instead of scanning. It's O(1) regardless of page depth, but doesn't support jumping to arbitrary pages.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. DISTINCT
  // ─────────────────────────────────────────────
  {
    id: "distinct",
    title: "DISTINCT",
    slug: "distinct",
    icon: "Fingerprint",
    difficulty: "Beginner",
    description:
      "Learn how to remove duplicate rows from query results using DISTINCT and DISTINCT ON.",
    concept: {
      explanation:
        "The DISTINCT keyword removes duplicate rows from the result set. When you use SELECT DISTINCT, PostgreSQL compares all selected columns and returns only unique combinations. If two rows have identical values in every selected column, only one is kept. PostgreSQL also offers DISTINCT ON (column), which is a powerful extension not available in most other databases. DISTINCT ON returns the first row for each unique value of the specified column(s), based on the ORDER BY clause. This is incredibly useful for getting the latest or earliest record per group without complex subqueries. Two NULL values are considered equal for DISTINCT purposes. DISTINCT applies to the entire row, not just the first column.",
      realLifeAnalogy:
        "Imagine you have a guest list with duplicate entries because people RSVP'd multiple times. DISTINCT is like going through the list and keeping only one entry per person. If your list has name and email, DISTINCT keeps unique name-email combinations — so 'Alice, alice@mail.com' and 'Alice, alice@work.com' are both kept because the combinations are different. DISTINCT ON is like keeping only the most recent RSVP for each person.",
      keyPoints: [
        "DISTINCT removes duplicate rows from the result set",
        "It compares ALL selected columns to determine uniqueness",
        "Two NULLs are considered equal for DISTINCT comparison",
        "DISTINCT ON (column) returns first row per unique value (PostgreSQL-specific)",
        "DISTINCT ON requires ORDER BY to start with the DISTINCT ON column(s)",
        "DISTINCT can be slow on large datasets as it requires sorting or hashing",
        "Use DISTINCT only when duplicates are actually possible",
        "COUNT(DISTINCT column) counts unique values in aggregation",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== DISTINCT =====

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer VARCHAR(100),
  product VARCHAR(100),
  amount NUMERIC(10, 2),
  order_date DATE
);

INSERT INTO orders (customer, product, amount, order_date) VALUES
  ('Alice', 'Laptop', 999.99, '2024-01-15'),
  ('Bob', 'Mouse', 29.99, '2024-01-16'),
  ('Alice', 'Mouse', 29.99, '2024-01-20'),
  ('Carol', 'Laptop', 999.99, '2024-02-01'),
  ('Bob', 'Keyboard', 79.99, '2024-02-10'),
  ('Alice', 'Monitor', 449.99, '2024-02-15'),
  ('Carol', 'Mouse', 29.99, '2024-03-01'),
  ('Bob', 'Mouse', 29.99, '2024-03-05');

-- 1. Get unique customers
SELECT DISTINCT customer FROM orders ORDER BY customer;

-- 2. Get unique products
SELECT DISTINCT product FROM orders ORDER BY product;

-- 3. Get unique customer-product combinations
SELECT DISTINCT customer, product FROM orders ORDER BY customer, product;

-- 4. DISTINCT ON: Get each customer's most recent order
SELECT DISTINCT ON (customer)
  customer, product, amount, order_date
FROM orders
ORDER BY customer, order_date DESC;

-- 5. Count unique customers
SELECT COUNT(DISTINCT customer) AS unique_customers FROM orders;

-- 6. Count unique products per customer
SELECT customer, COUNT(DISTINCT product) AS unique_products
FROM orders
GROUP BY customer
ORDER BY unique_products DESC;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between DISTINCT and DISTINCT ON in PostgreSQL?",
        difficulty: "Easy",
        hint: "DISTINCT removes rows where ALL selected columns are identical. DISTINCT ON (column) returns the first row for each unique value of the specified column, determined by ORDER BY. DISTINCT ON is PostgreSQL-specific and great for 'latest per group' queries.",
      },
      {
        question: "How does PostgreSQL handle NULLs with DISTINCT?",
        difficulty: "Medium",
        hint: "For DISTINCT purposes, two NULL values are considered equal. So if a column has multiple NULL entries, DISTINCT keeps only one NULL row. This differs from normal comparison where NULL = NULL returns NULL (not TRUE).",
      },
      {
        question: "When should you use DISTINCT vs GROUP BY for removing duplicates?",
        difficulty: "Hard",
        hint: "DISTINCT and GROUP BY can both remove duplicates, but they serve different purposes. Use DISTINCT for simple deduplication. Use GROUP BY when you need aggregations (COUNT, SUM, AVG). Performance is usually similar. GROUP BY is more explicit about intent. DISTINCT ON is unique to PostgreSQL and has no GROUP BY equivalent without window functions.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. Aliases
  // ─────────────────────────────────────────────
  {
    id: "aliases",
    title: "Aliases",
    slug: "aliases",
    icon: "Tag",
    difficulty: "Beginner",
    description:
      "Learn how to use AS to create aliases for columns and tables, making queries more readable and results more meaningful.",
    concept: {
      explanation:
        "Aliases provide temporary names for columns or tables in a query. Column aliases rename columns in the result set using the AS keyword (which is optional but recommended for clarity). They are especially useful for expressions, calculations, and function calls that would otherwise have auto-generated or unclear column names. Table aliases give shorter names to tables, which becomes essential when joining multiple tables or when a table name is long. Column aliases are defined in the SELECT clause and can be used in ORDER BY but NOT in WHERE, GROUP BY, or HAVING (because those are evaluated before SELECT). If an alias contains spaces or special characters, or conflicts with a reserved word, wrap it in double quotes. The AS keyword is optional — SELECT name n is the same as SELECT name AS n — but using AS improves readability.",
      realLifeAnalogy:
        "Aliases are like nicknames. Your legal name might be 'Robert' but everyone calls you 'Bob'. Similarly, a column formula like salary * 12 * (1 - tax_rate) is the formal name, but giving it the alias net_annual_pay makes it much easier for everyone to understand. Table aliases are like abbreviations — instead of writing 'Department of Motor Vehicles' every time, you write 'DMV'.",
      keyPoints: [
        "Column aliases rename columns in the output: SELECT name AS full_name",
        "The AS keyword is optional but recommended for clarity",
        "Aliases are required for expressions: SELECT price * 1.1 AS taxed_price",
        "Table aliases shorten table names: FROM employees AS e",
        "Column aliases work in ORDER BY but NOT in WHERE",
        "Use double quotes for aliases with spaces: AS \"Full Name\"",
        "Table aliases are essential when joining tables or self-joining",
        "Aliases do not rename actual columns — they only affect the query output",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Aliases =====

CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  department VARCHAR(50),
  hourly_rate NUMERIC(8, 2),
  hours_per_week INT
);

INSERT INTO staff (first_name, last_name, department, hourly_rate, hours_per_week) VALUES
  ('Alice', 'Johnson', 'Engineering', 55.00, 40),
  ('Bob', 'Smith', 'Marketing', 42.00, 38),
  ('Carol', 'Williams', 'Engineering', 62.00, 45),
  ('David', 'Brown', 'Sales', 38.00, 40),
  ('Eve', 'Davis', 'Marketing', 45.00, 35);

-- 1. Column alias for readability
SELECT first_name AS "First Name", last_name AS "Last Name" FROM staff;

-- 2. Alias for expressions
SELECT
  first_name || ' ' || last_name AS full_name,
  hourly_rate * hours_per_week AS weekly_pay,
  hourly_rate * hours_per_week * 52 AS annual_salary
FROM staff;

-- 3. Table alias (useful for long names or joins)
SELECT s.first_name, s.department, s.hourly_rate
FROM staff AS s
WHERE s.hourly_rate > 40;

-- 4. Using alias in ORDER BY
SELECT
  first_name || ' ' || last_name AS full_name,
  hourly_rate * hours_per_week * 52 AS annual_salary
FROM staff
ORDER BY annual_salary DESC;

-- 5. Alias without AS (works but less readable)
SELECT first_name name, department dept FROM staff;
`,
    },
    interviewQuestions: [
      {
        question: "Can you use a column alias in the WHERE clause? Why or why not?",
        difficulty: "Easy",
        hint: "No, you cannot use column aliases in WHERE because WHERE is evaluated before SELECT. The alias doesn't exist yet when WHERE runs. You must repeat the expression: WHERE hourly_rate * 40 > 2000 instead of WHERE weekly_pay > 2000.",
      },
      {
        question: "What is the difference between single quotes and double quotes in PostgreSQL?",
        difficulty: "Medium",
        hint: "Single quotes delimit string values: 'Hello'. Double quotes delimit identifiers (table/column names): \"My Column\". This is important for aliases with spaces or reserved words. SELECT name AS \"Order\" works but SELECT name AS Order fails because ORDER is a reserved word.",
      },
      {
        question: "When are table aliases absolutely necessary (not just convenient)?",
        difficulty: "Hard",
        hint: "Table aliases are required in self-joins (joining a table to itself) to distinguish the two instances: FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id. They're also needed in correlated subqueries where you reference the outer table. Without aliases, PostgreSQL can't tell which instance of the table you mean.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. AND, OR, NOT Operators
  // ─────────────────────────────────────────────
  {
    id: "and-or-not-operators",
    title: "AND, OR, NOT Operators",
    slug: "and-or-not-operators",
    icon: "GitBranch",
    difficulty: "Beginner",
    description:
      "Learn how to combine multiple conditions in WHERE clauses using logical operators AND, OR, and NOT.",
    concept: {
      explanation:
        "The logical operators AND, OR, and NOT allow you to combine multiple conditions in WHERE clauses. AND requires both conditions to be true — rows must satisfy every condition. OR requires at least one condition to be true — rows need to satisfy any one condition. NOT negates a condition — it returns rows where the condition is false. Operator precedence matters: NOT is evaluated first, then AND, then OR. This means WHERE a OR b AND c is interpreted as WHERE a OR (b AND c), not WHERE (a OR b) AND c. Always use parentheses to make your intent clear and avoid bugs. These operators follow three-valued logic with NULL: AND with NULL returns NULL unless the other operand is FALSE; OR with NULL returns NULL unless the other operand is TRUE; NOT NULL returns NULL.",
      realLifeAnalogy:
        "Think of shopping filters on an e-commerce site. AND is like checking multiple boxes: 'Color: Red AND Size: Large' — the item must match both. OR is like checking alternatives: 'Brand: Nike OR Brand: Adidas' — either brand is fine. NOT is like excluding: 'NOT Category: Shoes' — show everything except shoes. If you want 'Red Nike or any Adidas', you need parentheses: '(Color: Red AND Brand: Nike) OR Brand: Adidas'.",
      keyPoints: [
        "AND: Both conditions must be TRUE for the row to be included",
        "OR: At least one condition must be TRUE",
        "NOT: Negates the condition (TRUE becomes FALSE and vice versa)",
        "Precedence order: NOT > AND > OR",
        "Always use parentheses for complex conditions to avoid ambiguity",
        "NULL in logical operations: TRUE AND NULL = NULL, FALSE AND NULL = FALSE",
        "NOT NULL returns NULL, not TRUE",
        "You can combine any number of AND/OR/NOT operators",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== AND, OR, NOT Operators =====

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  product VARCHAR(100),
  category VARCHAR(50),
  price NUMERIC(10, 2),
  stock INT,
  is_active BOOLEAN
);

INSERT INTO inventory (product, category, price, stock, is_active) VALUES
  ('Laptop Pro', 'Electronics', 1299.99, 25, TRUE),
  ('Budget Laptop', 'Electronics', 499.99, 100, TRUE),
  ('Wireless Mouse', 'Electronics', 29.99, 200, TRUE),
  ('Office Desk', 'Furniture', 399.00, 15, TRUE),
  ('Gaming Chair', 'Furniture', 299.00, 0, TRUE),
  ('Notebook Set', 'Stationery', 12.99, 500, TRUE),
  ('Old Printer', 'Electronics', 89.99, 3, FALSE),
  ('Broken Monitor', 'Electronics', 199.99, 1, FALSE);

-- 1. AND: Electronics that cost more than $100
SELECT product, price FROM inventory
WHERE category = 'Electronics' AND price > 100;

-- 2. OR: Electronics or Furniture
SELECT product, category, price FROM inventory
WHERE category = 'Electronics' OR category = 'Furniture';

-- 3. NOT: Everything except Electronics
SELECT product, category FROM inventory
WHERE NOT category = 'Electronics';

-- 4. Combined: Active electronics under $500 OR any furniture
SELECT product, category, price, is_active FROM inventory
WHERE (category = 'Electronics' AND price < 500 AND is_active = TRUE)
   OR category = 'Furniture';

-- 5. NOT with AND: Active items that are NOT out of stock
SELECT product, stock, is_active FROM inventory
WHERE is_active = TRUE AND NOT stock = 0;

-- 6. Precedence demo: parentheses matter!
-- Without parentheses (AND binds tighter than OR)
SELECT product, category, price FROM inventory
WHERE category = 'Stationery' OR category = 'Electronics' AND price > 100;

-- With parentheses (explicit intent)
SELECT product, category, price FROM inventory
WHERE (category = 'Stationery' OR category = 'Electronics') AND price > 100;
`,
    },
    interviewQuestions: [
      {
        question: "What is the operator precedence for NOT, AND, and OR?",
        difficulty: "Easy",
        hint: "NOT has the highest precedence, then AND, then OR. So WHERE a OR b AND NOT c is evaluated as WHERE a OR (b AND (NOT c)). Always use parentheses for clarity.",
      },
      {
        question: "How do AND, OR, and NOT behave with NULL values?",
        difficulty: "Medium",
        hint: "SQL uses three-valued logic. TRUE AND NULL = NULL, FALSE AND NULL = FALSE. TRUE OR NULL = TRUE, FALSE OR NULL = NULL. NOT NULL = NULL. This means a row is only included when the WHERE condition evaluates to TRUE, not NULL.",
      },
      {
        question: "How can you rewrite complex OR conditions for better readability and performance?",
        difficulty: "Hard",
        hint: "Multiple OR conditions on the same column can be rewritten using IN: WHERE category = 'A' OR category = 'B' becomes WHERE category IN ('A', 'B'). For range conditions, use BETWEEN. PostgreSQL's optimizer may transform OR into UNION ALL internally. For columns with indexes, IN is often more efficient than OR.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. BETWEEN Operator
  // ─────────────────────────────────────────────
  {
    id: "between-operator",
    title: "BETWEEN Operator",
    slug: "between-operator",
    icon: "ArrowLeftRight",
    difficulty: "Beginner",
    description:
      "Learn how to filter rows within a range of values using the BETWEEN operator for numbers, dates, and text.",
    concept: {
      explanation:
        "The BETWEEN operator tests whether a value falls within an inclusive range. The syntax is column BETWEEN low AND high, which is equivalent to column >= low AND column <= high. It works with numbers, dates, timestamps, and even text (using alphabetical ordering). BETWEEN is inclusive on both ends — both the low and high values are included in the range. You can use NOT BETWEEN to exclude a range. For dates, be careful with timestamps: BETWEEN '2024-01-01' AND '2024-01-31' will NOT include events on January 31st that have a time component (like 2024-01-31 15:30:00) because '2024-01-31' is treated as '2024-01-31 00:00:00'. For inclusive date ranges with timestamps, use BETWEEN '2024-01-01' AND '2024-02-01' or use explicit >= and < comparisons.",
      realLifeAnalogy:
        "BETWEEN is like a price filter on a shopping website. When you set the slider to $50–$200, you see all products priced from $50 to $200, including products priced exactly at $50 and $200. It's a shorthand for saying 'show me everything from here to there'. NOT BETWEEN is like excluding a range — 'show me everything except the $50–$200 range'.",
      keyPoints: [
        "BETWEEN is inclusive: column BETWEEN 10 AND 20 includes 10 and 20",
        "Equivalent to: column >= low AND column <= high",
        "Works with numbers, dates, timestamps, and text",
        "NOT BETWEEN excludes the range",
        "The low value must come before the high value",
        "Be careful with timestamps — BETWEEN dates may miss time components",
        "For dates, consider using >= and < for precise ranges",
        "BETWEEN can use indexes for efficient range scans",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== BETWEEN Operator =====

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  product VARCHAR(100),
  amount NUMERIC(10, 2),
  quantity INT,
  sale_date DATE
);

INSERT INTO sales (product, amount, quantity, sale_date) VALUES
  ('Widget A', 25.00, 10, '2024-01-05'),
  ('Widget B', 75.50, 5, '2024-01-15'),
  ('Widget C', 150.00, 2, '2024-02-01'),
  ('Widget D', 200.00, 1, '2024-02-14'),
  ('Widget E', 49.99, 8, '2024-03-01'),
  ('Widget F', 99.99, 3, '2024-03-15'),
  ('Widget G', 500.00, 1, '2024-04-01'),
  ('Widget H', 15.00, 20, '2024-04-10');

-- 1. Numeric range: products between $50 and $200
SELECT product, amount FROM sales
WHERE amount BETWEEN 50 AND 200;

-- 2. Date range: sales in Q1 2024 (Jan-Mar)
SELECT product, amount, sale_date FROM sales
WHERE sale_date BETWEEN '2024-01-01' AND '2024-03-31';

-- 3. NOT BETWEEN: exclude mid-range prices
SELECT product, amount FROM sales
WHERE amount NOT BETWEEN 50 AND 200;

-- 4. Quantity range
SELECT product, quantity FROM sales
WHERE quantity BETWEEN 3 AND 10;

-- 5. Equivalent using >= and <= (same result)
SELECT product, amount FROM sales
WHERE amount >= 50 AND amount <= 200;

-- 6. Combining BETWEEN with other conditions
SELECT product, amount, sale_date FROM sales
WHERE amount BETWEEN 20 AND 100
  AND sale_date BETWEEN '2024-01-01' AND '2024-02-28';
`,
    },
    interviewQuestions: [
      {
        question: "Is BETWEEN inclusive or exclusive of the boundary values?",
        difficulty: "Easy",
        hint: "BETWEEN is inclusive on both ends. BETWEEN 10 AND 20 includes rows with values 10, 15, and 20. It's equivalent to >= 10 AND <= 20.",
      },
      {
        question: "What's the gotcha when using BETWEEN with dates that have timestamps?",
        difficulty: "Medium",
        hint: "BETWEEN '2024-01-01' AND '2024-01-31' treats the upper bound as '2024-01-31 00:00:00', missing any timestamps later on Jan 31st (e.g., '2024-01-31 15:30:00'). Use BETWEEN '2024-01-01' AND '2024-02-01' or WHERE date >= '2024-01-01' AND date < '2024-02-01' for inclusive date ranges.",
      },
      {
        question: "How does PostgreSQL optimize BETWEEN for indexed columns?",
        difficulty: "Hard",
        hint: "For B-tree indexed columns, BETWEEN translates to an index range scan — PostgreSQL seeks to the low value in the index and scans sequentially to the high value. This is O(log n + k) where k is the number of matching rows. The planner uses column statistics to estimate selectivity and decide whether an index scan is worthwhile vs a sequential scan.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 19. IN Operator
  // ─────────────────────────────────────────────
  {
    id: "in-operator",
    title: "IN Operator",
    slug: "in-operator",
    icon: "List",
    difficulty: "Beginner",
    description:
      "Learn how to filter rows that match any value in a list using the IN operator — a cleaner alternative to multiple OR conditions.",
    concept: {
      explanation:
        "The IN operator checks whether a value matches any value in a specified list. It is a shorthand for multiple OR conditions: WHERE category IN ('A', 'B', 'C') is equivalent to WHERE category = 'A' OR category = 'B' OR category = 'C'. The list can contain literals, expressions, or even the result of a subquery (which makes IN incredibly powerful). NOT IN returns rows where the value does not match any value in the list. Important caveat: if the list contains NULL, NOT IN may produce unexpected results because any comparison with NULL is NULL, and NULL is not TRUE, so NOT IN with NULL in the list returns no rows when NULL could match. For subqueries, consider using EXISTS instead of IN for better NULL handling and sometimes better performance.",
      realLifeAnalogy:
        "Think of IN like a VIP list at an event. The bouncer has a list of approved names. When you arrive, they check: 'Is your name IN the list?' If your name matches any name on the list, you're allowed in. NOT IN is like a blacklist — if your name is on it, you're turned away. But if someone's name is smudged (NULL) on the blacklist, the bouncer gets confused and might not let anyone through.",
      keyPoints: [
        "IN checks if a value matches any value in a list",
        "Equivalent to multiple OR conditions but more readable",
        "Works with numbers, strings, dates, and subqueries",
        "NOT IN excludes values in the list",
        "WARNING: NOT IN with NULL in the list returns no rows",
        "Subquery: WHERE id IN (SELECT id FROM other_table)",
        "PostgreSQL optimizes IN lists into hash lookups for large lists",
        "Use EXISTS instead of IN for subqueries with potential NULLs",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== IN Operator =====

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  genre VARCHAR(50),
  rating NUMERIC(3, 1),
  release_year INT,
  director VARCHAR(100)
);

INSERT INTO movies (title, genre, rating, release_year, director) VALUES
  ('The Matrix', 'Sci-Fi', 8.7, 1999, 'Wachowski Sisters'),
  ('Inception', 'Sci-Fi', 8.8, 2010, 'Christopher Nolan'),
  ('The Godfather', 'Crime', 9.2, 1972, 'Francis Ford Coppola'),
  ('Pulp Fiction', 'Crime', 8.9, 1994, 'Quentin Tarantino'),
  ('Toy Story', 'Animation', 8.3, 1995, 'John Lasseter'),
  ('Finding Nemo', 'Animation', 8.2, 2003, 'Andrew Stanton'),
  ('The Dark Knight', 'Action', 9.0, 2008, 'Christopher Nolan'),
  ('Interstellar', 'Sci-Fi', 8.6, 2014, 'Christopher Nolan'),
  ('Spirited Away', 'Animation', 8.6, 2001, 'Hayao Miyazaki'),
  ('Django Unchained', 'Western', 8.4, 2012, 'Quentin Tarantino');

-- 1. Basic IN: filter by multiple genres
SELECT title, genre FROM movies
WHERE genre IN ('Sci-Fi', 'Animation')
ORDER BY title;

-- 2. Numeric IN: specific years
SELECT title, release_year FROM movies
WHERE release_year IN (1999, 2008, 2010, 2014);

-- 3. NOT IN: exclude genres
SELECT title, genre FROM movies
WHERE genre NOT IN ('Crime', 'Western')
ORDER BY rating DESC;

-- 4. IN with director
SELECT title, director FROM movies
WHERE director IN ('Christopher Nolan', 'Quentin Tarantino')
ORDER BY release_year;

-- 5. IN with subquery: movies by directors who made Sci-Fi
SELECT title, genre, director FROM movies
WHERE director IN (
  SELECT DISTINCT director FROM movies WHERE genre = 'Sci-Fi'
)
ORDER BY title;

-- 6. Equivalent OR (same as #1 but less clean)
SELECT title, genre FROM movies
WHERE genre = 'Sci-Fi' OR genre = 'Animation'
ORDER BY title;
`,
    },
    interviewQuestions: [
      {
        question: "What is the IN operator equivalent to in terms of OR conditions?",
        difficulty: "Easy",
        hint: "WHERE col IN ('a', 'b', 'c') is equivalent to WHERE col = 'a' OR col = 'b' OR col = 'c'. IN is more readable and concise, especially with many values.",
      },
      {
        question: "What happens with NOT IN when the list contains NULL?",
        difficulty: "Medium",
        hint: "NOT IN with NULL in the list returns no rows. This is because NOT (value = NULL) evaluates to NOT NULL, which is NULL (not TRUE). So the condition is never TRUE. Use NOT EXISTS with a subquery or filter NULLs from the list to avoid this trap.",
      },
      {
        question: "How does IN with a subquery differ from EXISTS? When should you use each?",
        difficulty: "Hard",
        hint: "IN evaluates the subquery and checks membership in the result set. EXISTS checks if the subquery returns any rows. EXISTS is better for correlated subqueries and handles NULLs correctly. For large subquery results, EXISTS can short-circuit (stop after finding first match). IN materializes the entire subquery result. Modern PostgreSQL often optimizes them similarly, but EXISTS is generally preferred for correlated subqueries.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 20. LIKE Operator
  // ─────────────────────────────────────────────
  {
    id: "like-operator",
    title: "LIKE Operator",
    slug: "like-operator",
    icon: "Search",
    difficulty: "Beginner",
    description:
      "Learn how to perform pattern matching on text columns using LIKE, ILIKE, and wildcard characters.",
    concept: {
      explanation:
        "The LIKE operator performs pattern matching on text values using two wildcard characters: % (matches any sequence of zero or more characters) and _ (matches exactly one character). For example, 'A%' matches any string starting with A, '%son' matches any string ending with 'son', and '%data%' matches any string containing 'data'. The underscore _ is useful for fixed-position matching: 'A_B' matches 'AXB' but not 'AB' or 'AXXB'. LIKE is case-sensitive in PostgreSQL. For case-insensitive matching, use ILIKE (a PostgreSQL extension). NOT LIKE and NOT ILIKE exclude matching patterns. If you need to match a literal % or _, use the ESCAPE clause or backslash: LIKE '10%%' matches the string '10%'. For more complex pattern matching, PostgreSQL supports SIMILAR TO (SQL standard regex) and ~ (POSIX regex).",
      realLifeAnalogy:
        "LIKE is like using the search bar with wildcards. If you search for 'John*' in your contacts, you find 'John', 'Johnson', 'Johnny'. The * (like %) matches anything after 'John'. If you search for 'J_n', you find 'Jan', 'Jen', 'Jon' — the _ matches exactly one character. ILIKE is like searching with 'ignore case' turned on, so 'john*' also finds 'JOHN' and 'Johnson'.",
      keyPoints: [
        "% matches any sequence of zero or more characters",
        "_ matches exactly one single character",
        "LIKE is case-sensitive in PostgreSQL",
        "ILIKE is case-insensitive (PostgreSQL extension)",
        "NOT LIKE and NOT ILIKE exclude matching patterns",
        "Escape literal % or _ with the ESCAPE clause",
        "LIKE cannot use regular B-tree indexes efficiently (except prefix patterns)",
        "For prefix patterns ('abc%'), PostgreSQL can use indexes with text_pattern_ops",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== LIKE Operator =====

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150),
  phone VARCHAR(20),
  city VARCHAR(50)
);

INSERT INTO contacts (name, email, phone, city) VALUES
  ('Alice Johnson', 'alice@gmail.com', '555-0101', 'New York'),
  ('Bob Smith', 'bob.smith@yahoo.com', '555-0102', 'New Orleans'),
  ('Carol Anderson', 'carol@gmail.com', '555-0103', 'San Francisco'),
  ('David Johnson', 'david.j@outlook.com', '555-0104', 'New York'),
  ('Eve Williams', 'eve_w@gmail.com', '555-0105', 'San Diego'),
  ('Frank Lee', 'frank@company.com', '555-0106', 'Los Angeles'),
  ('Grace Chen', 'grace.chen@gmail.com', '555-0107', 'San Jose'),
  ('Henry O''Brien', 'henry@yahoo.com', '555-0108', 'Newark');

-- 1. Starts with: names starting with 'A'
SELECT name FROM contacts WHERE name LIKE 'A%';

-- 2. Ends with: names ending with 'son'
SELECT name FROM contacts WHERE name LIKE '%son';

-- 3. Contains: names containing 'an'
SELECT name FROM contacts WHERE name LIKE '%an%';

-- 4. Single character wildcard: cities starting with 'San '
SELECT name, city FROM contacts WHERE city LIKE 'San ________%';

-- 5. Case-insensitive with ILIKE
SELECT name, email FROM contacts WHERE email ILIKE '%GMAIL%';

-- 6. NOT LIKE: emails NOT from gmail
SELECT name, email FROM contacts WHERE email NOT LIKE '%gmail%';

-- 7. Cities starting with 'New'
SELECT DISTINCT city FROM contacts WHERE city LIKE 'New%';

-- 8. Combining LIKE with other conditions
SELECT name, email, city FROM contacts
WHERE (email LIKE '%gmail.com' OR email LIKE '%yahoo.com')
  AND city LIKE 'New%';
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between % and _ wildcards in LIKE?",
        difficulty: "Easy",
        hint: "% matches zero or more characters of any kind. _ matches exactly one character. So 'A%' matches 'A', 'AB', 'ABC', while 'A_' only matches 'AB', 'AC' (exactly two characters starting with A). '%on%' finds 'on' anywhere, '_on' finds 'Jon', 'Ron' etc.",
      },
      {
        question: "What is the difference between LIKE and ILIKE in PostgreSQL?",
        difficulty: "Medium",
        hint: "LIKE is case-sensitive: 'Hello' LIKE 'hello' is FALSE. ILIKE is case-insensitive (PostgreSQL extension): 'Hello' ILIKE 'hello' is TRUE. Standard SQL doesn't have ILIKE — you'd need LOWER(column) LIKE LOWER(pattern). ILIKE is more convenient but may be slower without a proper index.",
      },
      {
        question: "How can you make LIKE queries use indexes efficiently?",
        difficulty: "Hard",
        hint: "Only prefix patterns (LIKE 'abc%') can use B-tree indexes, and you need to create the index with text_pattern_ops or use a C locale. For suffix or infix patterns ('%abc' or '%abc%'), use a trigram index (pg_trgm extension) with GIN or GiST. CREATE INDEX idx ON table USING gin(column gin_trgm_ops) enables fast LIKE '%pattern%' searches. Full-text search (tsvector/tsquery) is better for word-level matching.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // LEVEL 3 — Data Manipulation
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 21. INSERT Statement
  // ─────────────────────────────────────────────
  {
    id: "insert-statement",
    title: "INSERT Statement",
    slug: "insert-statement",
    icon: "Plus",
    difficulty: "Beginner",
    description:
      "Learn how to add new rows to tables using the INSERT statement — the fundamental command for creating data in PostgreSQL.",
    concept: {
      explanation:
        "The INSERT statement adds new rows to a table. The basic syntax is INSERT INTO table_name (columns) VALUES (values). You must provide values that match the column data types and satisfy all constraints (NOT NULL, UNIQUE, CHECK, foreign keys). If you omit the column list, you must provide values for every column in the table's defined order — but explicitly listing columns is a best practice for clarity and forward compatibility. Columns with DEFAULT values or SERIAL types can be omitted, and PostgreSQL will fill them automatically. You can insert a single row or multiple rows in one statement by separating value lists with commas. INSERT can also use a SELECT subquery to insert rows from another table. PostgreSQL returns the number of inserted rows, or you can use RETURNING to get back the inserted data including auto-generated values.",
      realLifeAnalogy:
        "INSERT is like filling out a new row on a sign-up sheet. Each column on the sheet (Name, Email, Phone) needs the right type of information. If a column is marked 'required' (NOT NULL), you can't leave it blank. If there's an auto-incrementing number column (SERIAL), the system assigns the next number for you. You can sign up one person at a time, or register a whole group at once by listing all their details.",
      keyPoints: [
        "INSERT INTO adds new rows to a table",
        "Always list column names explicitly for clarity",
        "Values must match column data types and satisfy constraints",
        "SERIAL/IDENTITY columns auto-generate values if omitted",
        "DEFAULT keyword inserts the column's default value",
        "Multi-row INSERT: VALUES (row1), (row2), (row3) is more efficient",
        "INSERT ... SELECT copies rows from another table or query",
        "PostgreSQL validates all constraints before inserting",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== INSERT Statement =====

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  city VARCHAR(50) DEFAULT 'Unknown',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 1. Insert a single row (specifying columns)
INSERT INTO customers (name, email, city)
VALUES ('Alice Johnson', 'alice@example.com', 'New York');

-- 2. Insert with DEFAULT values (city and created_at auto-filled)
INSERT INTO customers (name, email)
VALUES ('Bob Smith', 'bob@example.com');

-- 3. Multi-row insert (efficient!)
INSERT INTO customers (name, email, city) VALUES
  ('Carol Williams', 'carol@example.com', 'Chicago'),
  ('David Brown', 'david@example.com', 'San Francisco'),
  ('Eve Davis', 'eve@example.com', 'Boston');

-- 4. Insert with explicit DEFAULT keyword
INSERT INTO customers (name, email, city)
VALUES ('Frank Miller', 'frank@example.com', DEFAULT);

-- 5. View all inserted data
SELECT * FROM customers ORDER BY id;

-- 6. Insert from a SELECT query
CREATE TABLE vip_customers (LIKE customers INCLUDING ALL);
INSERT INTO vip_customers
SELECT * FROM customers WHERE city = 'New York';
SELECT * FROM vip_customers;
`,
    },
    interviewQuestions: [
      {
        question: "What happens if you try to INSERT a row that violates a UNIQUE constraint?",
        difficulty: "Easy",
        hint: "PostgreSQL raises a unique_violation error and the entire INSERT fails — no row is added. The error message includes the constraint name and the duplicate value. You can handle this with ON CONFLICT (UPSERT) to update instead of failing.",
      },
      {
        question: "Why should you always list column names in INSERT statements?",
        difficulty: "Medium",
        hint: "Listing columns makes the query self-documenting and resilient to schema changes. Without column names, adding a new column to the table breaks all existing INSERT statements. It also prevents accidentally inserting values into the wrong columns if column order changes.",
      },
      {
        question: "What is the performance difference between single-row and multi-row INSERTs?",
        difficulty: "Hard",
        hint: "Multi-row INSERT is significantly faster because it reduces round-trips to the database, has lower per-statement overhead (parsing, planning, WAL writes), and can batch index updates. For bulk loading, COPY is even faster than multi-row INSERT as it bypasses the SQL parser entirely and uses a binary protocol.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 22. UPDATE Statement
  // ─────────────────────────────────────────────
  {
    id: "update-statement",
    title: "UPDATE Statement",
    slug: "update-statement",
    icon: "RefreshCw",
    difficulty: "Beginner",
    description:
      "Learn how to modify existing data in tables using the UPDATE statement with WHERE conditions for precise targeting.",
    concept: {
      explanation:
        "The UPDATE statement modifies existing rows in a table. The syntax is UPDATE table SET column = value WHERE condition. The WHERE clause is critical — without it, UPDATE modifies every row in the table. You can update multiple columns in a single statement by separating assignments with commas. Values can be literal values, expressions using other columns, subquery results, or DEFAULT. PostgreSQL evaluates all SET expressions using the original row values (not partially updated values), so SET a = b, b = a actually swaps the values correctly. UPDATE returns the count of affected rows. In PostgreSQL, UPDATE actually creates a new version of the row (due to MVCC) and marks the old version as dead — the old version is later cleaned up by VACUUM. UPDATE can also use FROM clauses to join with other tables.",
      realLifeAnalogy:
        "UPDATE is like using find-and-replace in a spreadsheet. You specify what to change (SET price = 29.99) and which rows to change (WHERE product = 'Widget'). Without specifying which rows, every single price in the spreadsheet gets changed to 29.99 — a very common and dangerous mistake! Always double-check your WHERE clause before running an UPDATE.",
      keyPoints: [
        "UPDATE modifies existing rows — always use WHERE to target specific rows",
        "Without WHERE, ALL rows in the table are updated",
        "Multiple columns: SET col1 = val1, col2 = val2",
        "SET expressions use original values, enabling value swaps",
        "UPDATE returns the count of rows affected",
        "UPDATE ... FROM allows joining with other tables",
        "Due to MVCC, UPDATE creates new row versions internally",
        "Always test with SELECT first: SELECT * FROM t WHERE condition",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== UPDATE Statement =====

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  price NUMERIC(10, 2),
  stock INT,
  last_updated TIMESTAMP DEFAULT NOW()
);

INSERT INTO products (name, category, price, stock) VALUES
  ('Laptop', 'Electronics', 999.99, 50),
  ('Mouse', 'Electronics', 29.99, 200),
  ('Desk Chair', 'Furniture', 349.00, 30),
  ('Notebook', 'Stationery', 4.99, 500),
  ('Monitor', 'Electronics', 449.99, 0);

-- 1. Update a single row
UPDATE products SET price = 899.99 WHERE name = 'Laptop';

-- 2. Update multiple columns
UPDATE products
SET price = 39.99, stock = stock - 10
WHERE name = 'Mouse';

-- 3. Update with an expression
UPDATE products SET price = price * 1.10 WHERE category = 'Electronics';

-- 4. Update using a CASE expression
UPDATE products SET stock = CASE
  WHEN stock = 0 THEN 25
  WHEN stock < 50 THEN stock + 50
  ELSE stock
END;

-- 5. See the results
SELECT * FROM products ORDER BY id;

-- 6. DANGEROUS: Update without WHERE (affects ALL rows)
-- UPDATE products SET category = 'General'; -- DON'T DO THIS!

-- TIP: Always test with SELECT first
SELECT * FROM products WHERE category = 'Electronics';
`,
    },
    interviewQuestions: [
      {
        question: "What happens if you run UPDATE without a WHERE clause?",
        difficulty: "Easy",
        hint: "Without WHERE, UPDATE modifies EVERY row in the table. This is almost always a mistake. Always test your WHERE condition with a SELECT first to verify which rows will be affected. In production, use transactions so you can ROLLBACK if needed.",
      },
      {
        question: "How does UPDATE work internally in PostgreSQL due to MVCC?",
        difficulty: "Medium",
        hint: "PostgreSQL doesn't update rows in place. Instead, it marks the old row version as dead and inserts a new row version with the updated values. The old version remains visible to concurrent transactions until they complete. VACUUM later reclaims the space from dead row versions. This is why UPDATE-heavy tables can bloat.",
      },
      {
        question: "How can you update rows in one table based on values from another table?",
        difficulty: "Hard",
        hint: "Use UPDATE ... FROM: UPDATE orders SET status = 'vip' FROM customers WHERE orders.customer_id = customers.id AND customers.tier = 'gold'. This is PostgreSQL's extension to SQL. Standard SQL uses UPDATE with a correlated subquery in SET: SET status = (SELECT ...). The FROM syntax is generally more readable and can be more efficient.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 23. DELETE Statement
  // ─────────────────────────────────────────────
  {
    id: "delete-statement",
    title: "DELETE Statement",
    slug: "delete-statement",
    icon: "Trash2",
    difficulty: "Beginner",
    description:
      "Learn how to remove rows from tables using DELETE with WHERE conditions, and understand the difference between DELETE and TRUNCATE.",
    concept: {
      explanation:
        "The DELETE statement removes rows from a table. The syntax is DELETE FROM table WHERE condition. Like UPDATE, the WHERE clause is essential — without it, DELETE removes all rows from the table. DELETE respects foreign key constraints: if another table references the row you're trying to delete, PostgreSQL will either raise an error (RESTRICT), cascade the deletion (CASCADE), or set the reference to NULL (SET NULL), depending on the foreign key definition. DELETE is a DML (Data Manipulation Language) command — it's logged in the transaction log (WAL) and can be rolled back inside a transaction. For removing all rows quickly, TRUNCATE is much faster because it doesn't scan rows individually, but TRUNCATE cannot be used with WHERE and may not fire row-level triggers. DELETE returns the count of deleted rows and supports RETURNING to retrieve the deleted data.",
      realLifeAnalogy:
        "DELETE is like erasing entries from a guest list one by one. You can erase specific people (WHERE name = 'Alice') or erase everyone (no WHERE). Before erasing, you check if anyone else depends on that entry — if Alice is listed as a team leader, her team members' records might need updating first. TRUNCATE is like shredding the entire guest list and starting fresh — much faster, but you can't be selective about it.",
      keyPoints: [
        "DELETE FROM removes rows matching the WHERE condition",
        "Without WHERE, ALL rows are deleted (use TRUNCATE instead for speed)",
        "DELETE respects foreign key constraints (RESTRICT, CASCADE, SET NULL)",
        "DELETE is transactional — it can be rolled back with ROLLBACK",
        "TRUNCATE is faster for removing all rows but can't use WHERE",
        "DELETE fires row-level triggers; TRUNCATE fires statement-level triggers",
        "RETURNING clause retrieves deleted data for confirmation or logging",
        "DELETE USING allows joining with other tables for conditional deletes",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== DELETE Statement =====

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  status VARCHAR(20) DEFAULT 'pending',
  priority INT DEFAULT 3,
  created_at DATE DEFAULT CURRENT_DATE
);

INSERT INTO tasks (title, status, priority) VALUES
  ('Design homepage', 'completed', 1),
  ('Write tests', 'in_progress', 2),
  ('Fix login bug', 'completed', 1),
  ('Update docs', 'pending', 3),
  ('Refactor API', 'pending', 2),
  ('Deploy v2', 'pending', 1),
  ('Archive old data', 'completed', 3);

-- 1. Delete a specific row
DELETE FROM tasks WHERE title = 'Archive old data';

-- 2. Delete rows matching a condition
DELETE FROM tasks WHERE status = 'completed';

-- 3. Check remaining rows
SELECT * FROM tasks ORDER BY priority;

-- 4. Delete with RETURNING (see what was deleted)
DELETE FROM tasks WHERE priority = 3 RETURNING *;

-- 5. Count remaining rows
SELECT COUNT(*) AS remaining FROM tasks;

-- 6. TRUNCATE vs DELETE (TRUNCATE is faster for all rows)
-- TRUNCATE TABLE tasks;  -- Removes ALL rows instantly
-- DELETE FROM tasks;     -- Removes ALL rows one by one (slower)
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between DELETE and TRUNCATE?",
        difficulty: "Easy",
        hint: "DELETE removes rows one by one, supports WHERE, fires row triggers, and is fully logged (slow but flexible). TRUNCATE removes all rows instantly by deallocating data pages, doesn't support WHERE, resets sequences (with RESTART IDENTITY), and is much faster. Both can be rolled back in a transaction in PostgreSQL.",
      },
      {
        question: "How do foreign key constraints affect DELETE operations?",
        difficulty: "Medium",
        hint: "If a row is referenced by a foreign key, the ON DELETE action determines behavior: RESTRICT/NO ACTION raises an error; CASCADE deletes the referencing rows too; SET NULL sets the FK column to NULL; SET DEFAULT sets it to the default value. Always check foreign key relationships before deleting parent rows.",
      },
      {
        question: "How can you safely delete large numbers of rows without locking the table?",
        difficulty: "Hard",
        hint: "Delete in batches using a loop: DELETE FROM table WHERE condition LIMIT 1000. This releases locks between batches, allowing concurrent access. You can also use CTEs: WITH to_delete AS (SELECT id FROM table WHERE condition LIMIT 1000) DELETE FROM table WHERE id IN (SELECT id FROM to_delete). Consider using pg_partman for time-based data where you can DROP old partitions instead of DELETE.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 24. RETURNING Clause
  // ─────────────────────────────────────────────
  {
    id: "returning-clause",
    title: "RETURNING Clause",
    slug: "returning-clause",
    icon: "CornerDownLeft",
    difficulty: "Intermediate",
    description:
      "Learn how to use PostgreSQL's RETURNING clause to get back inserted, updated, or deleted data in a single operation.",
    concept: {
      explanation:
        "The RETURNING clause is a powerful PostgreSQL extension that allows INSERT, UPDATE, and DELETE statements to return data from the affected rows. Instead of running a separate SELECT after your modification, RETURNING gives you the data in the same statement — this is both more efficient and avoids race conditions in concurrent environments. With INSERT, RETURNING is commonly used to get auto-generated values like SERIAL IDs, timestamps with DEFAULT NOW(), or computed columns. With UPDATE, it returns the new values after modification. With DELETE, it returns the rows that were just removed (useful for audit logs). You can return specific columns, all columns (*), or even expressions. RETURNING makes PostgreSQL particularly efficient for application development because it eliminates the common pattern of INSERT then SELECT to get the new row's ID.",
      realLifeAnalogy:
        "RETURNING is like getting a receipt immediately after a transaction. When you deposit money at a bank (INSERT), the teller gives you a receipt with the new balance and transaction ID. When you update your address (UPDATE), you get a confirmation with your new details. When you close an account (DELETE), you get a final statement of what was removed. Without RETURNING, you'd have to make a second trip (query) to get this information.",
      keyPoints: [
        "RETURNING works with INSERT, UPDATE, and DELETE",
        "Returns data from affected rows without a separate SELECT",
        "RETURNING * returns all columns of affected rows",
        "RETURNING specific_column returns only that column",
        "Commonly used with INSERT to get auto-generated IDs",
        "More efficient than INSERT + SELECT (single round-trip)",
        "Avoids race conditions in concurrent environments",
        "Can include expressions: RETURNING id, name, price * 1.1 AS taxed",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== RETURNING Clause =====

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  product VARCHAR(100),
  quantity INT,
  price NUMERIC(10, 2),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 1. INSERT with RETURNING (get auto-generated id and timestamp)
INSERT INTO orders (product, quantity, price)
VALUES ('Laptop', 2, 999.99)
RETURNING id, product, created_at;

-- 2. Multi-row INSERT with RETURNING
INSERT INTO orders (product, quantity, price) VALUES
  ('Mouse', 5, 29.99),
  ('Keyboard', 3, 79.99),
  ('Monitor', 1, 449.99)
RETURNING id, product, quantity * price AS total;

-- 3. UPDATE with RETURNING (see new values)
UPDATE orders SET status = 'shipped', price = price * 0.9
WHERE product = 'Laptop'
RETURNING id, product, price AS discounted_price, status;

-- 4. DELETE with RETURNING (see what was removed)
DELETE FROM orders WHERE quantity > 3
RETURNING *;

-- 5. Check remaining orders
SELECT * FROM orders ORDER BY id;
`,
    },
    interviewQuestions: [
      {
        question: "What is the RETURNING clause and which statements support it?",
        difficulty: "Easy",
        hint: "RETURNING is a PostgreSQL extension that returns data from rows affected by INSERT, UPDATE, or DELETE. It avoids the need for a separate SELECT query. RETURNING * returns all columns, or you can specify individual columns and expressions.",
      },
      {
        question: "Why is INSERT ... RETURNING preferred over INSERT + SELECT for getting auto-generated IDs?",
        difficulty: "Medium",
        hint: "INSERT ... RETURNING is atomic — it returns the ID in the same operation. With INSERT + SELECT, another concurrent INSERT could happen between the two statements, and using currval() or lastval() can return wrong values in certain edge cases. RETURNING is also faster (one round-trip vs two) and more readable.",
      },
      {
        question: "How can you use RETURNING with CTEs (WITH clauses) for complex operations?",
        difficulty: "Hard",
        hint: "You can capture RETURNING output in a CTE: WITH deleted AS (DELETE FROM old_orders WHERE date < '2023-01-01' RETURNING *) INSERT INTO archive_orders SELECT * FROM deleted. This moves rows from one table to another atomically. You can also chain multiple modifications: WITH updated AS (UPDATE ... RETURNING *) SELECT ... FROM updated.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 25. UPSERT (ON CONFLICT)
  // ─────────────────────────────────────────────
  {
    id: "upsert-on-conflict",
    title: "UPSERT (ON CONFLICT)",
    slug: "upsert-on-conflict",
    icon: "Merge",
    difficulty: "Intermediate",
    description:
      "Learn how to handle duplicate key conflicts with INSERT ... ON CONFLICT — PostgreSQL's UPSERT feature for insert-or-update operations.",
    concept: {
      explanation:
        "UPSERT (a portmanteau of UPDATE and INSERT) is implemented in PostgreSQL using INSERT ... ON CONFLICT. It attempts to insert a row, and if a conflict occurs (a unique constraint or primary key violation), it either updates the existing row (DO UPDATE) or silently skips the insert (DO NOTHING). The syntax is INSERT INTO table VALUES (...) ON CONFLICT (column) DO UPDATE SET column = EXCLUDED.value. The special EXCLUDED table refers to the row that was proposed for insertion but conflicted. ON CONFLICT requires specifying the conflict target — usually a unique column or constraint name. DO UPDATE can reference both the existing row (using the table name) and the proposed row (using EXCLUDED) to compute the new value. This is essential for idempotent operations — running the same UPSERT multiple times produces the same result. UPSERT is atomic, handling the check-and-insert/update in a single operation without race conditions.",
      realLifeAnalogy:
        "UPSERT is like updating a contacts app. When you add a new contact, the app checks if that phone number already exists. If it does, it updates the existing contact's information instead of creating a duplicate (DO UPDATE). Or it might silently ignore the duplicate and keep the existing entry (DO NOTHING). Without UPSERT, you'd have to manually search for duplicates first, which is slower and error-prone — someone else could add the same contact between your check and your insert.",
      keyPoints: [
        "ON CONFLICT handles unique constraint violations gracefully",
        "DO NOTHING silently skips conflicting rows",
        "DO UPDATE modifies the existing row when a conflict occurs",
        "EXCLUDED refers to the row that was proposed for insertion",
        "Conflict target: specify column(s) or constraint name",
        "UPSERT is atomic — no race conditions between check and insert",
        "Supports WHERE in DO UPDATE to conditionally update",
        "RETURNING works with UPSERT to return the final row state",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== UPSERT (ON CONFLICT) =====

CREATE TABLE user_settings (
  user_id INT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  theme VARCHAR(20) DEFAULT 'light',
  language VARCHAR(10) DEFAULT 'en',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 1. Insert initial data
INSERT INTO user_settings (user_id, username, theme, language) VALUES
  (1, 'alice', 'dark', 'en'),
  (2, 'bob', 'light', 'fr'),
  (3, 'carol', 'dark', 'es');

-- 2. UPSERT with DO NOTHING (skip duplicates)
INSERT INTO user_settings (user_id, username, theme)
VALUES (1, 'alice', 'blue')
ON CONFLICT (user_id) DO NOTHING;

-- 3. UPSERT with DO UPDATE (update on conflict)
INSERT INTO user_settings (user_id, username, theme, language)
VALUES (2, 'bob', 'dark', 'de')
ON CONFLICT (user_id)
DO UPDATE SET
  theme = EXCLUDED.theme,
  language = EXCLUDED.language,
  updated_at = NOW();

-- 4. UPSERT new + existing rows together
INSERT INTO user_settings (user_id, username, theme, language) VALUES
  (3, 'carol', 'light', 'en'),
  (4, 'david', 'dark', 'ja')
ON CONFLICT (user_id)
DO UPDATE SET theme = EXCLUDED.theme, language = EXCLUDED.language
RETURNING *;

-- 5. Conditional UPSERT (only update if new theme is different)
INSERT INTO user_settings (user_id, username, theme)
VALUES (1, 'alice', 'dark')
ON CONFLICT (user_id)
DO UPDATE SET theme = EXCLUDED.theme
WHERE user_settings.theme != EXCLUDED.theme
RETURNING *;

-- 6. View final state
SELECT * FROM user_settings ORDER BY user_id;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between ON CONFLICT DO NOTHING and DO UPDATE?",
        difficulty: "Easy",
        hint: "DO NOTHING silently discards the conflicting row — the existing row stays unchanged. DO UPDATE modifies the existing row with new values. Use DO NOTHING for 'insert if not exists' and DO UPDATE for 'insert or update' semantics.",
      },
      {
        question: "What is the EXCLUDED table in ON CONFLICT DO UPDATE?",
        difficulty: "Medium",
        hint: "EXCLUDED is a special table that contains the row values that were proposed for insertion but conflicted. In DO UPDATE SET theme = EXCLUDED.theme, EXCLUDED.theme refers to the value that was trying to be inserted. You can reference both the existing row (using the table name) and EXCLUDED to compute new values.",
      },
      {
        question: "How does UPSERT handle race conditions compared to a manual check-then-insert approach?",
        difficulty: "Hard",
        hint: "UPSERT is atomic — PostgreSQL handles the conflict detection and resolution in a single operation using row-level locking. A manual approach (SELECT to check, then INSERT or UPDATE) has a TOCTOU race condition: another transaction could insert the same key between your SELECT and INSERT. Even with serializable isolation, the manual approach can fail. UPSERT is the correct, performant solution.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 26. Bulk Inserts
  // ─────────────────────────────────────────────
  {
    id: "bulk-inserts",
    title: "Bulk Inserts",
    slug: "bulk-inserts",
    icon: "CopyPlus",
    difficulty: "Intermediate",
    description:
      "Learn efficient techniques for inserting large amounts of data including multi-row VALUES, INSERT ... SELECT, COPY, and performance optimization tips.",
    concept: {
      explanation:
        "Bulk inserting data efficiently is crucial for database performance. PostgreSQL offers several approaches, each with different performance characteristics. Multi-row INSERT (VALUES with multiple tuples) is the simplest improvement over single-row inserts — it reduces parsing overhead and network round-trips. INSERT ... SELECT copies data from one table or query into another, useful for data migration and transformation. The COPY command is the fastest method for loading data from files (CSV, TSV, binary) — it bypasses the SQL parser and uses a specialized binary protocol. For maximum bulk insert performance, consider: wrapping inserts in a single transaction (reduces WAL flushes), temporarily dropping indexes and recreating them after the load, disabling triggers during the load, increasing work_mem and maintenance_work_mem, and using UNLOGGED tables for intermediate staging data. The generate_series() function is incredibly useful for creating test data quickly.",
      realLifeAnalogy:
        "Think of bulk inserts like shipping packages. Sending one package at a time (single INSERT) is slow and expensive. Sending a batch on one truck (multi-row INSERT) is better. Loading an entire shipping container (COPY) is the most efficient. For a warehouse move (data migration), you'd remove the shelving first (drop indexes), move everything in, then reinstall the shelving (recreate indexes) — much faster than organizing each item as you place it.",
      keyPoints: [
        "Multi-row INSERT reduces round-trips: VALUES (r1), (r2), (r3)",
        "INSERT ... SELECT copies data from queries or other tables",
        "COPY is the fastest method for loading files (CSV, TSV)",
        "Wrap bulk operations in a single transaction for speed",
        "Drop indexes before bulk load, recreate after for faster loading",
        "generate_series() creates test data quickly",
        "UNLOGGED tables skip WAL for faster writes (not crash-safe)",
        "Consider partitioning for very large tables with bulk data",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Bulk Inserts =====

CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  sensor_name VARCHAR(50),
  value NUMERIC(10, 2),
  recorded_at TIMESTAMP
);

-- 1. Multi-row INSERT (fast for moderate amounts)
INSERT INTO metrics (sensor_name, value, recorded_at) VALUES
  ('temp_sensor_1', 22.5, '2024-01-01 08:00:00'),
  ('temp_sensor_1', 23.1, '2024-01-01 09:00:00'),
  ('temp_sensor_1', 24.0, '2024-01-01 10:00:00'),
  ('humidity_1', 45.2, '2024-01-01 08:00:00'),
  ('humidity_1', 44.8, '2024-01-01 09:00:00');

-- 2. Generate bulk test data with generate_series
INSERT INTO metrics (sensor_name, value, recorded_at)
SELECT
  'auto_sensor_' || (i % 5 + 1),
  ROUND((RANDOM() * 50 + 10)::numeric, 2),
  '2024-01-01'::timestamp + (i || ' hours')::interval
FROM generate_series(1, 100) AS s(i);

-- 3. Check how many rows we have now
SELECT COUNT(*) AS total_rows FROM metrics;

-- 4. INSERT ... SELECT (copy data between tables)
CREATE TABLE metrics_backup (LIKE metrics INCLUDING ALL);
INSERT INTO metrics_backup SELECT * FROM metrics WHERE sensor_name LIKE 'temp%';
SELECT COUNT(*) AS backup_rows FROM metrics_backup;

-- 5. Summary of data by sensor
SELECT
  sensor_name,
  COUNT(*) AS readings,
  ROUND(AVG(value), 2) AS avg_value,
  MIN(recorded_at) AS first_reading,
  MAX(recorded_at) AS last_reading
FROM metrics
GROUP BY sensor_name
ORDER BY sensor_name;
`,
    },
    interviewQuestions: [
      {
        question: "What are the different ways to bulk insert data in PostgreSQL?",
        difficulty: "Easy",
        hint: "Multi-row VALUES inserts multiple rows in one statement. INSERT ... SELECT copies from a query. COPY loads from files (CSV/TSV). For programmatic use, prepared statements with batching work well. COPY is the fastest for large datasets.",
      },
      {
        question: "How can you optimize bulk insert performance?",
        difficulty: "Medium",
        hint: "1) Use a single transaction, 2) Drop indexes before and recreate after, 3) Disable triggers temporarily, 4) Use COPY instead of INSERT, 5) Increase work_mem and maintenance_work_mem, 6) Use UNLOGGED tables for staging, 7) Disable fsync for initial loads (not in production), 8) Use multi-row VALUES instead of single-row INSERTs.",
      },
      {
        question: "What is the COPY command and when should you use it over INSERT?",
        difficulty: "Hard",
        hint: "COPY bypasses the SQL parser and uses a specialized binary protocol to stream data directly into table storage. It's 5-10x faster than multi-row INSERT for large datasets. COPY FROM loads files into tables; COPY TO exports tables to files. Use COPY for ETL pipelines, data migrations, and loading CSVs. It supports CSV, TSV, and binary formats. The psql copy variant works from the client side without server file access.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 27. Transactions Basics
  // ─────────────────────────────────────────────
  {
    id: "transactions-basics",
    title: "Transactions Basics",
    slug: "transactions-basics",
    icon: "Lock",
    difficulty: "Intermediate",
    description:
      "Learn the fundamentals of database transactions — how BEGIN, COMMIT, and ROLLBACK ensure data integrity with ACID properties.",
    concept: {
      explanation:
        "A transaction is a sequence of SQL operations that are treated as a single unit of work. Transactions guarantee the ACID properties: Atomicity (all operations succeed or all fail), Consistency (the database moves from one valid state to another), Isolation (concurrent transactions don't see each other's incomplete changes), and Durability (committed changes survive crashes). In PostgreSQL, every single SQL statement is implicitly wrapped in a transaction. Explicit transactions use BEGIN to start, COMMIT to save changes permanently, and ROLLBACK to undo all changes since BEGIN. If any statement within a transaction fails, PostgreSQL marks the transaction as aborted — no further statements can execute until you ROLLBACK. SAVEPOINTs allow you to create checkpoints within a transaction, so you can rollback to a specific point without losing all changes. PostgreSQL defaults to READ COMMITTED isolation level, where each statement sees only committed data.",
      realLifeAnalogy:
        "A transaction is like a bank transfer. When you move $500 from checking to savings, two things must happen: deduct from checking AND add to savings. If the system crashes after deducting but before adding, the money would vanish — that's why both operations are wrapped in a transaction. Either both succeed (COMMIT — money transferred) or both fail (ROLLBACK — nothing changes). A SAVEPOINT is like a checkpoint in a video game — if you die after the checkpoint, you restart from there, not from the very beginning.",
      keyPoints: [
        "BEGIN starts an explicit transaction",
        "COMMIT saves all changes permanently",
        "ROLLBACK undoes all changes since BEGIN",
        "Every SQL statement is implicitly a transaction if not in an explicit one",
        "ACID: Atomicity, Consistency, Isolation, Durability",
        "If any statement fails, the transaction is aborted until ROLLBACK",
        "SAVEPOINT creates a checkpoint within a transaction",
        "ROLLBACK TO SAVEPOINT undoes changes to that checkpoint",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Transactions Basics =====

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  owner VARCHAR(100) NOT NULL,
  balance NUMERIC(12, 2) NOT NULL CHECK (balance >= 0)
);

INSERT INTO accounts (owner, balance) VALUES
  ('Alice', 1000.00),
  ('Bob', 500.00),
  ('Carol', 2000.00);

-- 1. Successful transaction: Transfer $200 from Alice to Bob
BEGIN;
  UPDATE accounts SET balance = balance - 200 WHERE owner = 'Alice';
  UPDATE accounts SET balance = balance + 200 WHERE owner = 'Bob';
COMMIT;

SELECT * FROM accounts ORDER BY id;

-- 2. Failed transaction: Try to overdraw (CHECK constraint fails)
BEGIN;
  UPDATE accounts SET balance = balance - 5000 WHERE owner = 'Alice';
  -- This fails because balance would go below 0
ROLLBACK;

-- Alice's balance is unchanged
SELECT * FROM accounts WHERE owner = 'Alice';

-- 3. Transaction with SAVEPOINT
BEGIN;
  UPDATE accounts SET balance = balance + 100 WHERE owner = 'Carol';
  SAVEPOINT before_transfer;
  UPDATE accounts SET balance = balance - 300 WHERE owner = 'Bob';
  -- Oops, let's undo just the transfer to Bob
  ROLLBACK TO SAVEPOINT before_transfer;
  -- Carol still has her +100
COMMIT;

SELECT * FROM accounts ORDER BY id;
`,
    },
    interviewQuestions: [
      {
        question: "What does ACID stand for and why is it important?",
        difficulty: "Easy",
        hint: "Atomicity: all or nothing. Consistency: valid state to valid state. Isolation: concurrent transactions don't interfere. Durability: committed data survives crashes. ACID ensures data integrity even during failures and concurrent access.",
      },
      {
        question: "What happens when a statement fails inside a transaction in PostgreSQL?",
        difficulty: "Medium",
        hint: "PostgreSQL marks the entire transaction as aborted. Any subsequent statements return 'ERROR: current transaction is aborted, commands ignored until end of transaction block'. You must ROLLBACK before starting new work. This differs from some databases (like MySQL) that allow continuing after errors. Use SAVEPOINT to partially recover.",
      },
      {
        question: "What are the transaction isolation levels in PostgreSQL and how do they differ?",
        difficulty: "Hard",
        hint: "PostgreSQL supports READ COMMITTED (default), REPEATABLE READ, and SERIALIZABLE. READ COMMITTED: each statement sees data committed before it started. REPEATABLE READ: the entire transaction sees a snapshot from its start. SERIALIZABLE: full isolation — transactions behave as if they ran sequentially. Higher levels prevent more anomalies (dirty reads, non-repeatable reads, phantom reads) but have more overhead and potential for serialization failures.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 28. COMMIT and ROLLBACK
  // ─────────────────────────────────────────────
  {
    id: "commit-and-rollback",
    title: "COMMIT and ROLLBACK",
    slug: "commit-and-rollback",
    icon: "Undo2",
    difficulty: "Intermediate",
    description:
      "Deep dive into COMMIT and ROLLBACK — learn how to control transaction outcomes, use savepoints, and handle error recovery patterns.",
    concept: {
      explanation:
        "COMMIT and ROLLBACK are the two possible outcomes of a transaction. COMMIT makes all changes within the transaction permanent — once committed, the changes are durable and visible to other transactions. ROLLBACK discards all changes, restoring the database to the state before BEGIN was called. PostgreSQL also supports SAVEPOINT for creating intermediate checkpoints within a transaction. You can ROLLBACK TO SAVEPOINT to undo changes back to a specific point without losing earlier changes in the transaction. SAVEPOINTs can be nested and released (RELEASE SAVEPOINT removes the savepoint without rolling back). This is particularly useful in application code where you want to attempt an operation and gracefully handle failure without aborting the entire transaction. PostgreSQL also provides implicit ROLLBACK when a connection is closed with an uncommitted transaction, and supports the END keyword as a synonym for COMMIT.",
      realLifeAnalogy:
        "Think of COMMIT and ROLLBACK like editing a document with save and undo. COMMIT is like hitting 'Save' — your changes are permanent. ROLLBACK is like 'Undo All' — everything goes back to how it was. SAVEPOINTs are like creating named bookmarks as you edit: 'Let me try changing this section — if it doesn't work, I'll go back to the bookmark.' You can have multiple bookmarks (nested savepoints) and jump back to any of them. RELEASE SAVEPOINT is like removing a bookmark you no longer need.",
      keyPoints: [
        "COMMIT makes all transaction changes permanent and visible",
        "ROLLBACK discards all changes since BEGIN",
        "END is a synonym for COMMIT",
        "SAVEPOINT name creates a named checkpoint",
        "ROLLBACK TO SAVEPOINT name reverts to that checkpoint",
        "RELEASE SAVEPOINT removes a savepoint without rolling back",
        "SAVEPOINTs can be nested for complex error handling",
        "Uncommitted transactions are rolled back on connection close",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== COMMIT and ROLLBACK =====

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  item VARCHAR(100) NOT NULL,
  quantity INT NOT NULL CHECK (quantity >= 0),
  reserved INT DEFAULT 0 CHECK (reserved >= 0)
);

INSERT INTO inventory (item, quantity, reserved) VALUES
  ('Widget A', 100, 0),
  ('Widget B', 50, 0),
  ('Widget C', 75, 0);

-- 1. COMMIT: Successful reservation
BEGIN;
  UPDATE inventory SET reserved = reserved + 10 WHERE item = 'Widget A';
  UPDATE inventory SET quantity = quantity - 10 WHERE item = 'Widget A';
COMMIT;
SELECT * FROM inventory WHERE item = 'Widget A';

-- 2. ROLLBACK: Cancel a failed operation
BEGIN;
  UPDATE inventory SET reserved = reserved + 200 WHERE item = 'Widget B';
  -- Oops, we don't have 200 units! Let's undo.
ROLLBACK;
SELECT * FROM inventory WHERE item = 'Widget B';  -- Unchanged

-- 3. SAVEPOINT: Partial rollback
BEGIN;
  -- Step 1: Reserve Widget B (keep this)
  UPDATE inventory SET reserved = reserved + 5 WHERE item = 'Widget B';
  SAVEPOINT after_widget_b;

  -- Step 2: Try to reserve Widget C (might want to undo)
  UPDATE inventory SET reserved = reserved + 30 WHERE item = 'Widget C';

  -- Changed our mind about Widget C
  ROLLBACK TO SAVEPOINT after_widget_b;

  -- Step 3: Reserve a smaller amount of Widget C instead
  UPDATE inventory SET reserved = reserved + 10 WHERE item = 'Widget C';
COMMIT;

SELECT * FROM inventory ORDER BY id;

-- 4. Nested savepoints
BEGIN;
  SAVEPOINT sp1;
    UPDATE inventory SET quantity = quantity + 50 WHERE item = 'Widget A';
    SAVEPOINT sp2;
      UPDATE inventory SET quantity = quantity + 25 WHERE item = 'Widget B';
    ROLLBACK TO SAVEPOINT sp2;  -- Undo Widget B change only
  -- Widget A change is kept
COMMIT;

SELECT * FROM inventory ORDER BY id;
`,
    },
    interviewQuestions: [
      {
        question: "What happens to uncommitted changes if the database connection drops?",
        difficulty: "Easy",
        hint: "All uncommitted changes are automatically rolled back. PostgreSQL treats a lost connection as an implicit ROLLBACK. This ensures data integrity — partial changes never persist. This is why long-running transactions should be avoided in web applications where connections can timeout.",
      },
      {
        question: "How do SAVEPOINTs help in application error handling?",
        difficulty: "Medium",
        hint: "In PostgreSQL, a failed statement aborts the entire transaction. SAVEPOINTs let you catch errors gracefully: create a SAVEPOINT, try the operation, and if it fails, ROLLBACK TO SAVEPOINT to continue the transaction. This is essential for batch operations where some rows might fail (e.g., duplicate keys) but you want to process the rest.",
      },
      {
        question: "What is the difference between implicit and explicit transactions in PostgreSQL?",
        difficulty: "Hard",
        hint: "In implicit (autocommit) mode, each statement is automatically wrapped in BEGIN/COMMIT. If it succeeds, it's committed; if it fails, it's rolled back. In explicit mode (after BEGIN), multiple statements are grouped and only committed when you say COMMIT. PostgreSQL doesn't support the SET AUTOCOMMIT OFF syntax — use BEGIN for explicit transactions. Most client libraries (psycopg2, JDBC) manage this with autocommit settings.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // LEVEL 4 — Joins
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 29. Inner Join
  // ─────────────────────────────────────────────
  {
    id: "inner-join",
    title: "Inner Join",
    slug: "inner-join",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Learn how to combine rows from two tables based on matching values using INNER JOIN — the most common type of join.",
    concept: {
      explanation:
        "INNER JOIN returns only the rows where there is a match in both tables based on the join condition. If a row in the left table has no matching row in the right table, it is excluded from the result — and vice versa. The syntax is SELECT columns FROM table1 INNER JOIN table2 ON table1.column = table2.column. The ON clause specifies the join condition, which is typically an equality between a foreign key and a primary key. INNER JOIN is the default join type — writing just JOIN is equivalent to INNER JOIN. The result set contains only the intersection of the two tables (based on the join condition). If multiple rows in one table match a single row in the other, the result will contain multiple combined rows (a one-to-many relationship produces one row per match).",
      realLifeAnalogy:
        "Think of INNER JOIN like matching students to their enrolled courses. You have a student list and a course enrollment list. INNER JOIN shows only students who are enrolled in at least one course, paired with their courses. Students with no enrollments and courses with no students are left out — only successful matches appear. If a student is enrolled in 3 courses, they appear 3 times in the result, once for each course.",
      keyPoints: [
        "INNER JOIN returns only rows with matches in both tables",
        "Unmatched rows from either table are excluded",
        "JOIN without a type keyword defaults to INNER JOIN",
        "The ON clause specifies the matching condition",
        "Typically joins foreign key to primary key",
        "One-to-many relationships produce multiple result rows",
        "Use table aliases (a, b) for readability",
        "INNER JOIN is the most commonly used join type",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Inner Join =====

-- Create sample tables
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INT REFERENCES departments(id),
  salary NUMERIC(10, 2)
);

INSERT INTO departments (name, location) VALUES
  ('Engineering', 'Floor 3'),
  ('Marketing', 'Floor 2'),
  ('Sales', 'Floor 1'),
  ('Research', 'Floor 4');  -- No employees

INSERT INTO employees (name, department_id, salary) VALUES
  ('Alice', 1, 95000),
  ('Bob', 2, 72000),
  ('Carol', 1, 105000),
  ('David', 3, 68000),
  ('Eve', 2, 78000),
  ('Frank', NULL, 55000);  -- No department

-- 1. Basic INNER JOIN
SELECT e.name AS employee, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- 2. Notice: Frank (no dept) and Research (no employees) are excluded

-- 3. INNER JOIN with additional columns
SELECT e.name, e.salary, d.name AS department, d.location
FROM employees e
JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC;

-- 4. INNER JOIN with WHERE filter
SELECT e.name, e.salary, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.name = 'Engineering';

-- 5. Count employees per department (only departments with employees)
SELECT d.name AS department, COUNT(e.id) AS employee_count
FROM departments d
JOIN employees e ON d.id = e.department_id
GROUP BY d.name
ORDER BY employee_count DESC;
`,
    },
    interviewQuestions: [
      {
        question: "What rows does INNER JOIN exclude from the result?",
        difficulty: "Easy",
        hint: "INNER JOIN excludes rows from both tables that have no matching row in the other table. If an employee has no department (NULL foreign key) or a department has no employees, those rows won't appear in the result.",
      },
      {
        question: "What is the difference between JOIN and INNER JOIN?",
        difficulty: "Medium",
        hint: "There is no difference. JOIN without a type keyword defaults to INNER JOIN in SQL. Writing INNER JOIN is more explicit and self-documenting. Similarly, CROSS JOIN is the default for joins without an ON clause.",
      },
      {
        question: "How does PostgreSQL internally execute an INNER JOIN?",
        difficulty: "Hard",
        hint: "PostgreSQL's query planner chooses from three join strategies: Nested Loop (for small tables or indexed joins), Hash Join (builds a hash table from the smaller table, probes with the larger), and Merge Join (sorts both tables, then merges). The choice depends on table sizes, available indexes, and statistics. You can see the plan with EXPLAIN ANALYZE.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 30. Left Join
  // ─────────────────────────────────────────────
  {
    id: "left-join",
    title: "Left Join",
    slug: "left-join",
    icon: "MoveRight",
    difficulty: "Intermediate",
    description:
      "Learn how LEFT JOIN returns all rows from the left table, with matching rows from the right table or NULLs when no match exists.",
    concept: {
      explanation:
        "LEFT JOIN (or LEFT OUTER JOIN) returns all rows from the left table and the matching rows from the right table. If a row in the left table has no match in the right table, the result still includes that row but with NULL values for all columns from the right table. This makes LEFT JOIN essential for finding rows with and without relationships. The left table is the one mentioned before LEFT JOIN, and the right table comes after it. LEFT JOIN is commonly used to find 'orphan' records, include optional relationships, and check for missing data. A WHERE clause filtering on a right-table column (like WHERE right.id IS NULL) after a LEFT JOIN effectively finds rows in the left table that have no match — this is an anti-join pattern.",
      realLifeAnalogy:
        "LEFT JOIN is like taking attendance for a class trip. You have the full class roster (left table) and a list of who brought permission slips (right table). LEFT JOIN shows every student on the roster — those who brought slips show the slip details, and those who didn't show NULL. No student is left out of the report, but you can clearly see who's missing their slip.",
      keyPoints: [
        "Returns ALL rows from the left table, regardless of matches",
        "Matched rows include data from both tables",
        "Unmatched rows show NULL for right table columns",
        "LEFT JOIN and LEFT OUTER JOIN are identical",
        "WHERE right.column IS NULL finds unmatched rows (anti-join)",
        "The left table is always fully represented in the result",
        "Essential for optional relationships and finding missing data",
        "Order of tables matters: A LEFT JOIN B differs from B LEFT JOIN A",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Left Join =====

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(50)
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author_id INT REFERENCES authors(id),
  published_year INT
);

INSERT INTO authors (name, country) VALUES
  ('Jane Austen', 'England'),
  ('George Orwell', 'England'),
  ('Gabriel Marquez', 'Colombia'),
  ('Haruki Murakami', 'Japan');  -- No books in our table

INSERT INTO books (title, author_id, published_year) VALUES
  ('Pride and Prejudice', 1, 1813),
  ('Sense and Sensibility', 1, 1811),
  ('1984', 2, 1949),
  ('Animal Farm', 2, 1945),
  ('One Hundred Years', 3, 1967);

-- 1. LEFT JOIN: All authors, with their books (or NULL)
SELECT a.name AS author, b.title, b.published_year
FROM authors a
LEFT JOIN books b ON a.id = b.author_id
ORDER BY a.name, b.published_year;

-- 2. Notice: Murakami appears with NULLs (no books)

-- 3. Find authors with NO books (anti-join pattern)
SELECT a.name AS author_without_books
FROM authors a
LEFT JOIN books b ON a.id = b.author_id
WHERE b.id IS NULL;

-- 4. Count books per author (including zero counts)
SELECT a.name, COUNT(b.id) AS book_count
FROM authors a
LEFT JOIN books b ON a.id = b.author_id
GROUP BY a.name
ORDER BY book_count DESC;

-- 5. Compare with INNER JOIN (Murakami excluded)
SELECT a.name AS author, b.title
FROM authors a
INNER JOIN books b ON a.id = b.author_id
ORDER BY a.name;
`,
    },
    interviewQuestions: [
      {
        question: "How does LEFT JOIN differ from INNER JOIN?",
        difficulty: "Easy",
        hint: "INNER JOIN only returns rows with matches in both tables. LEFT JOIN returns ALL rows from the left table — matched rows include right table data, unmatched rows show NULL for right table columns. LEFT JOIN preserves the left table completely.",
      },
      {
        question: "How do you find rows in the left table that have NO match in the right table?",
        difficulty: "Medium",
        hint: "Use the anti-join pattern: LEFT JOIN + WHERE right.id IS NULL. Example: SELECT a.* FROM authors a LEFT JOIN books b ON a.id = b.author_id WHERE b.id IS NULL. This returns authors with no books. Always filter on the right table's primary key or a NOT NULL column.",
      },
      {
        question: "What is the performance difference between LEFT JOIN anti-join and NOT EXISTS?",
        difficulty: "Hard",
        hint: "Both achieve the same result. LEFT JOIN + IS NULL requires the join to complete before filtering. NOT EXISTS can short-circuit (stop checking after finding the first match). In PostgreSQL, the optimizer often generates the same plan for both. NOT IN has a caveat with NULLs. For large tables, NOT EXISTS or LEFT JOIN anti-join with proper indexes are typically fastest.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 31. Right Join
  // ─────────────────────────────────────────────
  {
    id: "right-join",
    title: "Right Join",
    slug: "right-join",
    icon: "SkipForward",
    difficulty: "Intermediate",
    description:
      "Learn how RIGHT JOIN returns all rows from the right table, with matching rows from the left table or NULLs when no match exists.",
    concept: {
      explanation:
        "RIGHT JOIN (or RIGHT OUTER JOIN) is the mirror image of LEFT JOIN. It returns all rows from the right table and matching rows from the left table. If a row in the right table has no match in the left table, the result includes that row with NULL values for all left table columns. In practice, RIGHT JOIN is rarely used because any RIGHT JOIN can be rewritten as a LEFT JOIN by simply swapping the table order. Most developers and style guides prefer LEFT JOIN for consistency and readability. However, RIGHT JOIN can be useful in certain complex queries where swapping table order would reduce clarity or when joining multiple tables where the 'important' table is naturally on the right side. Understanding RIGHT JOIN is still important for reading existing code and for interview questions.",
      realLifeAnalogy:
        "If LEFT JOIN is like checking which students have permission slips, RIGHT JOIN is like checking which permission slips have valid students. You start from the slips (right table) and match them to students (left table). Every slip appears in the result — matched slips show the student info, and slips without a matching student show NULL. It's the same concept, just looking from the other direction.",
      keyPoints: [
        "Returns ALL rows from the right table, regardless of matches",
        "Unmatched rows show NULL for left table columns",
        "RIGHT JOIN and RIGHT OUTER JOIN are identical",
        "Any RIGHT JOIN can be rewritten as LEFT JOIN by swapping tables",
        "LEFT JOIN is preferred in practice for consistency",
        "RIGHT JOIN is rarely used but important to understand",
        "Useful when the 'main' table is naturally on the right side",
        "Functionally equivalent: A RIGHT JOIN B = B LEFT JOIN A",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Right Join =====

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id INT REFERENCES categories(id),
  price NUMERIC(10, 2)
);

INSERT INTO categories (name) VALUES
  ('Electronics'),
  ('Clothing'),
  ('Books'),
  ('Sports');  -- No products

INSERT INTO products (name, category_id, price) VALUES
  ('Laptop', 1, 999.99),
  ('T-Shirt', 2, 29.99),
  ('Novel', 3, 14.99),
  ('Headphones', 1, 79.99),
  ('Jeans', 2, 59.99);

-- 1. RIGHT JOIN: All categories, with their products
SELECT p.name AS product, c.name AS category, p.price
FROM products p
RIGHT JOIN categories c ON p.category_id = c.id
ORDER BY c.name, p.name;

-- 2. Notice: Sports appears with NULLs (no products)

-- 3. Equivalent LEFT JOIN (same result, preferred style)
SELECT p.name AS product, c.name AS category, p.price
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
ORDER BY c.name, p.name;

-- 4. Find categories with NO products
SELECT c.name AS empty_category
FROM products p
RIGHT JOIN categories c ON p.category_id = c.id
WHERE p.id IS NULL;

-- 5. Count products per category (including empty)
SELECT c.name AS category, COUNT(p.id) AS product_count
FROM products p
RIGHT JOIN categories c ON p.category_id = c.id
GROUP BY c.name
ORDER BY product_count DESC;
`,
    },
    interviewQuestions: [
      {
        question: "Can every RIGHT JOIN be rewritten as a LEFT JOIN?",
        difficulty: "Easy",
        hint: "Yes. A RIGHT JOIN B ON condition is identical to B LEFT JOIN A ON condition. Just swap the table order and change RIGHT to LEFT. Most developers prefer LEFT JOIN for consistency.",
      },
      {
        question: "Why is RIGHT JOIN rarely used in practice?",
        difficulty: "Medium",
        hint: "RIGHT JOIN can always be rewritten as LEFT JOIN by swapping table order. LEFT JOIN is more intuitive (start with the 'main' table), more widely understood, and consistent with most coding standards. Using a mix of LEFT and RIGHT JOINs in the same query makes it harder to read.",
      },
      {
        question: "In what scenario might RIGHT JOIN actually be more readable than LEFT JOIN?",
        difficulty: "Hard",
        hint: "When chaining multiple JOINs where the 'complete' table is on the right and earlier JOINs build up context. For example: SELECT ... FROM order_items JOIN products ON ... RIGHT JOIN categories ON ... — here we want all categories even if they have no products. Rewriting would require restructuring the entire FROM clause. However, most experienced developers would restructure the query to use LEFT JOIN.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 32. Full Join
  // ─────────────────────────────────────────────
  {
    id: "full-join",
    title: "Full Join",
    slug: "full-join",
    icon: "Maximize",
    difficulty: "Intermediate",
    description:
      "Learn how FULL OUTER JOIN returns all rows from both tables, including unmatched rows from either side with NULLs.",
    concept: {
      explanation:
        "FULL JOIN (or FULL OUTER JOIN) combines the behavior of both LEFT JOIN and RIGHT JOIN. It returns all rows from both tables. Matched rows appear with data from both tables. Unmatched rows from the left table appear with NULLs for right table columns, and unmatched rows from the right table appear with NULLs for left table columns. FULL JOIN is useful for data reconciliation — comparing two datasets to find matches, left-only records, and right-only records. It's commonly used in reporting, data migration, and audit scenarios. FULL JOIN is less common than INNER or LEFT JOIN in everyday queries but is invaluable for data comparison tasks. You can use WHERE conditions to isolate specific cases: WHERE right.id IS NULL (left-only), WHERE left.id IS NULL (right-only), or WHERE both are NOT NULL (matched).",
      realLifeAnalogy:
        "FULL JOIN is like merging two guest lists for a party. List A has people invited by the host, List B has people invited by the co-host. FULL JOIN shows everyone: people on both lists (mutual invites), people only on List A, and people only on List B. No one is left out from either list. It gives you the complete picture of who's been invited by whom.",
      keyPoints: [
        "Returns ALL rows from both tables",
        "Matched rows show data from both tables",
        "Left-only rows show NULLs for right table columns",
        "Right-only rows show NULLs for left table columns",
        "FULL JOIN and FULL OUTER JOIN are identical",
        "Combines LEFT JOIN + RIGHT JOIN behavior",
        "Useful for data reconciliation and comparison",
        "Filter with WHERE to isolate matched, left-only, or right-only rows",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Full Join =====

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  major VARCHAR(50)
);

CREATE TABLE internships (
  id SERIAL PRIMARY KEY,
  company VARCHAR(100) NOT NULL,
  student_id INT REFERENCES students(id),
  role VARCHAR(50)
);

INSERT INTO students (name, major) VALUES
  ('Alice', 'Computer Science'),
  ('Bob', 'Mathematics'),
  ('Carol', 'Physics'),
  ('David', 'Chemistry');  -- No internship

INSERT INTO internships (company, student_id, role) VALUES
  ('Google', 1, 'SWE Intern'),
  ('Meta', 2, 'Data Intern'),
  ('Apple', 1, 'iOS Intern'),
  ('Netflix', NULL, 'Open Position');  -- No student assigned

-- 1. FULL JOIN: All students and all internships
SELECT s.name AS student, s.major, i.company, i.role
FROM students s
FULL JOIN internships i ON s.id = i.student_id
ORDER BY s.name NULLS LAST;

-- 2. Find students WITHOUT internships
SELECT s.name AS no_internship
FROM students s
FULL JOIN internships i ON s.id = i.student_id
WHERE i.id IS NULL;

-- 3. Find internships WITHOUT assigned students
SELECT i.company, i.role AS unassigned_position
FROM students s
FULL JOIN internships i ON s.id = i.student_id
WHERE s.id IS NULL;

-- 4. Find only matched records (same as INNER JOIN)
SELECT s.name, i.company
FROM students s
FULL JOIN internships i ON s.id = i.student_id
WHERE s.id IS NOT NULL AND i.id IS NOT NULL;

-- 5. Reconciliation summary
SELECT
  COUNT(*) AS total_rows,
  COUNT(s.id) AS students_matched,
  COUNT(i.id) AS internships_matched,
  COUNT(*) FILTER (WHERE i.id IS NULL) AS students_no_intern,
  COUNT(*) FILTER (WHERE s.id IS NULL) AS interns_no_student
FROM students s
FULL JOIN internships i ON s.id = i.student_id;
`,
    },
    interviewQuestions: [
      {
        question: "How does FULL JOIN differ from LEFT JOIN and RIGHT JOIN?",
        difficulty: "Easy",
        hint: "LEFT JOIN keeps all left rows. RIGHT JOIN keeps all right rows. FULL JOIN keeps all rows from both tables. It's the union of LEFT and RIGHT JOIN results — no row from either table is ever excluded.",
      },
      {
        question: "How can you use FULL JOIN to find unmatched records from both sides?",
        difficulty: "Medium",
        hint: "Use WHERE to filter: WHERE right.id IS NULL finds left-only rows. WHERE left.id IS NULL finds right-only rows. WHERE left.id IS NULL OR right.id IS NULL finds all unmatched rows from both sides. This is the standard data reconciliation pattern.",
      },
      {
        question: "How does PostgreSQL execute a FULL JOIN internally?",
        difficulty: "Hard",
        hint: "PostgreSQL uses a Hash Full Join or Merge Full Join. It can't use Nested Loop for FULL JOIN because it needs to track unmatched rows from both sides. Hash Full Join builds a hash table from one input and probes with the other, marking matched rows. After probing, it emits unmatched rows from the hash table. Merge Full Join sorts both inputs and merges them, emitting unmatched rows from both sides.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 33. Self Join
  // ─────────────────────────────────────────────
  {
    id: "self-join",
    title: "Self Join",
    slug: "self-join",
    icon: "RotateCw",
    difficulty: "Intermediate",
    description:
      "Learn how to join a table with itself using self joins — essential for hierarchical data, comparisons within the same table, and graph-like relationships.",
    concept: {
      explanation:
        "A self join is when a table is joined with itself. This requires table aliases to distinguish between the two instances of the same table. Self joins are essential for hierarchical data (like employees and their managers, where both are in the same table), comparing rows within the same table (finding employees with the same salary), and representing graph-like relationships. The join can be INNER, LEFT, or any other type. The key is that both sides of the join reference the same physical table but are treated as separate logical tables through aliases. Self joins are common in org charts (employee-manager), bill of materials (part-subpart), social networks (user-friend), and category trees (parent-child categories).",
      realLifeAnalogy:
        "A self join is like looking at a company directory to find who reports to whom. The directory (table) has both employees and managers — but managers are also employees in the same directory. To find each employee's manager, you look up the employee's row, find their manager_id, then look up that ID in the same directory. You're using the same list twice: once for employees, once for managers.",
      keyPoints: [
        "A self join joins a table with itself",
        "Table aliases are REQUIRED to distinguish the two instances",
        "Used for hierarchical data (employee → manager)",
        "Used for comparing rows within the same table",
        "Can use INNER JOIN, LEFT JOIN, or any join type",
        "Common patterns: org charts, category trees, social graphs",
        "LEFT SELF JOIN includes rows without matches (e.g., top-level manager)",
        "Multiple self joins can traverse multiple hierarchy levels",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Self Join =====

CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50),
  manager_id INT REFERENCES staff(id),
  salary NUMERIC(10, 2)
);

INSERT INTO staff (name, role, manager_id, salary) VALUES
  ('Alice', 'CEO', NULL, 150000),
  ('Bob', 'VP Engineering', 1, 120000),
  ('Carol', 'VP Marketing', 1, 115000),
  ('David', 'Senior Dev', 2, 95000),
  ('Eve', 'Junior Dev', 2, 70000),
  ('Frank', 'Designer', 3, 75000),
  ('Grace', 'Intern', 4, 40000);

-- 1. Self Join: Find each employee's manager
SELECT
  e.name AS employee,
  e.role,
  m.name AS manager
FROM staff e
INNER JOIN staff m ON e.manager_id = m.id
ORDER BY e.id;

-- 2. LEFT JOIN: Include CEO (no manager)
SELECT
  e.name AS employee,
  e.role,
  COALESCE(m.name, '(No Manager)') AS manager
FROM staff e
LEFT JOIN staff m ON e.manager_id = m.id
ORDER BY e.id;

-- 3. Find employees who earn more than their manager
SELECT
  e.name AS employee,
  e.salary AS emp_salary,
  m.name AS manager,
  m.salary AS mgr_salary
FROM staff e
JOIN staff m ON e.manager_id = m.id
WHERE e.salary > m.salary;

-- 4. Find peers (employees with the same manager)
SELECT
  a.name AS employee_1,
  b.name AS employee_2,
  m.name AS shared_manager
FROM staff a
JOIN staff b ON a.manager_id = b.manager_id AND a.id < b.id
JOIN staff m ON a.manager_id = m.id;

-- 5. Two-level hierarchy (employee → manager → grand-manager)
SELECT
  e.name AS employee,
  m.name AS manager,
  gm.name AS grand_manager
FROM staff e
LEFT JOIN staff m ON e.manager_id = m.id
LEFT JOIN staff gm ON m.manager_id = gm.id
ORDER BY e.id;
`,
    },
    interviewQuestions: [
      {
        question: "Why are table aliases required in a self join?",
        difficulty: "Easy",
        hint: "Without aliases, PostgreSQL can't tell which instance of the table you're referring to. Aliases create two logical references to the same physical table. Example: FROM staff e JOIN staff m — 'e' is the employee instance, 'm' is the manager instance.",
      },
      {
        question: "How would you avoid duplicate pairs when comparing rows in a self join?",
        difficulty: "Medium",
        hint: "Use a.id < b.id in the join condition. This ensures each pair appears only once (Alice-Bob, not also Bob-Alice) and prevents self-matches (Alice-Alice). Without this, you'd get duplicate pairs and self-comparisons.",
      },
      {
        question: "How would you query an entire hierarchy tree of unknown depth using self joins vs recursive CTEs?",
        difficulty: "Hard",
        hint: "Self joins can only traverse a fixed number of levels (one join per level). For unknown depth, use a recursive CTE: WITH RECURSIVE tree AS (SELECT * FROM staff WHERE manager_id IS NULL UNION ALL SELECT s.* FROM staff s JOIN tree t ON s.manager_id = t.id). Recursive CTEs handle any depth and are the standard approach for hierarchical queries in PostgreSQL.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 34. Cross Join
  // ─────────────────────────────────────────────
  {
    id: "cross-join",
    title: "Cross Join",
    slug: "cross-join",
    icon: "Grid3X3",
    difficulty: "Intermediate",
    description:
      "Learn how CROSS JOIN produces the Cartesian product of two tables — every possible combination of rows from both tables.",
    concept: {
      explanation:
        "CROSS JOIN produces the Cartesian product of two tables — every row from the left table is combined with every row from the right table. If table A has 5 rows and table B has 4 rows, CROSS JOIN produces 5 × 4 = 20 rows. No ON clause is used because there's no matching condition — every combination is included. CROSS JOIN is useful for generating all possible combinations (like sizes × colors for a product catalog), creating date grids (all dates × all categories), and testing scenarios. Be cautious with large tables — CROSS JOIN can produce enormous result sets (1000 × 1000 = 1 million rows). An implicit cross join uses comma syntax: FROM table_a, table_b, which is equivalent to FROM table_a CROSS JOIN table_b. Adding a WHERE clause to a cross join effectively turns it into an inner join.",
      realLifeAnalogy:
        "CROSS JOIN is like a round-robin tournament bracket. If you have teams A, B, C and venues 1, 2, you need every combination: A-1, A-2, B-1, B-2, C-1, C-2. CROSS JOIN generates all possible matchups automatically. Another example: a restaurant menu with 3 main courses and 4 desserts — CROSS JOIN creates all 12 possible meal combinations.",
      keyPoints: [
        "Produces the Cartesian product: every row × every row",
        "No ON clause — all combinations are generated",
        "Result size = rows in table A × rows in table B",
        "Careful with large tables — result can be enormous",
        "FROM a, b is implicit CROSS JOIN (comma syntax)",
        "CROSS JOIN + WHERE is equivalent to INNER JOIN",
        "Useful for generating combinations, grids, and test data",
        "Rarely used with large tables due to explosive result size",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Cross Join =====

CREATE TABLE sizes (
  id SERIAL PRIMARY KEY,
  label VARCHAR(10)
);

CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20)
);

INSERT INTO sizes (label) VALUES ('S'), ('M'), ('L'), ('XL');
INSERT INTO colors (name) VALUES ('Red'), ('Blue'), ('Green');

-- 1. CROSS JOIN: All size-color combinations
SELECT s.label AS size, c.name AS color
FROM sizes s
CROSS JOIN colors c
ORDER BY s.id, c.id;

-- 2. Total combinations (4 sizes × 3 colors = 12)
SELECT COUNT(*) AS total_combinations
FROM sizes CROSS JOIN colors;

-- 3. Generate a product catalog with SKUs
SELECT
  s.label || '-' || UPPER(LEFT(c.name, 3)) AS sku,
  s.label AS size,
  c.name AS color
FROM sizes s
CROSS JOIN colors c
ORDER BY sku;

-- 4. Implicit cross join (comma syntax - same result)
SELECT s.label AS size, c.name AS color
FROM sizes s, colors c
ORDER BY s.id, c.id;

-- 5. Practical: Generate a date grid
SELECT
  d::date AS date,
  c.name AS color
FROM generate_series('2024-01-01', '2024-01-03', '1 day'::interval) d
CROSS JOIN colors c
ORDER BY d, c.name;

-- 6. CROSS JOIN + WHERE = INNER JOIN
SELECT s.label, c.name
FROM sizes s
CROSS JOIN colors c
WHERE s.label = 'M' AND c.name = 'Blue';
`,
    },
    interviewQuestions: [
      {
        question: "What is a Cartesian product and how does CROSS JOIN create it?",
        difficulty: "Easy",
        hint: "A Cartesian product is every possible combination of rows from two sets. CROSS JOIN creates it by pairing each row from the left table with every row from the right table. 5 rows × 4 rows = 20 result rows. No matching condition is needed.",
      },
      {
        question: "When is CROSS JOIN useful in practice?",
        difficulty: "Medium",
        hint: "CROSS JOIN is useful for: generating all product variants (sizes × colors), creating reporting grids (dates × categories with all cells, even empty ones), generating test data, creating lookup tables, and finding all possible pairings. Always pair it with small tables.",
      },
      {
        question: "What is the difference between explicit CROSS JOIN and comma-separated FROM?",
        difficulty: "Hard",
        hint: "FROM a, b is the old SQL-89 implicit cross join syntax, equivalent to FROM a CROSS JOIN b. The explicit CROSS JOIN is preferred because: 1) it clearly shows intent, 2) comma joins with WHERE conditions can accidentally produce cross joins if you forget a condition, 3) explicit joins separate join logic (ON) from filter logic (WHERE). PostgreSQL processes them identically.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 35. Join Conditions
  // ─────────────────────────────────────────────
  {
    id: "join-conditions",
    title: "Join Conditions",
    slug: "join-conditions",
    icon: "Link2",
    difficulty: "Intermediate",
    description:
      "Learn the different ways to specify join conditions — ON, USING, NATURAL, and non-equi joins for flexible data combinations.",
    concept: {
      explanation:
        "Join conditions specify how rows from two tables should be matched. The most common is the ON clause with equality (equi-join): ON a.id = b.a_id. But joins support much more flexibility. The USING clause is a shorthand when both tables have identically named join columns: JOIN table2 USING (column_name). NATURAL JOIN automatically joins on all columns with the same name in both tables — convenient but dangerous in production because schema changes can silently change behavior. Non-equi joins use operators other than equality in the ON clause: ON a.price BETWEEN b.min_price AND b.max_price, or ON a.date > b.date. You can also have compound join conditions with AND: ON a.col1 = b.col1 AND a.col2 = b.col2 (composite key joins). The ON clause can include any boolean expression, not just simple equality.",
      realLifeAnalogy:
        "Join conditions are like matching criteria on a dating app. The simplest is an exact match (equi-join): 'match people in the same city'. USING is shorthand when both profiles call it 'city'. NATURAL is 'match on everything that's the same' — risky because you might accidentally match on 'name' when you only meant 'city'. Non-equi joins are flexible criteria: 'match people within 5 years of age' (a range condition rather than exact match).",
      keyPoints: [
        "ON clause: most flexible, supports any boolean expression",
        "USING (column): shorthand when join columns have the same name",
        "NATURAL JOIN: auto-joins on all same-named columns (avoid in production)",
        "Equi-join: ON a.col = b.col (equality, most common)",
        "Non-equi join: ON a.col > b.col, BETWEEN, !=, etc.",
        "Compound conditions: ON a.x = b.x AND a.y = b.y",
        "USING produces only one copy of the joined column in the result",
        "ON vs WHERE: ON is evaluated during the join, WHERE after",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Join Conditions =====

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  total NUMERIC(10, 2),
  order_date DATE
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  tier VARCHAR(20)
);

CREATE TABLE discounts (
  tier VARCHAR(20),
  min_amount NUMERIC(10, 2),
  max_amount NUMERIC(10, 2),
  discount_pct NUMERIC(4, 2)
);

INSERT INTO customers (name, tier) VALUES
  ('Alice', 'Gold'), ('Bob', 'Silver'), ('Carol', 'Gold');

INSERT INTO orders (customer_id, total, order_date) VALUES
  (1, 150.00, '2024-01-15'),
  (2, 75.00, '2024-01-20'),
  (1, 250.00, '2024-02-01'),
  (3, 50.00, '2024-02-10');

INSERT INTO discounts (tier, min_amount, max_amount, discount_pct) VALUES
  ('Gold', 0, 99.99, 5),
  ('Gold', 100, 199.99, 10),
  ('Gold', 200, 999.99, 15),
  ('Silver', 0, 99.99, 2),
  ('Silver', 100, 999.99, 5);

-- 1. ON clause (standard equi-join)
SELECT o.id, c.name, o.total
FROM orders o
JOIN customers c ON o.customer_id = c.id;

-- 2. Non-equi join: Find applicable discount
SELECT c.name, c.tier, o.total, d.discount_pct
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN discounts d ON c.tier = d.tier
  AND o.total BETWEEN d.min_amount AND d.max_amount;

-- 3. USING shorthand (columns with same name)
-- First, let's demo with matching column names
SELECT o.id AS order_id, c.name, o.total
FROM orders o
JOIN customers c USING (id)  -- Matches orders.id = customers.id
LIMIT 3;

-- 4. Compound join condition
SELECT c.name, c.tier, d.discount_pct, d.min_amount, d.max_amount
FROM customers c
JOIN discounts d ON c.tier = d.tier AND d.min_amount = 0;

-- 5. ON vs WHERE with LEFT JOIN (different results!)
-- ON: filter during join (keeps all left rows)
SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id AND o.total > 100;

-- WHERE: filter after join (removes unmatched rows)
SELECT c.name, o.total
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.total > 100 OR o.total IS NULL;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between ON and USING in a JOIN?",
        difficulty: "Easy",
        hint: "ON specifies any join condition: ON a.col1 = b.col2. USING is shorthand when both tables have the same column name: USING (column). USING produces only one copy of the column in the result, while ON keeps both. USING is cleaner but less flexible.",
      },
      {
        question: "What is the critical difference between ON and WHERE in a LEFT JOIN?",
        difficulty: "Medium",
        hint: "In a LEFT JOIN, ON conditions are evaluated during the join (unmatched left rows still appear with NULLs). WHERE conditions are applied after the join (they can remove left rows entirely). LEFT JOIN ... ON a.id = b.id AND b.status = 'active' keeps all left rows. LEFT JOIN ... ON a.id = b.id WHERE b.status = 'active' removes left rows without active matches.",
      },
      {
        question: "Why should you avoid NATURAL JOIN in production code?",
        difficulty: "Hard",
        hint: "NATURAL JOIN auto-joins on ALL same-named columns. If someone adds a column named 'id' or 'name' to either table, the join condition silently changes, potentially producing wrong results. It's also not explicit — readers can't tell the join condition without checking both schemas. Use explicit ON or USING instead for maintainable code.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 36. Multiple Table Joins
  // ─────────────────────────────────────────────
  {
    id: "multiple-table-joins",
    title: "Multiple Table Joins",
    slug: "multiple-table-joins",
    icon: "Network",
    difficulty: "Intermediate",
    description:
      "Learn how to join three or more tables together to query complex relationships and build comprehensive result sets.",
    concept: {
      explanation:
        "Real-world queries often need data from three or more tables. Multiple joins chain together, with each JOIN adding another table to the result. The order of joins matters for readability but usually not for performance — PostgreSQL's optimizer rearranges joins for the best execution plan. When joining multiple tables, start from the 'central' table and join outward to related tables. Each JOIN has its own ON condition specifying how the new table connects. You can mix join types: INNER JOIN for required relationships and LEFT JOIN for optional ones. Common patterns include: star schemas (fact table joined to multiple dimension tables), chain joins (A → B → C through foreign keys), and bridge/junction tables for many-to-many relationships. Always use table aliases (short ones like o, c, p) to keep multi-join queries readable.",
      realLifeAnalogy:
        "Multiple joins are like building a report from different filing cabinets. To create an invoice report, you need: the order details (orders), who placed it (customers), what was ordered (products), and the category of each product (categories). Each filing cabinet connects to another through shared references — order has customer_id, order items have product_id, products have category_id. You walk from cabinet to cabinet, gathering pieces of information to build the complete picture.",
      keyPoints: [
        "Chain multiple JOINs: FROM a JOIN b ON ... JOIN c ON ...",
        "Each JOIN has its own ON condition",
        "Mix join types: INNER JOIN for required, LEFT JOIN for optional",
        "PostgreSQL optimizer reorders joins for performance",
        "Junction tables enable many-to-many relationships",
        "Start from the central/main table and join outward",
        "Use short, meaningful table aliases for readability",
        "More joins = more complexity — consider views for reuse",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Multiple Table Joins =====

-- Create a mini e-commerce schema
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  order_date DATE,
  status VARCHAR(20)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  price NUMERIC(10, 2)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT
);

-- Insert sample data
INSERT INTO customers (name, email) VALUES
  ('Alice', 'alice@mail.com'),
  ('Bob', 'bob@mail.com'),
  ('Carol', 'carol@mail.com');

INSERT INTO products (name, category, price) VALUES
  ('Laptop', 'Electronics', 999.99),
  ('Mouse', 'Electronics', 29.99),
  ('Desk Chair', 'Furniture', 349.00),
  ('Notebook', 'Stationery', 4.99);

INSERT INTO orders (customer_id, order_date, status) VALUES
  (1, '2024-01-15', 'completed'),
  (2, '2024-01-20', 'completed'),
  (1, '2024-02-01', 'pending');

INSERT INTO order_items (order_id, product_id, quantity) VALUES
  (1, 1, 1), (1, 2, 2),   -- Alice: Laptop + 2 Mice
  (2, 3, 1), (2, 4, 5),   -- Bob: Chair + 5 Notebooks
  (3, 2, 3);               -- Alice: 3 Mice

-- 1. Three-table join: Orders with customer and item details
SELECT
  c.name AS customer,
  o.order_date,
  p.name AS product,
  oi.quantity,
  p.price * oi.quantity AS line_total
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
ORDER BY o.id, p.name;

-- 2. Order summary with totals
SELECT
  c.name AS customer,
  o.id AS order_id,
  o.order_date,
  SUM(p.price * oi.quantity) AS order_total
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY c.name, o.id, o.order_date
ORDER BY o.order_date;

-- 3. LEFT JOIN: Include customers with no orders
SELECT
  c.name AS customer,
  COUNT(DISTINCT o.id) AS order_count,
  COALESCE(SUM(p.price * oi.quantity), 0) AS total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
GROUP BY c.name
ORDER BY total_spent DESC;

-- 4. Products by category with order count
SELECT
  p.category,
  p.name AS product,
  COUNT(oi.id) AS times_ordered,
  COALESCE(SUM(oi.quantity), 0) AS total_qty
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.category, p.name
ORDER BY total_qty DESC;
`,
    },
    interviewQuestions: [
      {
        question: "In what order should you write multiple JOINs for readability?",
        difficulty: "Easy",
        hint: "Start from the central/main table (often the 'fact' table like orders), then join dimension tables outward. Follow the foreign key relationships. Use consistent table aliases. The optimizer will rearrange joins for performance regardless of written order.",
      },
      {
        question: "When joining multiple tables, when should you use LEFT JOIN vs INNER JOIN?",
        difficulty: "Medium",
        hint: "Use INNER JOIN when the relationship is required (every order must have a customer). Use LEFT JOIN when the relationship is optional (some customers may have no orders). Be careful: if you LEFT JOIN then INNER JOIN a table dependent on the left-joined table, the INNER JOIN effectively converts it to an INNER JOIN.",
      },
      {
        question: "How does PostgreSQL optimize queries with many joins?",
        difficulty: "Hard",
        hint: "PostgreSQL uses dynamic programming or genetic algorithm (GEQO, for 12+ tables) to find the optimal join order. It considers all permutations of join order and join strategy (nested loop, hash, merge) based on table statistics, index availability, and estimated costs. The optimizer may rearrange INNER JOINs freely but must preserve LEFT JOIN order. Use EXPLAIN ANALYZE to see the chosen plan.",
      },
    ],
  },

  // ═══════════════════════════════════════════════
  // LEVEL 5 — Aggregations and Grouping
  // ═══════════════════════════════════════════════

  // ─────────────────────────────────────────────
  // 37. COUNT Function
  // ─────────────────────────────────────────────
  {
    id: "count-function",
    title: "COUNT Function",
    slug: "count-function",
    icon: "Hash",
    difficulty: "Intermediate",
    description:
      "Learn how to count rows and values using COUNT(*), COUNT(column), and COUNT(DISTINCT column) — the most commonly used aggregate function.",
    concept: {
      explanation:
        "COUNT is an aggregate function that returns the number of rows or non-NULL values. COUNT(*) counts all rows regardless of NULL values — it counts the row itself, not any particular column. COUNT(column) counts only rows where that column is NOT NULL. COUNT(DISTINCT column) counts unique non-NULL values. Aggregate functions collapse multiple rows into a single result row. Without GROUP BY, COUNT returns one number for the entire table. With GROUP BY, it returns one count per group. COUNT(*) is typically the fastest because it doesn't need to check column values — PostgreSQL can use index-only scans or even just read the visibility map. COUNT is often used with WHERE to count filtered subsets, with CASE for conditional counting, and with FILTER for PostgreSQL-specific conditional aggregation.",
      realLifeAnalogy:
        "COUNT is like taking attendance. COUNT(*) asks 'how many seats are occupied?' — it doesn't matter what each person is doing. COUNT(email) asks 'how many people have an email on file?' — those without emails aren't counted. COUNT(DISTINCT department) asks 'how many different departments are represented?' — even if 10 people are from Engineering, it counts as 1.",
      keyPoints: [
        "COUNT(*) counts all rows including those with NULLs",
        "COUNT(column) counts only non-NULL values in that column",
        "COUNT(DISTINCT column) counts unique non-NULL values",
        "Without GROUP BY, returns a single value for the entire table",
        "COUNT(*) is optimized — can use index-only scans",
        "COUNT with FILTER: COUNT(*) FILTER (WHERE condition)",
        "COUNT returns BIGINT (not INTEGER) in PostgreSQL",
        "Use COUNT with CASE for conditional counting across categories",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== COUNT Function =====

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(50),
  salary NUMERIC(10, 2),
  email VARCHAR(150)
);

INSERT INTO employees (name, department, salary, email) VALUES
  ('Alice', 'Engineering', 95000, 'alice@co.com'),
  ('Bob', 'Marketing', 72000, 'bob@co.com'),
  ('Carol', 'Engineering', 105000, NULL),
  ('David', 'Sales', 68000, 'david@co.com'),
  ('Eve', 'Marketing', 78000, 'eve@co.com'),
  ('Frank', 'Engineering', 112000, 'frank@co.com'),
  ('Grace', 'Sales', 65000, NULL),
  ('Henry', NULL, 55000, 'henry@co.com');

-- 1. COUNT(*): Total rows
SELECT COUNT(*) AS total_employees FROM employees;

-- 2. COUNT(column): Non-NULL values only
SELECT COUNT(email) AS with_email, COUNT(department) AS with_dept FROM employees;

-- 3. COUNT(DISTINCT): Unique values
SELECT COUNT(DISTINCT department) AS unique_depts FROM employees;

-- 4. COUNT with WHERE
SELECT COUNT(*) AS engineers FROM employees WHERE department = 'Engineering';

-- 5. COUNT with GROUP BY
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
ORDER BY headcount DESC;

-- 6. Conditional counting with FILTER
SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE salary > 80000) AS high_earners,
  COUNT(*) FILTER (WHERE salary <= 80000) AS standard_earners
FROM employees;

-- 7. Conditional counting with CASE
SELECT
  COUNT(CASE WHEN department = 'Engineering' THEN 1 END) AS eng_count,
  COUNT(CASE WHEN department = 'Marketing' THEN 1 END) AS mkt_count,
  COUNT(CASE WHEN department = 'Sales' THEN 1 END) AS sales_count
FROM employees;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT)?",
        difficulty: "Easy",
        hint: "COUNT(*) counts all rows. COUNT(column) counts rows where that column is NOT NULL. COUNT(DISTINCT column) counts unique non-NULL values. For example, a table with 10 rows where 2 have NULL emails and 3 share the same email: COUNT(*) = 10, COUNT(email) = 8, COUNT(DISTINCT email) = 6.",
      },
      {
        question: "Why is COUNT(*) typically faster than COUNT(column)?",
        difficulty: "Medium",
        hint: "COUNT(*) doesn't need to read or check any column values — it just needs to know if a row exists. PostgreSQL can use an index-only scan (reading just the index) or the visibility map. COUNT(column) must read the actual column data to check for NULLs, which requires accessing the heap (table data).",
      },
      {
        question: "How does the FILTER clause work with aggregate functions in PostgreSQL?",
        difficulty: "Hard",
        hint: "FILTER is a PostgreSQL extension: COUNT(*) FILTER (WHERE condition) counts only rows matching the condition. It's equivalent to COUNT(CASE WHEN condition THEN 1 END) but more readable and potentially more efficient. FILTER works with all aggregate functions (SUM, AVG, etc.) and is evaluated after GROUP BY but applies only to the specific aggregate, not the entire query.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 38. SUM Function
  // ─────────────────────────────────────────────
  {
    id: "sum-function",
    title: "SUM Function",
    slug: "sum-function",
    icon: "Calculator",
    difficulty: "Intermediate",
    description:
      "Learn how to calculate totals using the SUM aggregate function for numeric columns, with grouping and conditional summation.",
    concept: {
      explanation:
        "SUM calculates the total of all non-NULL values in a numeric column. It ignores NULL values — if all values are NULL, SUM returns NULL (not 0). Use COALESCE(SUM(column), 0) to get 0 instead of NULL when no rows match. SUM works with INTEGER, NUMERIC, REAL, and DOUBLE PRECISION types. When summing INTEGER values, PostgreSQL automatically promotes the result to BIGINT to avoid overflow. SUM with GROUP BY calculates subtotals per group. SUM(DISTINCT column) sums only unique values. SUM with CASE or FILTER enables conditional summation — totaling values only when specific conditions are met. This is powerful for creating pivot-table-style reports in a single query. SUM is often combined with JOINs to calculate order totals, revenue by category, or running balances.",
      realLifeAnalogy:
        "SUM is like a cashier totaling up a receipt. Each item has a price, and SUM adds them all together. If an item has no price tag (NULL), the cashier skips it. SUM with GROUP BY is like having separate subtotals for groceries, electronics, and clothing on the same receipt. Conditional SUM is like adding up only the items that were on sale.",
      keyPoints: [
        "SUM adds all non-NULL values in a numeric column",
        "Returns NULL if all values are NULL (use COALESCE for 0)",
        "Integer SUM returns BIGINT to prevent overflow",
        "SUM(DISTINCT column) sums unique values only",
        "SUM with GROUP BY creates subtotals per group",
        "Conditional: SUM(CASE WHEN ... THEN value END)",
        "PostgreSQL FILTER: SUM(col) FILTER (WHERE condition)",
        "Commonly combined with JOINs for multi-table totals",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== SUM Function =====

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  product VARCHAR(100),
  category VARCHAR(50),
  quantity INT,
  price NUMERIC(10, 2),
  sale_date DATE
);

INSERT INTO sales (product, category, quantity, price, sale_date) VALUES
  ('Laptop', 'Electronics', 3, 999.99, '2024-01-15'),
  ('Mouse', 'Electronics', 15, 29.99, '2024-01-20'),
  ('Desk Chair', 'Furniture', 5, 349.00, '2024-02-01'),
  ('Notebook', 'Stationery', 50, 4.99, '2024-02-10'),
  ('Monitor', 'Electronics', 4, 449.99, '2024-02-15'),
  ('Pen Pack', 'Stationery', 100, 2.49, '2024-03-01'),
  ('Standing Desk', 'Furniture', 2, 599.00, '2024-03-10');

-- 1. Total revenue
SELECT SUM(quantity * price) AS total_revenue FROM sales;

-- 2. SUM with GROUP BY
SELECT category, SUM(quantity * price) AS category_revenue
FROM sales
GROUP BY category
ORDER BY category_revenue DESC;

-- 3. SUM with FILTER (conditional sums)
SELECT
  SUM(quantity * price) AS total_revenue,
  SUM(quantity * price) FILTER (WHERE category = 'Electronics') AS electronics_rev,
  SUM(quantity * price) FILTER (WHERE category = 'Furniture') AS furniture_rev,
  SUM(quantity * price) FILTER (WHERE category = 'Stationery') AS stationery_rev
FROM sales;

-- 4. Monthly revenue
SELECT
  TO_CHAR(sale_date, 'YYYY-MM') AS month,
  SUM(quantity * price) AS monthly_revenue,
  SUM(quantity) AS units_sold
FROM sales
GROUP BY TO_CHAR(sale_date, 'YYYY-MM')
ORDER BY month;

-- 5. SUM with COALESCE for safety
SELECT COALESCE(SUM(quantity * price), 0) AS revenue
FROM sales
WHERE category = 'NonExistent';

-- 6. Running total with window function preview
SELECT
  product, category,
  quantity * price AS line_total,
  SUM(quantity * price) OVER (ORDER BY sale_date) AS running_total
FROM sales
ORDER BY sale_date;
`,
    },
    interviewQuestions: [
      {
        question: "What does SUM return when there are no matching rows or all values are NULL?",
        difficulty: "Easy",
        hint: "SUM returns NULL, not 0. This catches many developers off guard. Use COALESCE(SUM(column), 0) to safely get 0 when there are no matches. This is important in LEFT JOINs where the right side may have no matching rows.",
      },
      {
        question: "What is the difference between SUM(column) and SUM(DISTINCT column)?",
        difficulty: "Medium",
        hint: "SUM(column) adds all non-NULL values including duplicates. SUM(DISTINCT column) adds only unique values. If a column has values [10, 20, 10, 30], SUM = 70 but SUM(DISTINCT) = 60. SUM(DISTINCT) is useful for avoiding double-counting in queries with JOINs that produce duplicate rows.",
      },
      {
        question: "How can you create a pivot-table-style report using SUM with CASE?",
        difficulty: "Hard",
        hint: "Use conditional SUM: SELECT region, SUM(CASE WHEN quarter = 'Q1' THEN revenue END) AS q1, SUM(CASE WHEN quarter = 'Q2' THEN revenue END) AS q2 FROM sales GROUP BY region. Each CASE expression creates a column. PostgreSQL's FILTER syntax is cleaner: SUM(revenue) FILTER (WHERE quarter = 'Q1'). For dynamic pivots, use the crosstab() function from the tablefunc extension.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 39. AVG Function
  // ─────────────────────────────────────────────
  {
    id: "avg-function",
    title: "AVG Function",
    slug: "avg-function",
    icon: "TrendingUp",
    difficulty: "Intermediate",
    description:
      "Learn how to calculate averages with the AVG function, handle NULL values, control decimal precision, and understand weighted averages.",
    concept: {
      explanation:
        "AVG calculates the arithmetic mean of all non-NULL values in a numeric column. It equals SUM(column) / COUNT(column) — importantly, it divides by the count of non-NULL values, not the total row count. This means NULL values are excluded from both the numerator and denominator. For example, if three salaries are 100, 200, and NULL, AVG returns 150 (not 100). AVG returns NUMERIC for integer inputs to preserve decimal precision. You can control the output precision with ROUND(AVG(column), 2). AVG with GROUP BY computes averages per group. For weighted averages (where some values count more), use SUM(value * weight) / SUM(weight). AVG(DISTINCT column) averages only unique values. Like other aggregates, AVG returns NULL when there are no matching non-NULL values.",
      realLifeAnalogy:
        "AVG is like calculating your GPA. Each class has a grade, and AVG computes the mean. If you withdrew from a class (NULL), it doesn't count at all — it's not a zero, it's simply excluded. A weighted average is like giving more credit to a 4-credit course than a 1-credit course — the same grade in the bigger course affects your GPA more.",
      keyPoints: [
        "AVG computes the mean of non-NULL values",
        "NULL values are excluded from both numerator and denominator",
        "Returns NUMERIC type for precise decimal results",
        "Use ROUND(AVG(col), 2) to control decimal places",
        "AVG(DISTINCT column) averages unique values only",
        "Weighted average: SUM(value * weight) / SUM(weight)",
        "Returns NULL when no non-NULL values exist",
        "Common with GROUP BY for per-category averages",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== AVG Function =====

CREATE TABLE student_scores (
  id SERIAL PRIMARY KEY,
  student VARCHAR(100),
  subject VARCHAR(50),
  score NUMERIC(5, 2),
  credits INT
);

INSERT INTO student_scores (student, subject, score, credits) VALUES
  ('Alice', 'Math', 92.5, 4),
  ('Alice', 'Science', 88.0, 3),
  ('Alice', 'English', 95.0, 3),
  ('Bob', 'Math', 78.0, 4),
  ('Bob', 'Science', NULL, 3),   -- Withdrew
  ('Bob', 'English', 85.0, 3),
  ('Carol', 'Math', 96.0, 4),
  ('Carol', 'Science', 91.5, 3),
  ('Carol', 'English', 89.0, 3);

-- 1. Overall average score
SELECT ROUND(AVG(score), 2) AS avg_score FROM student_scores;

-- 2. Average per student
SELECT student, ROUND(AVG(score), 2) AS avg_score
FROM student_scores
GROUP BY student
ORDER BY avg_score DESC;

-- 3. Notice: Bob's NULL is excluded (avg of 78 and 85 = 81.5)
SELECT student, COUNT(score) AS scored_subjects, ROUND(AVG(score), 2) AS avg
FROM student_scores
GROUP BY student;

-- 4. Average per subject
SELECT subject, ROUND(AVG(score), 2) AS avg_score
FROM student_scores
GROUP BY subject
ORDER BY avg_score DESC;

-- 5. Weighted average (GPA-style)
SELECT
  student,
  ROUND(SUM(score * credits) / SUM(credits), 2) AS weighted_avg
FROM student_scores
WHERE score IS NOT NULL
GROUP BY student
ORDER BY weighted_avg DESC;

-- 6. Compare AVG vs manual calculation
SELECT
  ROUND(AVG(score), 2) AS avg_func,
  ROUND(SUM(score) / COUNT(score), 2) AS manual_avg,
  ROUND(SUM(score) / COUNT(*), 2) AS wrong_avg  -- Includes NULL rows!
FROM student_scores;
`,
    },
    interviewQuestions: [
      {
        question: "How does AVG handle NULL values?",
        difficulty: "Easy",
        hint: "AVG ignores NULLs entirely — they are excluded from both the sum and the count. AVG of (100, 200, NULL) = 150, not 100. This is different from treating NULL as 0. If you want NULLs treated as 0, use AVG(COALESCE(column, 0)).",
      },
      {
        question: "What is the difference between AVG(column) and SUM(column)/COUNT(*)?",
        difficulty: "Medium",
        hint: "AVG(column) = SUM(column) / COUNT(column). Note COUNT(column) not COUNT(*). COUNT(*) counts all rows including those with NULLs, while COUNT(column) only counts non-NULL values. So SUM(col)/COUNT(*) gives a lower average when NULLs exist because the denominator is larger.",
      },
      {
        question: "How do you calculate a weighted average in PostgreSQL?",
        difficulty: "Hard",
        hint: "Use SUM(value * weight) / SUM(weight). For example, a credit-weighted GPA: SUM(score * credits) / SUM(credits). This gives more weight to higher-credit courses. Make sure to filter out NULL values first. There's no built-in WEIGHTED_AVG function — you must compute it manually.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 40. MIN and MAX
  // ─────────────────────────────────────────────
  {
    id: "min-and-max",
    title: "MIN and MAX",
    slug: "min-and-max",
    icon: "ArrowUpDown",
    difficulty: "Intermediate",
    description:
      "Learn how to find minimum and maximum values using MIN and MAX — aggregate functions that work with numbers, text, dates, and more.",
    concept: {
      explanation:
        "MIN returns the smallest value and MAX returns the largest value in a set of non-NULL values. Both ignore NULLs. Unlike SUM and AVG, MIN and MAX work with any comparable data type — numbers, text (alphabetical order), dates (chronological order), timestamps, and even booleans (FALSE < TRUE). For text, MIN returns the alphabetically first value and MAX returns the last. MIN and MAX are often used to find extremes: the highest salary, the earliest date, the most recent order. They can be combined with GROUP BY for per-group extremes. A common pattern is finding the row with the min/max value, which requires a subquery or window function because aggregate functions only return the aggregate value, not the entire row. MIN and MAX can use B-tree indexes efficiently — PostgreSQL can read just the first or last entry.",
      realLifeAnalogy:
        "MIN and MAX are like finding the shortest and tallest person in a group photo. MIN picks the shortest, MAX picks the tallest. If someone didn't show up (NULL), they're ignored. With GROUP BY, it's like finding the shortest and tallest person in each team. MIN and MAX work for dates too — the earliest and latest birthday in the class.",
      keyPoints: [
        "MIN returns smallest, MAX returns largest non-NULL value",
        "Both ignore NULL values",
        "Work with numbers, text, dates, timestamps, booleans",
        "Text MIN/MAX uses alphabetical (collation) order",
        "Can use B-tree indexes for efficient retrieval",
        "To get the full row with min/max, use subquery or window function",
        "GREATEST/LEAST are row-level functions (not aggregates)",
        "Useful for date ranges: MIN(date) to MAX(date)",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== MIN and MAX =====

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  price NUMERIC(10, 2),
  stock INT,
  added_date DATE
);

INSERT INTO products (name, category, price, stock, added_date) VALUES
  ('Laptop', 'Electronics', 999.99, 50, '2023-01-15'),
  ('Mouse', 'Electronics', 29.99, 200, '2023-03-20'),
  ('Desk Chair', 'Furniture', 349.00, 30, '2023-06-01'),
  ('Notebook', 'Stationery', 4.99, 500, '2023-02-10'),
  ('Monitor', 'Electronics', 449.99, 0, '2024-01-05'),
  ('Pen Pack', 'Stationery', 2.49, 1000, '2023-08-15'),
  ('Standing Desk', 'Furniture', 599.00, 15, '2024-02-20');

-- 1. Overall min and max
SELECT
  MIN(price) AS cheapest,
  MAX(price) AS most_expensive,
  MIN(added_date) AS oldest_product,
  MAX(added_date) AS newest_product
FROM products;

-- 2. MIN and MAX per category
SELECT
  category,
  MIN(price) AS min_price,
  MAX(price) AS max_price,
  MAX(price) - MIN(price) AS price_range
FROM products
GROUP BY category
ORDER BY price_range DESC;

-- 3. Find the actual product with the highest price
SELECT name, price FROM products
WHERE price = (SELECT MAX(price) FROM products);

-- 4. MIN/MAX with dates
SELECT
  category,
  MIN(added_date) AS first_added,
  MAX(added_date) AS last_added,
  MAX(added_date) - MIN(added_date) AS days_span
FROM products
GROUP BY category;

-- 5. Text MIN/MAX (alphabetical)
SELECT MIN(name) AS first_alpha, MAX(name) AS last_alpha FROM products;

-- 6. GREATEST/LEAST (row-level, not aggregate)
SELECT name, price, stock,
  GREATEST(price, stock) AS higher_value,
  LEAST(price, stock) AS lower_value
FROM products;

-- 7. Combined with other aggregates
SELECT
  category,
  COUNT(*) AS products,
  MIN(price) AS min_price,
  MAX(price) AS max_price,
  ROUND(AVG(price), 2) AS avg_price,
  SUM(stock) AS total_stock
FROM products
GROUP BY category;
`,
    },
    interviewQuestions: [
      {
        question: "What data types can MIN and MAX work with?",
        difficulty: "Easy",
        hint: "MIN and MAX work with any comparable type: numbers (INTEGER, NUMERIC, etc.), text (alphabetical order based on collation), dates and timestamps (chronological order), booleans (FALSE < TRUE), and even arrays and composite types. They always ignore NULL values.",
      },
      {
        question: "How do you find the entire row that has the maximum value, not just the max value itself?",
        difficulty: "Medium",
        hint: "Use a subquery: SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products). Or use DISTINCT ON: SELECT DISTINCT ON (category) * FROM products ORDER BY category, price DESC. Or window functions: SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY price DESC) AS rn FROM products) t WHERE rn = 1.",
      },
      {
        question: "What is the difference between MIN/MAX (aggregate) and LEAST/GREATEST (row-level)?",
        difficulty: "Hard",
        hint: "MIN/MAX are aggregate functions that operate across rows: MIN(price) finds the lowest price across all rows. LEAST/GREATEST operate across columns in a single row: LEAST(price, cost, discount) returns the smallest of those three values for each row. MIN/MAX collapse rows; LEAST/GREATEST compare values within a row.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 41. GROUP BY
  // ─────────────────────────────────────────────
  {
    id: "group-by",
    title: "GROUP BY",
    slug: "group-by",
    icon: "Boxes",
    difficulty: "Intermediate",
    description:
      "Learn how GROUP BY divides rows into groups and applies aggregate functions to each group independently.",
    concept: {
      explanation:
        "GROUP BY divides the result set into groups of rows that share the same values in specified columns. Aggregate functions (COUNT, SUM, AVG, MIN, MAX) are then applied to each group independently, producing one result row per group. Every column in the SELECT list must either be in the GROUP BY clause or be inside an aggregate function — this is a strict SQL rule that PostgreSQL enforces. GROUP BY is evaluated after FROM and WHERE but before SELECT and ORDER BY. This means you can filter rows with WHERE before grouping, but you need HAVING to filter after grouping. GROUP BY can use multiple columns: GROUP BY department, year creates groups for each unique department-year combination. PostgreSQL also supports GROUP BY expressions: GROUP BY DATE_TRUNC('month', created_at). Advanced grouping options include ROLLUP (hierarchical subtotals), CUBE (all possible subtotals), and GROUPING SETS (specific subtotal combinations).",
      realLifeAnalogy:
        "GROUP BY is like sorting students into groups by their major, then counting how many students are in each group. Without GROUP BY, you'd count all students as one big group. With GROUP BY major, you get separate counts for Computer Science, Mathematics, Physics, etc. GROUP BY major, year is like further dividing each major by graduation year.",
      keyPoints: [
        "Divides rows into groups sharing the same values",
        "Aggregates are applied per group, producing one row per group",
        "SELECT columns must be in GROUP BY or inside aggregates",
        "Evaluated after WHERE, before HAVING and SELECT",
        "Multiple columns: GROUP BY col1, col2 creates compound groups",
        "Can use expressions: GROUP BY DATE_TRUNC('month', date)",
        "ROLLUP, CUBE, GROUPING SETS for advanced subtotals",
        "NULL values form their own group in GROUP BY",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== GROUP BY =====

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer VARCHAR(100),
  product VARCHAR(100),
  category VARCHAR(50),
  amount NUMERIC(10, 2),
  order_date DATE
);

INSERT INTO orders (customer, product, category, amount, order_date) VALUES
  ('Alice', 'Laptop', 'Electronics', 999.99, '2024-01-15'),
  ('Bob', 'Mouse', 'Electronics', 29.99, '2024-01-20'),
  ('Alice', 'Desk Chair', 'Furniture', 349.00, '2024-02-01'),
  ('Carol', 'Notebook', 'Stationery', 4.99, '2024-02-10'),
  ('Bob', 'Monitor', 'Electronics', 449.99, '2024-02-15'),
  ('Alice', 'Pen Pack', 'Stationery', 2.49, '2024-03-01'),
  ('Carol', 'Standing Desk', 'Furniture', 599.00, '2024-03-10'),
  ('Bob', 'Keyboard', 'Electronics', 79.99, '2024-03-15');

-- 1. Group by single column
SELECT category, COUNT(*) AS orders, SUM(amount) AS revenue
FROM orders
GROUP BY category
ORDER BY revenue DESC;

-- 2. Group by multiple columns
SELECT customer, category, SUM(amount) AS spent
FROM orders
GROUP BY customer, category
ORDER BY customer, spent DESC;

-- 3. Group by expression (monthly)
SELECT
  TO_CHAR(order_date, 'YYYY-MM') AS month,
  COUNT(*) AS order_count,
  SUM(amount) AS monthly_revenue
FROM orders
GROUP BY TO_CHAR(order_date, 'YYYY-MM')
ORDER BY month;

-- 4. Top customers by total spending
SELECT
  customer,
  COUNT(*) AS orders,
  SUM(amount) AS total_spent,
  ROUND(AVG(amount), 2) AS avg_order
FROM orders
GROUP BY customer
ORDER BY total_spent DESC;

-- 5. ROLLUP: Hierarchical subtotals
SELECT
  COALESCE(category, 'ALL CATEGORIES') AS category,
  COUNT(*) AS orders,
  SUM(amount) AS revenue
FROM orders
GROUP BY ROLLUP(category)
ORDER BY category NULLS LAST;
`,
    },
    interviewQuestions: [
      {
        question: "Why must SELECT columns be in GROUP BY or inside aggregate functions?",
        difficulty: "Easy",
        hint: "GROUP BY collapses multiple rows into one per group. If you SELECT a column not in GROUP BY and not aggregated, PostgreSQL doesn't know which of the multiple values to display — it's ambiguous. For example, GROUP BY department with SELECT name would have multiple names per department. PostgreSQL enforces this rule strictly (unlike MySQL which may pick an arbitrary value).",
      },
      {
        question: "What is the SQL query execution order and where does GROUP BY fit?",
        difficulty: "Medium",
        hint: "Logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT. WHERE filters individual rows before grouping. GROUP BY creates groups. HAVING filters groups after aggregation. SELECT evaluates expressions and aliases. ORDER BY sorts the final result. This is why you can't use SELECT aliases in WHERE or GROUP BY.",
      },
      {
        question: "What is the difference between ROLLUP, CUBE, and GROUPING SETS?",
        difficulty: "Hard",
        hint: "ROLLUP(a, b) produces groups for (a, b), (a), and (). It creates hierarchical subtotals — useful for reports. CUBE(a, b) produces all combinations: (a, b), (a), (b), and (). It creates all possible subtotals. GROUPING SETS((a, b), (a), ()) lets you specify exactly which groupings you want. ROLLUP and CUBE are shorthand for specific GROUPING SETS patterns.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 42. HAVING Clause
  // ─────────────────────────────────────────────
  {
    id: "having-clause",
    title: "HAVING Clause",
    slug: "having-clause",
    icon: "Filter",
    difficulty: "Intermediate",
    description:
      "Learn how HAVING filters groups after aggregation — the GROUP BY equivalent of WHERE for aggregate conditions.",
    concept: {
      explanation:
        "HAVING filters groups created by GROUP BY based on aggregate conditions. While WHERE filters individual rows before grouping, HAVING filters entire groups after aggregation. This distinction is critical: WHERE cannot use aggregate functions (like COUNT, SUM, AVG) because it's evaluated before groups exist. HAVING can reference any aggregate function used in the query. The syntax is: SELECT ... FROM ... WHERE (row filter) GROUP BY ... HAVING (group filter). HAVING without GROUP BY treats the entire table as one group. You can use HAVING with complex conditions: HAVING COUNT(*) > 5 AND AVG(salary) > 50000. A common mistake is using HAVING when WHERE would suffice — if the condition doesn't involve an aggregate, use WHERE for better performance (it reduces rows before the expensive grouping step).",
      realLifeAnalogy:
        "Think of WHERE vs HAVING like organizing a sports tournament. WHERE is the entry requirement: 'only teams from Division A can enter.' HAVING is the advancement criteria after group stage: 'only groups with more than 2 wins advance to the next round.' WHERE filters before the tournament starts. HAVING filters after the results are in.",
      keyPoints: [
        "HAVING filters groups after GROUP BY aggregation",
        "WHERE filters rows before grouping, HAVING filters after",
        "HAVING can use aggregate functions; WHERE cannot",
        "Use WHERE for non-aggregate conditions (better performance)",
        "HAVING without GROUP BY treats the whole table as one group",
        "Can combine multiple conditions: HAVING COUNT(*) > 5 AND AVG(x) > 10",
        "Evaluated after GROUP BY but before SELECT",
        "Common pattern: HAVING COUNT(*) > 1 (find duplicates)",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== HAVING Clause =====

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  customer VARCHAR(100),
  category VARCHAR(50),
  amount NUMERIC(10, 2),
  tx_date DATE
);

INSERT INTO transactions (customer, category, amount, tx_date) VALUES
  ('Alice', 'Food', 45.00, '2024-01-05'),
  ('Alice', 'Electronics', 299.99, '2024-01-10'),
  ('Alice', 'Food', 32.50, '2024-01-15'),
  ('Bob', 'Food', 28.00, '2024-01-08'),
  ('Bob', 'Clothing', 150.00, '2024-01-20'),
  ('Carol', 'Food', 55.00, '2024-01-12'),
  ('Carol', 'Electronics', 899.99, '2024-01-25'),
  ('Carol', 'Food', 42.00, '2024-02-01'),
  ('Carol', 'Clothing', 75.00, '2024-02-05'),
  ('David', 'Food', 15.00, '2024-02-10');

-- 1. Customers who made more than 2 transactions
SELECT customer, COUNT(*) AS tx_count
FROM transactions
GROUP BY customer
HAVING COUNT(*) > 2
ORDER BY tx_count DESC;

-- 2. Categories with total spending over $100
SELECT category, SUM(amount) AS total_spent
FROM transactions
GROUP BY category
HAVING SUM(amount) > 100
ORDER BY total_spent DESC;

-- 3. WHERE + HAVING together
SELECT customer, SUM(amount) AS food_spending
FROM transactions
WHERE category = 'Food'        -- Row filter (before grouping)
GROUP BY customer
HAVING SUM(amount) > 50        -- Group filter (after grouping)
ORDER BY food_spending DESC;

-- 4. Find duplicate categories per customer
SELECT customer, category, COUNT(*) AS times
FROM transactions
GROUP BY customer, category
HAVING COUNT(*) > 1;

-- 5. Customers with high average transaction
SELECT
  customer,
  COUNT(*) AS transactions,
  ROUND(AVG(amount), 2) AS avg_amount,
  SUM(amount) AS total
FROM transactions
GROUP BY customer
HAVING AVG(amount) > 100;

-- 6. Multiple HAVING conditions
SELECT customer, COUNT(*) AS tx_count, SUM(amount) AS total
FROM transactions
GROUP BY customer
HAVING COUNT(*) >= 2 AND SUM(amount) > 200;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between WHERE and HAVING?",
        difficulty: "Easy",
        hint: "WHERE filters individual rows before grouping — it cannot use aggregate functions. HAVING filters groups after aggregation — it can use aggregate functions like COUNT, SUM, AVG. WHERE: 'only include rows where price > 10'. HAVING: 'only include groups where COUNT(*) > 5'.",
      },
      {
        question: "Can you use HAVING without GROUP BY?",
        difficulty: "Medium",
        hint: "Yes. Without GROUP BY, the entire table is treated as one group. HAVING then filters that single group. For example: SELECT COUNT(*) FROM orders HAVING COUNT(*) > 100 returns the count only if there are more than 100 orders, otherwise returns no rows. This is rarely useful compared to using an IF/CASE in application code.",
      },
      {
        question: "Why should you prefer WHERE over HAVING for non-aggregate conditions?",
        difficulty: "Hard",
        hint: "WHERE filters rows before grouping, reducing the number of rows that need to be grouped and aggregated. HAVING filters after grouping, so the database does the expensive grouping work on all rows first, then discards groups. For example, WHERE category = 'Electronics' is much faster than HAVING category = 'Electronics' because it reduces rows before the sort/hash for GROUP BY. HAVING with non-aggregate conditions works but wastes resources.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 43. Aggregations with Joins
  // ─────────────────────────────────────────────
  {
    id: "aggregations-with-joins",
    title: "Aggregations with Joins",
    slug: "aggregations-with-joins",
    icon: "GitCompare",
    difficulty: "Intermediate",
    description:
      "Learn how to combine JOIN and GROUP BY to compute aggregates across related tables — the foundation of SQL reporting.",
    concept: {
      explanation:
        "Combining JOINs with aggregate functions and GROUP BY is one of the most powerful SQL patterns. It lets you answer questions like 'total revenue per customer', 'average order size by category', or 'number of products per supplier'. The key challenge is understanding that JOINs happen before aggregation in the SQL execution order: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT. This means one-to-many JOINs can create duplicate rows that inflate aggregate results. For example, if an order has 3 items, joining orders with order_items triples each order row — COUNT(*) would count items, not orders. Use COUNT(DISTINCT orders.id) to count orders correctly. LEFT JOIN with aggregates is common for including entities with zero counts: COALESCE(COUNT(orders.id), 0). Always think about the join's cardinality (one-to-one, one-to-many, many-to-many) before writing aggregates.",
      realLifeAnalogy:
        "Aggregation with joins is like creating a company report by pulling data from different filing cabinets. You open the customers cabinet (first table), pull matching records from the orders cabinet (join), then calculate summaries: total orders per customer, average order value, etc. The tricky part is that one customer has many orders, so you need to be careful not to count the same customer multiple times when calculating averages.",
      keyPoints: [
        "JOINs happen before GROUP BY in execution order",
        "One-to-many joins multiply rows — watch for inflated counts",
        "Use COUNT(DISTINCT id) to avoid counting duplicates",
        "LEFT JOIN + COALESCE for zero-count entities",
        "GROUP BY should include all non-aggregated columns",
        "Subqueries can pre-aggregate before joining to avoid duplication",
        "Common pattern: dimension table JOIN fact table + GROUP BY",
        "Test with raw JOIN output before adding GROUP BY",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Aggregations with Joins =====

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  city VARCHAR(50)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  total NUMERIC(10, 2),
  order_date DATE
);

INSERT INTO customers (name, city) VALUES
  ('Alice', 'New York'),
  ('Bob', 'Chicago'),
  ('Carol', 'New York'),
  ('David', 'Boston');   -- No orders

INSERT INTO orders (customer_id, total, order_date) VALUES
  (1, 150.00, '2024-01-15'),
  (1, 250.00, '2024-02-20'),
  (1, 75.00, '2024-03-10'),
  (2, 300.00, '2024-01-25'),
  (2, 125.00, '2024-02-28'),
  (3, 500.00, '2024-03-01');

-- 1. Revenue per customer (INNER JOIN)
SELECT c.name, COUNT(o.id) AS orders, SUM(o.total) AS revenue
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.name
ORDER BY revenue DESC;

-- 2. Include customers with zero orders (LEFT JOIN)
SELECT
  c.name,
  COUNT(o.id) AS orders,
  COALESCE(SUM(o.total), 0) AS revenue
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.name
ORDER BY revenue DESC;

-- 3. Revenue by city
SELECT c.city, COUNT(o.id) AS orders, SUM(o.total) AS city_revenue
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.city
ORDER BY city_revenue DESC;

-- 4. Monthly revenue with customer breakdown
SELECT
  TO_CHAR(o.order_date, 'YYYY-MM') AS month,
  COUNT(DISTINCT c.id) AS unique_customers,
  COUNT(o.id) AS total_orders,
  SUM(o.total) AS revenue
FROM orders o
JOIN customers c ON o.customer_id = c.id
GROUP BY TO_CHAR(o.order_date, 'YYYY-MM')
ORDER BY month;

-- 5. Customers with above-average spending
SELECT c.name, SUM(o.total) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.name
HAVING SUM(o.total) > (SELECT AVG(total) FROM orders)
ORDER BY total_spent DESC;
`,
    },
    interviewQuestions: [
      {
        question: "Why might COUNT(*) give wrong results when using JOINs?",
        difficulty: "Easy",
        hint: "One-to-many JOINs multiply rows. If a customer has 3 orders, the JOIN creates 3 rows for that customer. COUNT(*) counts joined rows (3), not unique customers (1). Use COUNT(DISTINCT customer.id) to count customers correctly. Always check your raw JOIN output before adding aggregates.",
      },
      {
        question: "How do you include entities with zero counts in aggregate results?",
        difficulty: "Medium",
        hint: "Use LEFT JOIN + COALESCE. INNER JOIN excludes entities with no matches, so customers with no orders disappear. LEFT JOIN keeps them with NULLs for order columns. Use COALESCE(COUNT(orders.id), 0) and COALESCE(SUM(orders.total), 0) to show 0 instead of NULL. Note: use COUNT(orders.id), not COUNT(*), because COUNT(*) counts the NULL row as 1.",
      },
      {
        question: "How can you avoid double-counting when joining multiple one-to-many tables?",
        difficulty: "Hard",
        hint: "When joining a parent to two child tables (orders and reviews), the result is a Cartesian product of children: 3 orders × 2 reviews = 6 rows. SUM(order.total) sums each order 2 times! Solutions: 1) Pre-aggregate in subqueries and join the results. 2) Use COUNT(DISTINCT order.id) and SUM(DISTINCT ...) where possible. 3) Use LATERAL joins or correlated subqueries. 4) Aggregate each child table separately and join the summaries.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 44. Window Functions Basics
  // ─────────────────────────────────────────────
  {
    id: "window-functions-basics",
    title: "Window Functions Basics",
    slug: "window-functions-basics",
    icon: "LayoutDashboard",
    difficulty: "Intermediate",
    description:
      "Learn the fundamentals of window functions — perform calculations across related rows without collapsing them into groups.",
    concept: {
      explanation:
        "Window functions perform calculations across a set of rows related to the current row, without collapsing the rows like GROUP BY does. Every row retains its individual identity while also having access to aggregate-level information. The syntax uses the OVER() clause: function() OVER (PARTITION BY column ORDER BY column). PARTITION BY divides rows into partitions (similar to GROUP BY but without collapsing). ORDER BY within OVER specifies the logical order for window calculations. Key window functions include: ROW_NUMBER() (sequential numbering), RANK() and DENSE_RANK() (ranking with tie handling), LAG/LEAD (access previous/next row values), SUM/AVG/COUNT OVER (running or partitioned aggregates). Window functions are evaluated after WHERE, GROUP BY, and HAVING, but before ORDER BY and LIMIT. They are one of the most powerful features of SQL and enable analytics that would otherwise require complex subqueries or application code.",
      realLifeAnalogy:
        "Window functions are like a student seeing their exam results with context. Without window functions, you see: 'You scored 85'. With window functions, you see: 'You scored 85, ranked 3rd out of 30 students, 5 points above the class average, and 2 points higher than your last exam.' Each student still has their own row, but each row has access to information about other related rows — that's the 'window' you're looking through.",
      keyPoints: [
        "Calculate across related rows WITHOUT collapsing them",
        "OVER() clause defines the window: PARTITION BY + ORDER BY",
        "PARTITION BY divides rows into groups (like GROUP BY without collapsing)",
        "ROW_NUMBER(), RANK(), DENSE_RANK() for numbering/ranking",
        "LAG/LEAD access previous/next row values",
        "Aggregate functions (SUM, AVG, COUNT) work as window functions too",
        "Evaluated after GROUP BY/HAVING, before final ORDER BY",
        "Essential for running totals, rankings, and row comparisons",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Window Functions Basics =====

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  salesperson VARCHAR(100),
  region VARCHAR(50),
  amount NUMERIC(10, 2),
  sale_date DATE
);

INSERT INTO sales (salesperson, region, amount, sale_date) VALUES
  ('Alice', 'East', 500, '2024-01-10'),
  ('Bob', 'East', 300, '2024-01-15'),
  ('Alice', 'East', 700, '2024-02-05'),
  ('Carol', 'West', 450, '2024-01-20'),
  ('Bob', 'East', 600, '2024-02-10'),
  ('Carol', 'West', 800, '2024-02-15'),
  ('David', 'West', 350, '2024-01-25'),
  ('David', 'West', 550, '2024-02-20');

-- 1. ROW_NUMBER: Sequential numbering
SELECT
  salesperson, amount, sale_date,
  ROW_NUMBER() OVER (ORDER BY amount DESC) AS rank
FROM sales;

-- 2. RANK and DENSE_RANK within partitions
SELECT
  salesperson, region, amount,
  RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS region_rank
FROM sales;

-- 3. Running total
SELECT
  salesperson, amount, sale_date,
  SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM sales
ORDER BY sale_date;

-- 4. Running total per salesperson
SELECT
  salesperson, amount, sale_date,
  SUM(amount) OVER (PARTITION BY salesperson ORDER BY sale_date) AS person_running_total
FROM sales
ORDER BY salesperson, sale_date;

-- 5. LAG / LEAD: Compare with previous/next
SELECT
  salesperson, amount, sale_date,
  LAG(amount) OVER (ORDER BY sale_date) AS prev_amount,
  amount - LAG(amount) OVER (ORDER BY sale_date) AS change
FROM sales
ORDER BY sale_date;

-- 6. Each sale vs regional average (aggregate as window function)
SELECT
  salesperson, region, amount,
  ROUND(AVG(amount) OVER (PARTITION BY region), 2) AS region_avg,
  amount - ROUND(AVG(amount) OVER (PARTITION BY region), 2) AS vs_avg
FROM sales
ORDER BY region, amount DESC;

-- 7. Top sale per region using window function
SELECT * FROM (
  SELECT
    salesperson, region, amount,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount DESC) AS rn
  FROM sales
) ranked
WHERE rn = 1;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between GROUP BY and window functions?",
        difficulty: "Easy",
        hint: "GROUP BY collapses rows into one per group — individual rows disappear. Window functions keep all rows and add aggregate information to each one. With GROUP BY, 10 rows become 3 groups. With window functions, you still have 10 rows but each row knows about its group's total, rank, running sum, etc.",
      },
      {
        question: "What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?",
        difficulty: "Medium",
        hint: "For values [100, 90, 90, 80]: ROW_NUMBER gives 1,2,3,4 (no ties, arbitrary tiebreak). RANK gives 1,2,2,4 (ties get same rank, next rank skips). DENSE_RANK gives 1,2,2,3 (ties get same rank, next rank doesn't skip). Use ROW_NUMBER for unique numbering, RANK for competitive ranking, DENSE_RANK for dense ranking.",
      },
      {
        question: "How do LAG and LEAD work, and what are their common use cases?",
        difficulty: "Hard",
        hint: "LAG(column, n, default) accesses the value n rows before the current row. LEAD accesses n rows after. Default is returned when there's no previous/next row. Use cases: comparing sales to previous period (growth), finding gaps in sequences, detecting consecutive events, calculating time between events. LAG(amount, 1, 0) OVER (ORDER BY date) gives the previous amount (0 if first row).",
      },
    ],
  },
  // ── Level 6: Advanced Queries ──
  {
    id: "subqueries",
    title: "Subqueries",
    slug: "subqueries",
    icon: "Layers",
    difficulty: "Intermediate",
    concept: {
      explanation:
        "A subquery (also called an inner query or nested query) is a SQL query embedded inside another query. Subqueries can appear in SELECT, FROM, WHERE, and HAVING clauses. They run first, and their result is used by the outer query. Subqueries can return a single value (scalar), a single column, a single row, or a full table depending on context.",
      realLifeAnalogy:
        "Think of a subquery like asking a follow-up question. 'Who earns the most?' requires first answering 'What is the highest salary?' and then finding who has that salary. The inner question feeds into the outer one.",
      keyPoints: [
        "Subqueries execute before the outer query",
        "Scalar subqueries return a single value — usable anywhere a value is expected",
        "Table subqueries return a result set — used in FROM (as a derived table) or with IN/ANY/ALL",
        "Subqueries in WHERE filter rows based on another query's result",
        "Subqueries must be enclosed in parentheses",
        "Correlated subqueries reference the outer query (covered in the next topic)",
      ],
    },
    code: {
      defaultCode: `-- Sample data
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  budget NUMERIC(12,2)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department_id INT REFERENCES departments(id),
  salary NUMERIC(10,2),
  hire_date DATE
);

INSERT INTO departments VALUES
  (1, 'Engineering', 500000),
  (2, 'Marketing', 200000),
  (3, 'Sales', 300000),
  (4, 'HR', 150000);

INSERT INTO employees VALUES
  (1, 'Alice', 1, 95000, '2020-03-15'),
  (2, 'Bob', 1, 88000, '2021-06-01'),
  (3, 'Charlie', 2, 72000, '2019-11-20'),
  (4, 'Diana', 3, 68000, '2022-01-10'),
  (5, 'Eve', 1, 105000, '2018-07-22'),
  (6, 'Frank', 2, 75000, '2023-02-14'),
  (7, 'Grace', 3, 71000, '2021-09-05'),
  (8, 'Hank', 4, 62000, '2020-12-01');

-- 1. Scalar subquery in WHERE: employees earning above average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY salary DESC;

-- 2. Subquery with IN: employees in departments with budget > 250K
SELECT name, salary
FROM employees
WHERE department_id IN (
  SELECT id FROM departments WHERE budget > 250000
);

-- 3. Scalar subquery in SELECT: show each employee vs max salary
SELECT name, salary,
  (SELECT MAX(salary) FROM employees) AS max_salary,
  salary - (SELECT MAX(salary) FROM employees) AS diff_from_max
FROM employees
ORDER BY salary DESC;

-- 4. Derived table (subquery in FROM)
SELECT dept_name, avg_salary
FROM (
  SELECT d.name AS dept_name, AVG(e.salary) AS avg_salary
  FROM employees e
  JOIN departments d ON e.department_id = d.id
  GROUP BY d.name
) AS dept_averages
WHERE avg_salary > 70000;
`,
      language: "sql",
    },
    interviewQuestions: [
      {
        question: "Where can subqueries appear in a SQL statement?",
        difficulty: "Easy",
        hint: "Subqueries can appear in SELECT (scalar), FROM (derived table), WHERE (filtering with IN, =, >, etc.), HAVING (group filtering), INSERT INTO ... SELECT, and even in JOIN conditions. The placement determines what the subquery must return: scalar for SELECT/WHERE comparisons, table for FROM, list for IN.",
      },
      {
        question: "What is a derived table and when would you use one?",
        difficulty: "Medium",
        hint: "A derived table is a subquery in the FROM clause that acts as a temporary table. It must have an alias. Use it when you need to filter or join on aggregated results: SELECT * FROM (SELECT dept, AVG(salary) AS avg_sal FROM emp GROUP BY dept) AS t WHERE avg_sal > 70000. CTEs (WITH) are often preferred for readability.",
      },
      {
        question: "When should you use a subquery vs a JOIN, and what are the performance implications?",
        difficulty: "Hard",
        hint: "JOINs are generally preferred for combining related tables — the optimizer can choose hash/merge/nested-loop joins. Subqueries are better for existence checks (EXISTS), computing aggregates for filtering, or when the inner query is logically independent. Correlated subqueries run once per outer row (O(n*m)) while JOINs can be optimized. However, PostgreSQL's optimizer can often rewrite IN-subqueries as joins.",
      },
    ],
  },
  {
    id: "correlated-subqueries",
    title: "Correlated Subqueries",
    slug: "correlated-subqueries",
    icon: "RefreshCw",
    difficulty: "Advanced",
    concept: {
      explanation:
        "A correlated subquery is a subquery that references columns from the outer query. Unlike a regular subquery which runs once, a correlated subquery runs once for every row processed by the outer query. This makes them powerful for row-by-row comparisons but potentially slower on large datasets. They are essential for queries like 'find employees who earn more than their department average'.",
      realLifeAnalogy:
        "Imagine grading students in a class. For each student, you ask: 'Is this student above their own class average?' You must recalculate the average for each student's specific class — that per-row recalculation is exactly what a correlated subquery does.",
      keyPoints: [
        "References columns from the outer query — cannot run independently",
        "Executes once per row of the outer query",
        "Often used with EXISTS, NOT EXISTS, and comparison operators",
        "Can be less efficient than JOINs on large tables (but the optimizer may rewrite them)",
        "Essential for queries comparing a row to an aggregate of its own group",
        "Use table aliases to distinguish outer and inner query columns",
      ],
    },
    code: {
      defaultCode: `-- Sample data
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department_id INT REFERENCES departments(id),
  salary NUMERIC(10,2)
);

INSERT INTO departments VALUES
  (1, 'Engineering'), (2, 'Marketing'), (3, 'Sales');

INSERT INTO employees VALUES
  (1, 'Alice', 1, 95000),
  (2, 'Bob', 1, 88000),
  (3, 'Charlie', 2, 72000),
  (4, 'Diana', 3, 68000),
  (5, 'Eve', 1, 105000),
  (6, 'Frank', 2, 75000),
  (7, 'Grace', 3, 71000);

-- 1. Employees earning above their department average
SELECT e.name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
  SELECT AVG(e2.salary)
  FROM employees e2
  WHERE e2.department_id = e.department_id
);

-- 2. Correlated subquery in SELECT: department average per row
SELECT e.name, e.salary,
  (SELECT AVG(e2.salary)
   FROM employees e2
   WHERE e2.department_id = e.department_id) AS dept_avg
FROM employees e
ORDER BY e.department_id, e.salary DESC;

-- 3. Find the highest earner in each department
SELECT e.name, e.salary, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary = (
  SELECT MAX(e2.salary)
  FROM employees e2
  WHERE e2.department_id = e.department_id
);

-- 4. Equivalent using a JOIN (often more efficient)
SELECT e.name, e.salary, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id
JOIN (
  SELECT department_id, AVG(salary) AS avg_sal
  FROM employees GROUP BY department_id
) da ON e.department_id = da.department_id
WHERE e.salary > da.avg_sal;
`,
      language: "sql",
    },
    interviewQuestions: [
      {
        question: "How does a correlated subquery differ from a regular subquery?",
        difficulty: "Easy",
        hint: "A regular subquery is independent — it runs once and returns a fixed result. A correlated subquery references the outer query's columns, so it must re-execute for each outer row. Regular: WHERE salary > (SELECT AVG(salary) FROM emp). Correlated: WHERE salary > (SELECT AVG(salary) FROM emp e2 WHERE e2.dept_id = e.dept_id).",
      },
      {
        question: "Can a correlated subquery always be rewritten as a JOIN?",
        difficulty: "Medium",
        hint: "Most correlated subqueries can be rewritten as JOINs with derived tables or CTEs, and JOINs are often more efficient. However, some patterns (like EXISTS checks or complex per-row conditions) are more naturally expressed as correlated subqueries. PostgreSQL's optimizer can often transform IN/EXISTS subqueries into semi-joins automatically.",
      },
      {
        question: "What is the performance impact of correlated subqueries and how can you optimize them?",
        difficulty: "Hard",
        hint: "Correlated subqueries conceptually execute O(n) times (once per outer row), making them O(n*m) in the worst case. Optimization strategies: (1) Rewrite as JOIN with a derived table/CTE. (2) Use window functions instead (e.g., AVG() OVER(PARTITION BY dept_id)). (3) Ensure the inner query's WHERE columns are indexed. (4) PostgreSQL may automatically decorrelate simple subqueries into joins.",
      },
    ],
  },
  {
    id: "exists-operator",
    title: "EXISTS Operator",
    slug: "exists-operator",
    icon: "Search",
    difficulty: "Intermediate",
    concept: {
      explanation:
        "EXISTS is a boolean operator that tests whether a subquery returns any rows. It returns TRUE if the subquery produces at least one row, FALSE otherwise. EXISTS is typically used with correlated subqueries to check for the existence of related records. NOT EXISTS checks that no matching rows exist. EXISTS short-circuits — it stops as soon as the first matching row is found, making it very efficient.",
      realLifeAnalogy:
        "EXISTS is like checking if a store has an item in stock. You don't need to count every item — you just need to know: 'Is there at least one?' The moment you spot one on the shelf, you have your answer and can stop looking.",
      keyPoints: [
        "Returns TRUE if the subquery returns at least one row",
        "Short-circuits: stops checking after finding the first match",
        "NOT EXISTS returns TRUE when the subquery returns zero rows",
        "More efficient than IN for large datasets (stops at first match)",
        "The SELECT list in the subquery doesn't matter — SELECT 1 is conventional",
        "Commonly used for existence checks, anti-joins (NOT EXISTS), and semi-joins",
      ],
    },
    code: {
      defaultCode: `-- Sample data
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  amount NUMERIC(10,2),
  order_date DATE
);

INSERT INTO customers VALUES
  (1, 'Alice', 'alice@example.com'),
  (2, 'Bob', 'bob@example.com'),
  (3, 'Charlie', 'charlie@example.com'),
  (4, 'Diana', 'diana@example.com');

INSERT INTO orders VALUES
  (1, 1, 150.00, '2024-01-15'),
  (2, 1, 200.00, '2024-02-20'),
  (3, 2, 75.00, '2024-01-25'),
  (4, 3, 300.00, '2024-03-01');

-- 1. Customers who have placed at least one order (EXISTS)
SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- 2. Customers who have NOT placed any orders (NOT EXISTS)
SELECT c.name, c.email
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- 3. Customers with orders over $100
SELECT c.name
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id AND o.amount > 100
);

-- 4. EXISTS vs IN comparison
-- These are equivalent, but EXISTS can be faster on large tables:
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders);

SELECT name FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
`,
      language: "sql",
    },
    interviewQuestions: [
      {
        question: "What is the difference between EXISTS and IN?",
        difficulty: "Easy",
        hint: "IN checks if a value is in a list: WHERE id IN (1,2,3). EXISTS checks if a correlated subquery returns any rows. EXISTS short-circuits (stops at first match). IN must evaluate the full sublist. EXISTS handles NULLs better — NOT IN with NULLs in the list returns no rows, while NOT EXISTS works correctly. PostgreSQL often optimizes IN-subqueries into semi-joins similar to EXISTS.",
      },
      {
        question: "Why is SELECT 1 commonly used inside EXISTS subqueries?",
        difficulty: "Medium",
        hint: "EXISTS only checks whether any row is returned, not what columns or values are returned. SELECT 1, SELECT *, or SELECT column_name all work identically inside EXISTS. SELECT 1 is a convention that makes the intent clear: we only care about existence, not data. The optimizer ignores the SELECT list inside EXISTS anyway.",
      },
      {
        question: "How does NOT EXISTS differ from a LEFT JOIN ... WHERE IS NULL anti-join pattern?",
        difficulty: "Hard",
        hint: "Both find rows with no match. NOT EXISTS: SELECT * FROM A WHERE NOT EXISTS (SELECT 1 FROM B WHERE B.a_id = A.id). Anti-join: SELECT A.* FROM A LEFT JOIN B ON A.id = B.a_id WHERE B.a_id IS NULL. Both produce the same result. PostgreSQL typically generates the same plan (anti-join). LEFT JOIN anti-pattern can be slightly faster if the join column is indexed. NOT EXISTS is more readable for existence checks.",
      },
    ],
  },
  {
    id: "common-table-expressions",
    title: "Common Table Expressions (CTE)",
    slug: "common-table-expressions",
    icon: "GitBranch",
    difficulty: "Intermediate",
    concept: {
      explanation:
        "A Common Table Expression (CTE) is a temporary named result set defined with the WITH clause. CTEs exist only for the duration of a single query and can be referenced multiple times within that query. They improve readability by breaking complex queries into logical, named steps. PostgreSQL 12+ inlines CTEs by default (optimizes them like subqueries), though you can force materialization with MATERIALIZED.",
      realLifeAnalogy:
        "A CTE is like preparing ingredients before cooking. Instead of doing everything in one complex step, you chop vegetables (CTE 1), make the sauce (CTE 2), then combine them in the final dish (main query). Each preparation step has a name you can reference.",
      keyPoints: [
        "Defined with WITH ... AS (...) before the main query",
        "Creates a temporary named result set scoped to one statement",
        "Can reference other CTEs defined earlier in the same WITH clause",
        "Improves readability for complex multi-step queries",
        "PostgreSQL 12+ inlines CTEs by default (same performance as subqueries)",
        "Use MATERIALIZED/NOT MATERIALIZED to control optimization",
        "Can be used with SELECT, INSERT, UPDATE, DELETE",
      ],
    },
    code: {
      defaultCode: `-- Sample data
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department_id INT REFERENCES departments(id),
  salary NUMERIC(10,2),
  hire_date DATE
);

INSERT INTO departments VALUES
  (1, 'Engineering'), (2, 'Marketing'), (3, 'Sales');

INSERT INTO employees VALUES
  (1, 'Alice', 1, 95000, '2020-03-15'),
  (2, 'Bob', 1, 88000, '2021-06-01'),
  (3, 'Charlie', 2, 72000, '2019-11-20'),
  (4, 'Diana', 3, 68000, '2022-01-10'),
  (5, 'Eve', 1, 105000, '2018-07-22'),
  (6, 'Frank', 2, 75000, '2023-02-14'),
  (7, 'Grace', 3, 71000, '2021-09-05');

-- 1. Simple CTE: department averages
WITH dept_avg AS (
  SELECT department_id, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department_id
)
SELECT e.name, e.salary, da.avg_salary,
  e.salary - da.avg_salary AS diff
FROM employees e
JOIN dept_avg da ON e.department_id = da.department_id
ORDER BY diff DESC;

-- 2. Multiple CTEs chained together
WITH dept_stats AS (
  SELECT department_id,
    COUNT(*) AS emp_count,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary
  FROM employees
  GROUP BY department_id
),
large_depts AS (
  SELECT * FROM dept_stats WHERE emp_count >= 2
)
SELECT d.name, ld.emp_count, ld.avg_salary::INT, ld.max_salary
FROM large_depts ld
JOIN departments d ON ld.department_id = d.id;

-- 3. CTE used multiple times in one query
WITH avg_sal AS (
  SELECT AVG(salary) AS company_avg FROM employees
)
SELECT
  (SELECT COUNT(*) FROM employees, avg_sal WHERE salary > company_avg) AS above_avg,
  (SELECT COUNT(*) FROM employees, avg_sal WHERE salary <= company_avg) AS at_or_below;
`,
      language: "sql",
    },
    interviewQuestions: [
      {
        question: "What are the advantages of CTEs over subqueries?",
        difficulty: "Easy",
        hint: "CTEs improve readability by giving names to intermediate results. They can be referenced multiple times in the same query (a subquery would need to be duplicated). They make complex queries easier to debug (test each CTE independently). Since PostgreSQL 12, CTEs are inlined by default, so performance is equivalent to subqueries.",
      },
      {
        question: "What changed with CTE optimization in PostgreSQL 12?",
        difficulty: "Medium",
        hint: "Before PostgreSQL 12, CTEs were always materialized (computed once, stored in memory). This was an optimization fence — the planner couldn't push predicates into CTEs. Since PostgreSQL 12, non-recursive CTEs referenced once are inlined (treated like subqueries). Use MATERIALIZED to force old behavior (useful when the CTE is referenced multiple times). Use NOT MATERIALIZED to force inlining.",
      },
      {
        question: "Can CTEs be used with DML statements (INSERT, UPDATE, DELETE)?",
        difficulty: "Hard",
        hint: "Yes. Writable CTEs can contain INSERT, UPDATE, or DELETE with RETURNING. Example: WITH deleted AS (DELETE FROM orders WHERE status = 'cancelled' RETURNING *) SELECT COUNT(*) FROM deleted. You can chain DML: WITH ins AS (INSERT INTO archive SELECT * FROM orders WHERE old RETURNING id) DELETE FROM orders WHERE id IN (SELECT id FROM ins). All CTEs in a writable CTE execute in the same snapshot.",
      },
    ],
  },
  {
    id: "recursive-cte",
    title: "Recursive CTE",
    slug: "recursive-cte",
    icon: "RotateCw",
    difficulty: "Advanced",
    concept: {
      explanation:
        "A recursive CTE uses WITH RECURSIVE to define a query that references itself. It has two parts: the base case (anchor member) that provides the starting rows, and the recursive case that references the CTE name to build upon previous results. Execution alternates between the two until the recursive case returns no new rows. Recursive CTEs are essential for querying hierarchical data like org charts, category trees, and graph traversal.",
      realLifeAnalogy:
        "Imagine tracing a family tree. You start with yourself (base case). Then for each person found, you look up their children (recursive step). You repeat until there are no more descendants to find. Each generation builds on the previous one.",
      keyPoints: [
        "Uses WITH RECURSIVE keyword",
        "Base case (anchor): non-recursive SELECT that provides starting rows",
        "Recursive case: SELECT that references the CTE name, joined to source data",
        "Connected by UNION ALL (keeps duplicates) or UNION (removes duplicates)",
        "Terminates when the recursive case returns no new rows",
        "Essential for hierarchical data: trees, graphs, org charts",
        "Add a depth counter and LIMIT to prevent infinite loops",
      ],
    },
    code: {
      defaultCode: `-- Sample data: employee hierarchy
CREATE TABLE org (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  manager_id INT REFERENCES org(id),
  title VARCHAR(100)
);

INSERT INTO org VALUES
  (1, 'Alice', NULL, 'CEO'),
  (2, 'Bob', 1, 'VP Engineering'),
  (3, 'Charlie', 1, 'VP Marketing'),
  (4, 'Diana', 2, 'Senior Engineer'),
  (5, 'Eve', 2, 'Senior Engineer'),
  (6, 'Frank', 3, 'Marketing Manager'),
  (7, 'Grace', 4, 'Junior Engineer'),
  (8, 'Hank', 4, 'Junior Engineer');

-- 1. Full org chart with depth
WITH RECURSIVE org_tree AS (
  -- Base case: CEO (no manager)
  SELECT id, name, title, manager_id, 0 AS depth,
    name::TEXT AS path
  FROM org WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: find reports
  SELECT o.id, o.name, o.title, o.manager_id, ot.depth + 1,
    ot.path || ' > ' || o.name
  FROM org o
  JOIN org_tree ot ON o.manager_id = ot.id
)
SELECT depth, REPEAT('  ', depth) || name AS org_chart, title, path
FROM org_tree
ORDER BY path;

-- 2. Find all reports under Bob
WITH RECURSIVE reports AS (
  SELECT id, name, title, 0 AS level
  FROM org WHERE name = 'Bob'

  UNION ALL

  SELECT o.id, o.name, o.title, r.level + 1
  FROM org o
  JOIN reports r ON o.manager_id = r.id
)
SELECT REPEAT('  ', level) || name AS employee, title, level
FROM reports;

-- 3. Number sequence (simple recursive example)
WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 10
)
SELECT n FROM nums;
`,
      language: "sql",
    },
    interviewQuestions: [
      {
        question: "What are the two parts of a recursive CTE?",
        difficulty: "Easy",
        hint: "The anchor member (base case) is a non-recursive SELECT that provides starting rows. The recursive member references the CTE name and builds on previous results. They are connected by UNION ALL. Execution: run anchor, then repeatedly run recursive member using previous iteration's results until no new rows are produced.",
      },
      {
        question: "How do you prevent infinite recursion in a recursive CTE?",
        difficulty: "Medium",
        hint: "Strategies: (1) Add a depth/level counter and filter with WHERE depth < max_depth. (2) Track visited nodes in a path array and check for cycles: WHERE NOT (node_id = ANY(visited_path)). (3) Use UNION instead of UNION ALL to eliminate duplicate rows. (4) PostgreSQL has a max recursion limit (default: none, but you can use LIMIT in the outer query). (5) Ensure the recursive condition eventually returns no rows.",
      },
      {
        question: "How would you model and query a bill of materials (BOM) using recursive CTEs?",
        difficulty: "Hard",
        hint: "BOM table: part_id, sub_part_id, quantity. Recursive CTE starts with the top-level product, then recursively finds all sub-parts, multiplying quantities at each level. WITH RECURSIVE bom_tree AS (SELECT part_id, sub_part_id, quantity, 1 AS depth FROM bom WHERE part_id = 'product_x' UNION ALL SELECT b.part_id, b.sub_part_id, b.quantity * bt.quantity, bt.depth + 1 FROM bom b JOIN bom_tree bt ON b.part_id = bt.sub_part_id) SELECT * FROM bom_tree. The quantity multiplication is the key insight.",
      },
    ],
  },
  {
    id: "union-and-union-all",
    title: "UNION and UNION ALL",
    slug: "union-and-union-all",
    icon: "Merge",
    difficulty: "Intermediate",
    concept: {
      explanation:
        "UNION combines the result sets of two or more SELECT statements vertically (stacking rows). UNION removes duplicate rows from the combined result, while UNION ALL keeps all rows including duplicates. Both require that the SELECT statements have the same number of columns with compatible data types. UNION ALL is faster because it skips the deduplication step.",
      realLifeAnalogy:
        "UNION is like merging two guest lists for a party. UNION removes anyone who appears on both lists (no duplicate invitations). UNION ALL combines both lists as-is, so someone on both lists gets two invitations. UNION ALL is faster because you just staple the lists together without checking for overlaps.",
      keyPoints: [
        "Combines result sets vertically (adds rows, not columns)",
        "UNION removes duplicate rows; UNION ALL keeps all rows",
        "All SELECT statements must have the same number of columns",
        "Column types must be compatible (implicitly castable)",
        "Column names come from the first SELECT statement",
        "UNION ALL is faster — use it when duplicates are acceptable or impossible",
        "ORDER BY applies to the final combined result (place at the end)",
      ],
    },
    code: {
      defaultCode: `-- Sample data
CREATE TABLE current_employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  salary NUMERIC(10,2)
);

CREATE TABLE former_employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  last_salary NUMERIC(10,2),
  left_date DATE
);

INSERT INTO current_employees VALUES
  (1, 'Alice', 'Engineering', 95000),
  (2, 'Bob', 'Marketing', 72000),
  (3, 'Charlie', 'Engineering', 88000),
  (4, 'Diana', 'Sales', 68000);

INSERT INTO former_employees VALUES
  (1, 'Eve', 'Engineering', 91000, '2023-06-15'),
  (2, 'Frank', 'Marketing', 72000, '2023-01-20'),
  (3, 'Bob', 'Marketing', 72000, '2022-12-31');

-- 1. UNION: all unique people (Bob appears once)
SELECT name, department, salary FROM current_employees
UNION
SELECT name, department, last_salary FROM former_employees
ORDER BY name;

-- 2. UNION ALL: all rows including duplicates (Bob appears twice)
SELECT name, department, salary FROM current_employees
UNION ALL
SELECT name, department, last_salary FROM former_employees
ORDER BY name;

-- 3. Add a source label to distinguish origin
SELECT name, department, salary, 'Current' AS status
FROM current_employees
UNION ALL
SELECT name, department, last_salary, 'Former'
FROM former_employees
ORDER BY name;

-- 4. UNION with different column types (compatible)
SELECT name, salary::TEXT AS info FROM current_employees
UNION
SELECT name, left_date::TEXT FROM former_employees;
`,
      language: "sql",
    },
    interviewQuestions: [
      {
        question: "What is the difference between UNION and UNION ALL?",
        difficulty: "Easy",
        hint: "UNION removes duplicate rows from the combined result (performs a DISTINCT operation). UNION ALL keeps all rows, including duplicates. UNION ALL is faster because it skips deduplication. Use UNION ALL when you know there are no duplicates or when duplicates are acceptable. Example: combining current and former employees — if Bob appears in both tables, UNION returns him once, UNION ALL returns him twice.",
      },
      {
        question: "Can you use ORDER BY with UNION, and if so, where does it go?",
        difficulty: "Medium",
        hint: "ORDER BY goes at the very end, after the last SELECT. It applies to the entire combined result, not individual queries. You can ORDER BY column position (ORDER BY 1) or by column names from the first SELECT. To sort individual queries before combining, wrap them in subqueries: SELECT * FROM (SELECT ... ORDER BY ... LIMIT 5) UNION ALL SELECT * FROM (SELECT ... ORDER BY ... LIMIT 5).",
      },
      {
        question: "How does PostgreSQL handle type compatibility in UNION and what are the performance implications of UNION vs UNION ALL?",
        difficulty: "Hard",
        hint: "Type compatibility: PostgreSQL uses type resolution rules to find a common type. INT and BIGINT resolve to BIGINT. VARCHAR and TEXT resolve to TEXT. Incompatible types (e.g., INT and DATE) cause errors. Performance: UNION must sort or hash the combined result for deduplication (O(n log n)). UNION ALL just concatenates (O(n)). For large result sets, UNION ALL can be significantly faster. If you need deduplication, ensure columns used for comparison are indexed or consider using UNION ALL with a separate DISTINCT.",
      },
    ],
  },
  {
    id: "intersect-operator",
    title: "INTERSECT",
    slug: "intersect-operator",
    icon: "GitCompare",
    difficulty: "Intermediate",
    concept: {
      explanation:
        "INTERSECT returns only the rows that appear in both result sets. Like UNION, it requires compatible column counts and types. INTERSECT removes duplicates by default. INTERSECT ALL preserves duplicates based on the minimum count in either set. INTERSECT is useful for finding commonalities between two queries.",
      realLifeAnalogy:
        "INTERSECT is like finding the overlap in a Venn diagram. If you have a list of people who like coffee and a list of people who like tea, INTERSECT gives you the people who like both. Only the shared entries survive.",
      keyPoints: [
        "Returns rows common to both result sets",
        "Removes duplicates by default (like UNION)",
        "INTERSECT ALL keeps duplicates based on minimum occurrence count",
        "Requires same column count and compatible types",
        "Less common than UNION but useful for finding overlap",
        "Can often be rewritten as an INNER JOIN or EXISTS",
        "Evaluated after UNION but before ORDER BY in precedence",
      ],
    },
    code: {
      defaultCode: `-- Sample data
CREATE TABLE students_math (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  grade CHAR(1)
);

CREATE TABLE students_science (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  grade CHAR(1)
);

INSERT INTO students_math VALUES
  (1, 'Alice', 'A'),
  (2, 'Bob', 'B'),
  (3, 'Charlie', 'A'),
  (4, 'Diana', 'C'),
  (5, 'Eve', 'B');

INSERT INTO students_science VALUES
  (1, 'Alice', 'A'),
  (2, 'Bob', 'A'),
  (3, 'Frank', 'B'),
  (4, 'Diana', 'C'),
  (5, 'Grace', 'A');

-- 1. Students in both Math AND Science (by name only)
SELECT name FROM students_math
INTERSECT
SELECT name FROM students_science
ORDER BY name;

-- 2. Students with SAME name AND grade in both classes
SELECT name, grade FROM students_math
INTERSECT
SELECT name, grade FROM students_science;

-- 3. Compare INTERSECT vs INNER JOIN
-- INTERSECT:
SELECT name FROM students_math
INTERSECT
SELECT name FROM students_science;

-- Equivalent JOIN:
SELECT DISTINCT sm.name
FROM students_math sm
JOIN students_science ss ON sm.name = ss.name;

-- 4. INTERSECT ALL example
SELECT name FROM students_math
INTERSECT ALL
SELECT name FROM students_science;
`,
      language: "sql",
    },
    interviewQuestions: [
      {
        question: "What does INTERSECT return?",
        difficulty: "Easy",
        hint: "INTERSECT returns only the rows that exist in both result sets. If Query A returns {Alice, Bob, Charlie} and Query B returns {Alice, Charlie, Diana}, INTERSECT returns {Alice, Charlie}. It removes duplicates by default. Both queries must have the same number of columns with compatible types.",
      },
      {
        question: "How can INTERSECT be rewritten using JOINs or EXISTS?",
        difficulty: "Medium",
        hint: "INTERSECT can be rewritten as: (1) INNER JOIN with DISTINCT: SELECT DISTINCT a.* FROM query_a a JOIN query_b b ON a.col1 = b.col1 AND a.col2 = b.col2. (2) EXISTS: SELECT * FROM query_a a WHERE EXISTS (SELECT 1 FROM query_b b WHERE a.col1 = b.col1). The JOIN/EXISTS form gives you more control (e.g., matching on specific columns rather than all columns).",
      },
      {
        question: "What is the difference between INTERSECT and INTERSECT ALL, and what is the operator precedence among set operators?",
        difficulty: "Hard",
        hint: "INTERSECT removes duplicates; INTERSECT ALL preserves them based on minimum count. If A has 'Alice' 3 times and B has 'Alice' 2 times, INTERSECT returns 'Alice' once, INTERSECT ALL returns it twice. Precedence: INTERSECT binds tighter than UNION/EXCEPT. So A UNION B INTERSECT C is parsed as A UNION (B INTERSECT C). Use parentheses to override. This matches the SQL standard.",
      },
    ],
  },
  {
    id: "except-operator",
    title: "EXCEPT",
    slug: "except-operator",
    icon: "Filter",
    difficulty: "Intermediate",
    concept: {
      explanation:
        "EXCEPT returns rows from the first query that do not appear in the second query. It is the set difference operation. EXCEPT removes duplicates by default, while EXCEPT ALL preserves them based on occurrence count. EXCEPT is ideal for finding what exists in one set but not another — like finding customers who haven't placed orders or identifying missing records.",
      realLifeAnalogy:
        "EXCEPT is like comparing two lists and crossing off matching items. If your shopping list has [milk, bread, eggs, butter] and the fridge has [milk, eggs], EXCEPT gives you what you still need to buy: [bread, butter]. Order matters — the first list minus the second.",
      keyPoints: [
        "Returns rows in the first result set that are NOT in the second",
        "Order matters: A EXCEPT B is different from B EXCEPT A",
        "Removes duplicates by default; EXCEPT ALL keeps duplicates by count",
        "Equivalent to NOT EXISTS or LEFT JOIN ... WHERE IS NULL",
        "Requires same column count and compatible types",
        "Useful for finding missing records, differences between datasets",
        "Lower precedence than INTERSECT in set operator evaluation",
      ],
    },
    code: {
      defaultCode: `-- Sample data
CREATE TABLE all_products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  price NUMERIC(8,2)
);

CREATE TABLE discontinued_products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  discontinued_date DATE
);

INSERT INTO all_products VALUES
  (1, 'Laptop', 'Electronics', 999.99),
  (2, 'Mouse', 'Electronics', 29.99),
  (3, 'Desk', 'Furniture', 249.99),
  (4, 'Chair', 'Furniture', 199.99),
  (5, 'Monitor', 'Electronics', 399.99),
  (6, 'Keyboard', 'Electronics', 79.99);

INSERT INTO discontinued_products VALUES
  (1, 'Mouse', 'Electronics', '2023-06-01'),
  (2, 'Chair', 'Furniture', '2023-09-15');

-- 1. Products still available (not discontinued)
SELECT name, category FROM all_products
EXCEPT
SELECT name, category FROM discontinued_products
ORDER BY name;

-- 2. Discontinued items not in current catalog (reverse direction)
SELECT name, category FROM discontinued_products
EXCEPT
SELECT name, category FROM all_products;

-- 3. Compare EXCEPT vs NOT EXISTS
-- EXCEPT:
SELECT name FROM all_products
EXCEPT
SELECT name FROM discontinued_products;

-- Equivalent NOT EXISTS:
SELECT DISTINCT ap.name
FROM all_products ap
WHERE NOT EXISTS (
  SELECT 1 FROM discontinued_products dp
  WHERE dp.name = ap.name
);

-- 4. EXCEPT ALL example
-- If a product appears multiple times, EXCEPT ALL subtracts counts
SELECT name FROM (
  VALUES ('Apple'), ('Apple'), ('Banana'), ('Cherry')
) AS fruits(name)
EXCEPT ALL
SELECT name FROM (
  VALUES ('Apple'), ('Banana')
) AS eaten(name);
`,
      language: "sql",
    },
    interviewQuestions: [
      {
        question: "What does EXCEPT return and does order matter?",
        difficulty: "Easy",
        hint: "EXCEPT returns rows from the first query that don't appear in the second query. Order matters: A EXCEPT B gives rows in A but not in B. B EXCEPT A gives rows in B but not in A. These are usually different results. Think of it as set subtraction: A - B. Duplicates are removed by default.",
      },
      {
        question: "How can EXCEPT be rewritten without using set operators?",
        difficulty: "Medium",
        hint: "EXCEPT can be rewritten as: (1) NOT EXISTS: SELECT * FROM A WHERE NOT EXISTS (SELECT 1 FROM B WHERE A.col = B.col). (2) LEFT JOIN anti-pattern: SELECT A.* FROM A LEFT JOIN B ON A.col = B.col WHERE B.col IS NULL. (3) NOT IN: SELECT * FROM A WHERE col NOT IN (SELECT col FROM B) — but beware of NULLs with NOT IN. All three produce equivalent results, but NOT EXISTS and LEFT JOIN handle NULLs correctly.",
      },
      {
        question: "What is the difference between EXCEPT and EXCEPT ALL, and how does NULL handling work with EXCEPT?",
        difficulty: "Hard",
        hint: "EXCEPT removes duplicates; EXCEPT ALL subtracts by count. If A has 'X' 3 times and B has 'X' 1 time: EXCEPT returns nothing (X exists in B), EXCEPT ALL returns 'X' twice (3-1=2). NULL handling: EXCEPT treats NULLs as equal for comparison purposes (unlike regular = where NULL != NULL). So (NULL, 1) EXCEPT (NULL, 1) returns no rows because the rows are considered identical. This follows the SQL standard's treatment of NULLs in set operations.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Level 7: Indexes and Performance
  // ─────────────────────────────────────────────

  // 1. What is an Index
  {
    id: "what-is-an-index",
    title: "What is an Index",
    slug: "what-is-an-index",
    icon: "BookOpen",
    difficulty: "Intermediate",
    description:
      "Understand what database indexes are, how they speed up queries, and the trade-offs involved in using them.",
    concept: {
      explanation:
        "An index in PostgreSQL is a separate data structure that maintains a sorted reference to rows in a table, enabling the database to find data without scanning every row. Without an index, PostgreSQL performs a sequential scan — reading every row in the table to find matching results. With an index, PostgreSQL can jump directly to the relevant rows, similar to using the index at the back of a book. Indexes are created on one or more columns of a table. While they dramatically speed up SELECT queries and WHERE clause filtering, they come with trade-offs: indexes consume additional disk space, and they slow down INSERT, UPDATE, and DELETE operations because the index must be updated alongside the table data. PostgreSQL automatically creates indexes on primary key and unique constraint columns.",
      realLifeAnalogy:
        "Imagine a library with 100,000 books. Without an index (catalog system), finding a specific book means walking through every shelf and checking each book — this is a sequential scan. With a card catalog (index), you look up the book's location and go directly to the right shelf. The catalog takes up space and must be updated when books are added or removed, but it makes finding books incredibly fast.",
      keyPoints: [
        "An index is a separate data structure that speeds up data retrieval",
        "Without an index, PostgreSQL performs a sequential scan (reads every row)",
        "With an index, PostgreSQL can jump directly to matching rows",
        "Indexes are automatically created on PRIMARY KEY and UNIQUE columns",
        "Indexes consume additional disk space",
        "INSERT, UPDATE, DELETE operations are slower with more indexes",
        "The query planner decides whether to use an index based on cost estimation",
        "Too many indexes can hurt write performance — index strategically",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== What is an Index =====

-- Create a sample table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  salary NUMERIC(10,2),
  hire_date DATE
);

-- Insert sample data
INSERT INTO employees (name, department, salary, hire_date)
SELECT
  'Employee_' || i,
  CASE (i % 4)
    WHEN 0 THEN 'Engineering'
    WHEN 1 THEN 'Marketing'
    WHEN 2 THEN 'Sales'
    WHEN 3 THEN 'HR'
  END,
  30000 + (random() * 70000)::INT,
  DATE '2020-01-01' + (random() * 1500)::INT
FROM generate_series(1, 1000) AS i;

-- 1. Without an index — sequential scan
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';

-- 2. Create an index on department
CREATE INDEX idx_employees_department ON employees(department);

-- 3. With an index — index scan
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';

-- 4. Check existing indexes on a table
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'employees';

-- 5. Check index size
SELECT pg_size_pretty(pg_relation_size('idx_employees_department')) AS index_size;
`,
    },
    interviewQuestions: [
      {
        question: "What is a database index and why is it used?",
        difficulty: "Easy",
        hint: "A database index is a data structure (like a B-tree) that stores a sorted reference to table rows based on specific columns. It allows the database to find rows without scanning the entire table. Think of it like a book's index — instead of reading every page, you look up the topic and jump to the right page. Indexes speed up SELECT queries but add overhead to writes.",
      },
      {
        question: "When should you NOT create an index?",
        difficulty: "Medium",
        hint: "Avoid indexes on: (1) Small tables — sequential scan is faster. (2) Columns rarely used in WHERE/JOIN/ORDER BY. (3) Columns with low cardinality (few distinct values like boolean). (4) Tables with heavy write workloads where index maintenance overhead outweighs read benefits. (5) Wide columns (long text) — consider partial or expression indexes instead.",
      },
      {
        question: "How does PostgreSQL decide whether to use an index or a sequential scan?",
        difficulty: "Hard",
        hint: "PostgreSQL's query planner estimates the cost of different execution strategies. It considers: table size, index selectivity (what percentage of rows match), correlation between physical row order and index order, available memory (work_mem), and whether the query returns a small or large fraction of the table. If an index scan would read more than ~5-10% of the table, a sequential scan is often cheaper because sequential I/O is faster than random I/O.",
      },
    ],
  },

  // 2. Creating Indexes
  {
    id: "creating-indexes",
    title: "Creating Indexes",
    slug: "creating-indexes",
    icon: "PlusCircle",
    difficulty: "Intermediate",
    description:
      "Learn the syntax and options for creating, dropping, and managing indexes in PostgreSQL.",
    concept: {
      explanation:
        "Creating an index in PostgreSQL uses the CREATE INDEX statement. You specify the index name, the table, and the column(s) to index. PostgreSQL supports several options: UNIQUE indexes enforce uniqueness, CONCURRENTLY allows creating indexes without locking the table for writes, IF NOT EXISTS prevents errors if the index already exists, and you can specify the index method (btree, hash, gin, gist). You can also create indexes on expressions rather than just columns. Dropping an index uses DROP INDEX. The CREATE INDEX operation locks the table against writes by default, so for production databases, CREATE INDEX CONCURRENTLY is preferred even though it takes longer.",
      realLifeAnalogy:
        "Creating an index is like building a new filing system for an existing filing cabinet. You go through all the folders (existing data), create reference cards sorted by the new criteria, and file them in a separate index drawer. While building, you might need to restrict access to the cabinet (table lock). The CONCURRENTLY option is like building the index while people continue using the cabinet — slower to build but no disruption.",
      keyPoints: [
        "CREATE INDEX idx_name ON table(column) creates a basic index",
        "CREATE UNIQUE INDEX enforces uniqueness on the indexed columns",
        "CREATE INDEX CONCURRENTLY avoids locking the table during creation",
        "DROP INDEX removes an index; DROP INDEX CONCURRENTLY for no-lock drops",
        "IF NOT EXISTS prevents errors when the index already exists",
        "Expression indexes: CREATE INDEX ON table(LOWER(column))",
        "REINDEX rebuilds a corrupted or bloated index",
        "Index names should be descriptive: idx_tablename_columnname",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Creating Indexes =====

-- Create sample table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  category VARCHAR(50),
  price NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

INSERT INTO products (name, category, price, is_active)
SELECT
  'Product_' || i,
  CASE (i % 5)
    WHEN 0 THEN 'Electronics'
    WHEN 1 THEN 'Clothing'
    WHEN 2 THEN 'Books'
    WHEN 3 THEN 'Food'
    WHEN 4 THEN 'Toys'
  END,
  (random() * 500 + 5)::NUMERIC(10,2),
  (random() > 0.2)
FROM generate_series(1, 500) AS i;

-- 1. Basic index creation
CREATE INDEX idx_products_category ON products(category);

-- 2. Unique index
CREATE UNIQUE INDEX idx_products_name ON products(name);

-- 3. Expression index (for case-insensitive search)
CREATE INDEX idx_products_name_lower ON products(LOWER(name));

-- 4. Multi-column index
CREATE INDEX idx_products_category_price ON products(category, price);

-- 5. Check all indexes on the table
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'products'
ORDER BY indexname;

-- 6. Drop an index
DROP INDEX IF EXISTS idx_products_name_lower;

-- 7. Verify the index was dropped
SELECT indexname FROM pg_indexes WHERE tablename = 'products';

-- 8. REINDEX a specific index
REINDEX INDEX idx_products_category;
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between CREATE INDEX and CREATE INDEX CONCURRENTLY?",
        difficulty: "Easy",
        hint: "CREATE INDEX locks the table against writes (INSERT, UPDATE, DELETE) during index creation. CREATE INDEX CONCURRENTLY builds the index without holding a lock, so the table remains fully writable. However, CONCURRENTLY takes longer, cannot run inside a transaction, and may fail if there are concurrent schema changes. Use CONCURRENTLY in production to avoid downtime.",
      },
      {
        question: "What is an expression index and when would you use one?",
        difficulty: "Medium",
        hint: "An expression index indexes the result of a function or expression rather than a raw column value. Example: CREATE INDEX idx_lower_email ON users(LOWER(email)) indexes lowercase emails. This is useful when queries always apply a function: WHERE LOWER(email) = 'user@example.com'. Without the expression index, PostgreSQL can't use a regular index on email because the function transforms the value. Common uses: LOWER() for case-insensitive search, DATE() for timestamp columns, and computed values.",
      },
      {
        question: "What happens to indexes during bulk data loading, and how can you optimize it?",
        difficulty: "Hard",
        hint: "During bulk inserts, each row insertion updates every index on the table, which is very slow. Optimization strategies: (1) Drop indexes before bulk load, reload, then recreate them — building an index from scratch is faster than incremental updates. (2) Use COPY instead of INSERT for bulk loading. (3) Increase maintenance_work_mem before creating indexes. (4) Disable autovacuum temporarily during load. (5) For initial data loads, create indexes after inserting data. The overhead is roughly O(n log n) for index creation vs O(n * m) for incremental updates where m is the number of indexes.",
      },
    ],
  },

  // 3. B-tree Index
  {
    id: "btree-index",
    title: "B-tree Index",
    slug: "btree-index",
    icon: "GitBranch",
    difficulty: "Intermediate",
    description:
      "Learn about B-tree indexes, PostgreSQL's default index type, and how they support equality and range queries efficiently.",
    concept: {
      explanation:
        "B-tree (balanced tree) is PostgreSQL's default index type and the most commonly used. A B-tree organizes data in a sorted, hierarchical tree structure with a root node, internal nodes, and leaf nodes. The tree is always balanced — every leaf node is at the same depth, ensuring consistent lookup performance. B-tree indexes support equality operators (=), range operators (<, >, <=, >=, BETWEEN), sorting (ORDER BY), and pattern matching with anchored LIKE ('abc%'). Each leaf node contains index entries pointing to the actual table rows (via tuple IDs). B-tree indexes are ideal for columns frequently used in WHERE clauses with comparisons, ORDER BY clauses, and JOIN conditions. The lookup time is O(log n), making them efficient even for very large tables.",
      realLifeAnalogy:
        "A B-tree is like a decision tree at a postal sorting facility. A letter arrives and at the first station (root node), the sorter checks the state and sends it left or right. At the next station (internal node), they check the city. At the final station (leaf node), they identify the exact street and mailbox. No matter which letter comes in, it always passes through the same number of stations because the tree is balanced — ensuring consistently fast sorting.",
      keyPoints: [
        "B-tree is the default index type in PostgreSQL (used when no type is specified)",
        "Data is stored in a sorted, balanced tree structure",
        "Supports: =, <, >, <=, >=, BETWEEN, IN, IS NULL, ORDER BY",
        "Also supports LIKE with anchored patterns (e.g., 'abc%' but not '%abc')",
        "Lookup time is O(log n) regardless of table size",
        "Leaf nodes store pointers (TIDs) to actual table rows",
        "The tree is self-balancing — insertions and deletions maintain balance",
        "Best for high-cardinality columns (many distinct values)",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== B-tree Index =====

-- Create sample table
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(200),
  age INT,
  city VARCHAR(50),
  signup_date DATE
);

INSERT INTO customers (name, email, age, city, signup_date)
SELECT
  'Customer_' || i,
  'customer' || i || '@example.com',
  18 + (random() * 50)::INT,
  CASE (i % 6)
    WHEN 0 THEN 'New York'
    WHEN 1 THEN 'London'
    WHEN 2 THEN 'Tokyo'
    WHEN 3 THEN 'Paris'
    WHEN 4 THEN 'Sydney'
    WHEN 5 THEN 'Berlin'
  END,
  DATE '2020-01-01' + (random() * 1500)::INT
FROM generate_series(1, 1000) AS i;

-- 1. Create a B-tree index (default type)
CREATE INDEX idx_customers_age ON customers(age);

-- 2. Equality query — uses B-tree
EXPLAIN SELECT * FROM customers WHERE age = 30;

-- 3. Range query — uses B-tree
EXPLAIN SELECT * FROM customers WHERE age BETWEEN 25 AND 35;

-- 4. Sorting — B-tree supports ORDER BY
EXPLAIN SELECT * FROM customers WHERE age > 40 ORDER BY age;

-- 5. LIKE with anchored pattern — uses B-tree
CREATE INDEX idx_customers_name ON customers(name);
EXPLAIN SELECT * FROM customers WHERE name LIKE 'Customer_1%';

-- 6. LIKE with leading wildcard — CANNOT use B-tree
EXPLAIN SELECT * FROM customers WHERE name LIKE '%mer_10';

-- 7. Multiple conditions with B-tree
EXPLAIN SELECT * FROM customers WHERE age >= 25 AND age <= 45;
`,
    },
    interviewQuestions: [
      {
        question: "What is a B-tree index and what operations does it support?",
        difficulty: "Easy",
        hint: "A B-tree index is a balanced tree data structure that keeps data sorted. It supports: equality (=), range comparisons (<, >, <=, >=, BETWEEN), sorting (ORDER BY), and anchored LIKE patterns ('abc%'). It's PostgreSQL's default index type. The balanced nature ensures O(log n) lookups. It does NOT efficiently support leading wildcard LIKE '%abc' because the tree is sorted by the beginning of the value.",
      },
      {
        question: "How does a B-tree maintain balance and what is its time complexity?",
        difficulty: "Medium",
        hint: "A B-tree maintains balance by splitting nodes when they become full and merging when they become too empty. When inserting into a full node, it splits into two nodes and pushes the middle key up to the parent. This ensures all leaf nodes remain at the same depth. Time complexity: Search is O(log n), Insert is O(log n), Delete is O(log n). The branching factor (number of keys per node) is typically large (hundreds), keeping the tree shallow — even billions of rows require only 3-4 levels.",
      },
      {
        question: "When would a B-tree index NOT be the best choice, and what alternatives exist?",
        difficulty: "Hard",
        hint: "B-tree is not ideal for: (1) Equality-only lookups on high-cardinality data — Hash indexes are faster (O(1) vs O(log n)). (2) Full-text search — GIN/GiST indexes are better. (3) JSON/array containment queries — GIN indexes. (4) Geometric/spatial data — GiST indexes. (5) Very low cardinality columns (boolean) — partial indexes or bitmap scans. (6) Columns only used with leading wildcard LIKE '%abc' — pg_trgm with GIN index. B-tree excels at range queries and sorting, which other index types cannot do.",
      },
    ],
  },

  // 4. Hash Index
  {
    id: "hash-index",
    title: "Hash Index",
    slug: "hash-index",
    icon: "Hash",
    difficulty: "Intermediate",
    description:
      "Learn about hash indexes in PostgreSQL, how they work for equality comparisons, and when to use them over B-tree indexes.",
    concept: {
      explanation:
        "A hash index in PostgreSQL uses a hash function to map column values to buckets, providing O(1) constant-time lookups for equality comparisons. When you create a hash index, PostgreSQL computes a hash value for each indexed value and stores a pointer to the row in the corresponding bucket. Hash indexes ONLY support the equality operator (=) — they cannot be used for range queries, sorting, or pattern matching. Before PostgreSQL 10, hash indexes were not WAL-logged (not crash-safe), but modern PostgreSQL fully supports them. Hash indexes can be smaller and faster than B-tree for pure equality lookups on high-cardinality columns, but B-tree's versatility makes it the better default choice in most cases.",
      realLifeAnalogy:
        "A hash index is like a coat check at a restaurant. You hand over your coat (value), the attendant gives you a numbered ticket (hash), and your coat goes into a specific numbered slot. To retrieve it, you show your ticket and the attendant goes directly to that slot — no searching required. But you can't ask 'give me all coats from slots 10-20' (range query) — you can only retrieve by exact ticket number (equality).",
      keyPoints: [
        "Hash indexes use a hash function to map values to buckets",
        "O(1) constant-time lookups for equality comparisons",
        "ONLY supports the = operator — no range queries, no sorting",
        "Cannot be used for ORDER BY, <, >, <=, >=, BETWEEN, or LIKE",
        "Fully WAL-logged and crash-safe since PostgreSQL 10",
        "Can be smaller and faster than B-tree for pure equality lookups",
        "Not useful for columns involved in range queries or sorting",
        "B-tree is usually preferred due to its versatility",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Hash Index =====

-- Create sample table
CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  session_token VARCHAR(64),
  user_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

INSERT INTO sessions (session_token, user_id, created_at, expires_at)
SELECT
  md5(random()::TEXT || i::TEXT),
  (random() * 1000)::INT + 1,
  NOW() - (random() * INTERVAL '30 days'),
  NOW() + (random() * INTERVAL '30 days')
FROM generate_series(1, 1000) AS i;

-- 1. Create a hash index on session_token
CREATE INDEX idx_sessions_token_hash ON sessions USING hash(session_token);

-- 2. Equality lookup — uses hash index
EXPLAIN SELECT * FROM sessions
WHERE session_token = 'abc123';

-- 3. Compare: B-tree index on the same column
CREATE INDEX idx_sessions_token_btree ON sessions USING btree(session_token);

-- 4. Equality with B-tree
EXPLAIN SELECT * FROM sessions
WHERE session_token = 'abc123';

-- 5. Range query — hash index CANNOT be used
EXPLAIN SELECT * FROM sessions
WHERE session_token > 'a' AND session_token < 'b';

-- 6. Check index sizes
SELECT indexname,
       pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'sessions'
ORDER BY indexname;

-- 7. Hash index is useless for ORDER BY
EXPLAIN SELECT * FROM sessions ORDER BY session_token;
`,
    },
    interviewQuestions: [
      {
        question: "What is a hash index and when should you use it?",
        difficulty: "Easy",
        hint: "A hash index maps values through a hash function to buckets for O(1) equality lookups. Use it when: (1) You ONLY need equality checks (WHERE col = value). (2) The column has high cardinality (many unique values). (3) You never need range queries or sorting on that column. Common use cases: session tokens, API keys, UUIDs. In most cases, B-tree is preferred because it handles equality AND range queries.",
      },
      {
        question: "What are the limitations of hash indexes compared to B-tree indexes?",
        difficulty: "Medium",
        hint: "Hash index limitations: (1) Only supports = operator — no <, >, <=, >=, BETWEEN, LIKE, or ORDER BY. (2) Cannot support multi-column indexes effectively. (3) Not useful for queries that need sorted output. (4) Cannot be used for UNIQUE constraints. (5) Before PostgreSQL 10, they were not crash-safe. Advantages over B-tree: potentially smaller size and faster O(1) vs O(log n) for pure equality. But B-tree's O(log n) is so fast in practice that the difference is usually negligible.",
      },
      {
        question: "How does hash collision handling work in PostgreSQL hash indexes, and what happens during index growth?",
        difficulty: "Hard",
        hint: "PostgreSQL hash indexes use chaining for collision handling — when multiple values hash to the same bucket, they're stored in a linked list within that bucket. The index uses a dynamic hashing scheme: it starts with a small number of buckets and splits them as the index grows (similar to linear hashing). When a bucket overflows, PostgreSQL allocates overflow pages. The hash function distributes values uniformly, but poor distribution or many collisions degrade performance from O(1) toward O(n) for the affected bucket. REINDEX can rebuild a bloated hash index.",
      },
    ],
  },

  // 5. Composite Index
  {
    id: "composite-index",
    title: "Composite Index",
    slug: "composite-index",
    icon: "Layers",
    difficulty: "Intermediate",
    description:
      "Learn how composite (multi-column) indexes work, the importance of column order, and the leftmost prefix rule.",
    concept: {
      explanation:
        "A composite index (also called a multi-column index) is an index created on two or more columns of a table. In PostgreSQL, composite indexes use B-tree by default and sort data first by the first column, then by the second column within each group of the first, and so on. The critical concept is the leftmost prefix rule: a composite index on (A, B, C) can be used for queries filtering on A, (A, B), or (A, B, C), but NOT for queries filtering only on B or C alone. Column order matters enormously — place the most selective column (highest cardinality or most frequently queried) first. A composite index on (last_name, first_name) is like a phone book sorted by last name first, then first name — you can look up by last name alone, or by both, but not by first name alone.",
      realLifeAnalogy:
        "A composite index is like a phone book sorted by last name, then first name. You can easily find all 'Smiths' (first column), or find 'John Smith' (both columns). But you CANNOT efficiently find all 'Johns' regardless of last name — you'd have to scan the entire book because it's not sorted by first name. This is why column order in a composite index is crucial.",
      keyPoints: [
        "Created on two or more columns: CREATE INDEX ON table(col1, col2, col3)",
        "Data is sorted by col1 first, then col2 within col1, then col3 within col2",
        "Leftmost prefix rule: index (A,B,C) works for A, A+B, or A+B+C queries",
        "Cannot efficiently use the index for queries on just B or C alone",
        "Column order matters — put the most selective/queried column first",
        "A single composite index can replace multiple single-column indexes",
        "Maximum 32 columns in a composite index (PostgreSQL limit)",
        "More columns = larger index = more maintenance overhead",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Composite Index =====

-- Create sample table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  status VARCHAR(20),
  total NUMERIC(10,2),
  order_date DATE,
  region VARCHAR(30)
);

INSERT INTO orders (customer_id, status, total, order_date, region)
SELECT
  (random() * 200)::INT + 1,
  CASE (i % 4)
    WHEN 0 THEN 'pending'
    WHEN 1 THEN 'shipped'
    WHEN 2 THEN 'delivered'
    WHEN 3 THEN 'cancelled'
  END,
  (random() * 500 + 10)::NUMERIC(10,2),
  DATE '2023-01-01' + (random() * 365)::INT,
  CASE (i % 3)
    WHEN 0 THEN 'North'
    WHEN 1 THEN 'South'
    WHEN 2 THEN 'West'
  END
FROM generate_series(1, 1000) AS i;

-- 1. Create a composite index
CREATE INDEX idx_orders_status_date ON orders(status, order_date);

-- 2. Uses index — filters on first column (leftmost prefix)
EXPLAIN SELECT * FROM orders WHERE status = 'shipped';

-- 3. Uses index — filters on both columns
EXPLAIN SELECT * FROM orders
WHERE status = 'shipped' AND order_date > '2023-06-01';

-- 4. CANNOT use index — filters only on second column
EXPLAIN SELECT * FROM orders WHERE order_date > '2023-06-01';

-- 5. Three-column composite index
CREATE INDEX idx_orders_region_status_date
ON orders(region, status, order_date);

-- 6. Uses index (leftmost prefix: region)
EXPLAIN SELECT * FROM orders WHERE region = 'North';

-- 7. Uses index (leftmost prefix: region + status)
EXPLAIN SELECT * FROM orders
WHERE region = 'North' AND status = 'delivered';

-- 8. Uses full index
EXPLAIN SELECT * FROM orders
WHERE region = 'North'
  AND status = 'delivered'
  AND order_date > '2023-06-01';
`,
    },
    interviewQuestions: [
      {
        question: "What is the leftmost prefix rule for composite indexes?",
        difficulty: "Easy",
        hint: "The leftmost prefix rule states that a composite index on columns (A, B, C) can only be used when the query filters include the leftmost column(s) in order: A alone, A+B, or A+B+C. It CANNOT be used for queries filtering on B alone, C alone, or B+C. Think of it like a phone book sorted by last_name, first_name — you can search by last_name or last_name+first_name, but not by first_name alone.",
      },
      {
        question: "How do you decide the column order in a composite index?",
        difficulty: "Medium",
        hint: "Order columns by: (1) Equality conditions first — columns used with = should come before range columns (<, >, BETWEEN). (2) Most selective column first — the column that filters out the most rows. (3) Most frequently queried column first — ensures the index is useful for the most queries. Example: for queries WHERE status = 'active' AND created_at > '2024-01-01', put status first (equality) then created_at (range). The ESR rule: Equality, Sort, Range.",
      },
      {
        question: "When should you use a composite index vs multiple single-column indexes?",
        difficulty: "Hard",
        hint: "Use composite index when: (1) Queries frequently filter on the same combination of columns. (2) You need to cover a query entirely (index-only scan). (3) The column combination follows the leftmost prefix pattern. Use multiple single-column indexes when: (1) Columns are queried independently in different queries. (2) PostgreSQL can combine them via BitmapAnd/BitmapOr. Trade-off: a composite index on (A,B) is more efficient than two separate indexes for WHERE A=x AND B=y, but it can't help with WHERE B=y alone. Multiple single indexes are more flexible but less efficient for combined queries.",
      },
    ],
  },

  // 6. Partial Index
  {
    id: "partial-index",
    title: "Partial Index",
    slug: "partial-index",
    icon: "Filter",
    difficulty: "Advanced",
    description:
      "Learn how partial indexes index only a subset of rows using a WHERE clause, reducing index size and improving performance.",
    concept: {
      explanation:
        "A partial index in PostgreSQL is an index built on a subset of rows in a table, defined by a WHERE clause in the CREATE INDEX statement. Instead of indexing every row, a partial index only includes rows that match the specified condition. This makes the index smaller, faster to search, and cheaper to maintain. Partial indexes are ideal when queries frequently filter on a known condition — for example, indexing only active users, only unpaid invoices, or only recent orders. The query planner will use a partial index when the query's WHERE clause matches or is more restrictive than the index's WHERE clause. Partial indexes are one of PostgreSQL's most powerful optimization features.",
      realLifeAnalogy:
        "A partial index is like a VIP guest list at a hotel. Instead of maintaining a full directory of every person who ever stayed (full index), you keep a small list of only current guests (partial index with WHERE checked_out = false). This list is much smaller, faster to search, and only needs updating when guests check in or out — not for historical records.",
      keyPoints: [
        "Created with: CREATE INDEX ON table(col) WHERE condition",
        "Only indexes rows matching the WHERE condition",
        "Significantly smaller than a full index on the same column",
        "Faster lookups because fewer entries to search",
        "Less maintenance overhead on INSERT/UPDATE/DELETE",
        "Query must include the index's WHERE condition to use it",
        "Perfect for indexing subsets: active records, recent data, specific statuses",
        "Can be combined with other index features (unique, composite, expression)",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Partial Index =====

-- Create sample table
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  amount NUMERIC(10,2),
  status VARCHAR(20),
  created_at DATE,
  paid_at DATE
);

INSERT INTO invoices (customer_id, amount, status, created_at, paid_at)
SELECT
  (random() * 200)::INT + 1,
  (random() * 1000 + 50)::NUMERIC(10,2),
  CASE
    WHEN random() < 0.1 THEN 'unpaid'
    WHEN random() < 0.15 THEN 'overdue'
    ELSE 'paid'
  END,
  DATE '2023-01-01' + (random() * 700)::INT,
  CASE WHEN random() > 0.15
    THEN DATE '2023-01-01' + (random() * 700)::INT
    ELSE NULL
  END
FROM generate_series(1, 1000) AS i;

-- 1. Full index on status (indexes ALL rows)
CREATE INDEX idx_invoices_status_full ON invoices(status);

-- 2. Partial index — only unpaid invoices
CREATE INDEX idx_invoices_unpaid ON invoices(customer_id)
WHERE status = 'unpaid';

-- 3. Partial index — only overdue invoices
CREATE INDEX idx_invoices_overdue ON invoices(customer_id)
WHERE status = 'overdue';

-- 4. Query uses partial index (condition matches)
EXPLAIN SELECT * FROM invoices
WHERE status = 'unpaid' AND customer_id = 42;

-- 5. Query does NOT use partial index (different condition)
EXPLAIN SELECT * FROM invoices
WHERE status = 'paid' AND customer_id = 42;

-- 6. Compare index sizes
SELECT indexname,
       pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'invoices'
ORDER BY indexname;

-- 7. Partial unique index — unique email for active users only
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(200),
  is_active BOOLEAN DEFAULT true
);

CREATE UNIQUE INDEX idx_users_active_email
ON users(email) WHERE is_active = true;

-- Active users must have unique emails
INSERT INTO users (email, is_active) VALUES ('alice@test.com', true);
-- This would fail: INSERT INTO users (email, is_active) VALUES ('alice@test.com', true);

-- But inactive users can share emails
INSERT INTO users (email, is_active) VALUES ('alice@test.com', false);
`,
    },
    interviewQuestions: [
      {
        question: "What is a partial index and when is it useful?",
        difficulty: "Easy",
        hint: "A partial index indexes only a subset of rows defined by a WHERE clause. Example: CREATE INDEX idx ON orders(customer_id) WHERE status = 'pending'. It's useful when: (1) Most queries target a small subset of data (e.g., only active or pending records). (2) A small percentage of rows match the condition. (3) You want a smaller, faster, cheaper-to-maintain index. The query must include the index's WHERE condition for it to be used.",
      },
      {
        question: "How does the query planner decide whether to use a partial index?",
        difficulty: "Medium",
        hint: "The query planner uses a partial index when the query's WHERE clause implies or matches the index's WHERE clause. The query condition must be the same as or more restrictive than the index condition. Example: index WHERE status = 'unpaid'. Query WHERE status = 'unpaid' AND amount > 100 — uses the index (more restrictive). Query WHERE status = 'paid' — cannot use the index (different condition). The planner proves that every row matching the query must also be in the index.",
      },
      {
        question: "Can you create a partial unique index, and what are its use cases?",
        difficulty: "Hard",
        hint: "Yes. CREATE UNIQUE INDEX ON users(email) WHERE is_active = true enforces uniqueness only among active users. Deleted/inactive users can share emails with active users. Use cases: (1) Soft-delete patterns — unique constraint only on non-deleted records. (2) One active record per group — WHERE is_current = true. (3) Unique constraint with exceptions — unique per tenant only for premium accounts. This is more flexible than a regular unique constraint and avoids the need for complex triggers or application logic.",
      },
    ],
  },

  // 7. Query Optimization
  {
    id: "query-optimization",
    title: "Query Optimization",
    slug: "query-optimization",
    icon: "Zap",
    difficulty: "Advanced",
    description:
      "Learn practical techniques to optimize PostgreSQL queries, from indexing strategies to query rewriting and configuration tuning.",
    concept: {
      explanation:
        "Query optimization in PostgreSQL involves writing efficient queries and configuring the database to execute them optimally. Key techniques include: using appropriate indexes, avoiding SELECT * (select only needed columns), avoiding functions on indexed columns in WHERE clauses (which prevents index usage), using EXISTS instead of IN for subqueries, leveraging LIMIT for pagination, and understanding the query planner's cost-based optimization. PostgreSQL's query planner evaluates multiple execution strategies and chooses the one with the lowest estimated cost. Configuration parameters like work_mem, shared_buffers, and effective_cache_size affect plan choices. Common anti-patterns include: N+1 query problems, unnecessary DISTINCT, correlated subqueries that could be JOINs, and missing indexes on JOIN and WHERE columns.",
      realLifeAnalogy:
        "Query optimization is like planning the fastest route for a delivery truck. You could take the scenic route through every street (sequential scan), or use the highway system (indexes) and GPS (query planner) to find the optimal path. An unoptimized query is like a truck that goes back to the warehouse between every delivery — fixing it means batching deliveries (reducing round trips) and using the best roads (proper indexes).",
      keyPoints: [
        "Use EXPLAIN ANALYZE to understand actual query performance",
        "Select only needed columns — avoid SELECT *",
        "Don't apply functions to indexed columns in WHERE clauses",
        "Use EXISTS instead of IN for correlated subqueries",
        "Add indexes on columns used in WHERE, JOIN, and ORDER BY",
        "Use LIMIT and pagination for large result sets",
        "Avoid N+1 query patterns — use JOINs or batch queries",
        "Tune work_mem, shared_buffers for better plan choices",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Query Optimization =====

-- Setup tables
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department_id INT REFERENCES departments(id),
  salary NUMERIC(10,2),
  hire_date DATE,
  is_active BOOLEAN DEFAULT true
);

INSERT INTO departments (name) VALUES
  ('Engineering'), ('Marketing'), ('Sales'), ('HR'), ('Finance');

INSERT INTO staff (name, department_id, salary, hire_date, is_active)
SELECT
  'Staff_' || i,
  (i % 5) + 1,
  30000 + (random() * 70000)::INT,
  DATE '2019-01-01' + (random() * 2000)::INT,
  random() > 0.1
FROM generate_series(1, 1000) AS i;

-- BAD: SELECT * fetches all columns
EXPLAIN ANALYZE SELECT * FROM staff WHERE department_id = 1;

-- GOOD: Select only needed columns
EXPLAIN ANALYZE SELECT name, salary FROM staff WHERE department_id = 1;

-- BAD: Function on indexed column prevents index use
CREATE INDEX idx_staff_hire_date ON staff(hire_date);
EXPLAIN ANALYZE
SELECT * FROM staff WHERE EXTRACT(YEAR FROM hire_date) = 2023;

-- GOOD: Rewrite to use the index
EXPLAIN ANALYZE
SELECT * FROM staff
WHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01';

-- BAD: Using IN with a subquery
EXPLAIN ANALYZE
SELECT * FROM staff
WHERE department_id IN (
  SELECT id FROM departments WHERE name = 'Engineering'
);

-- GOOD: Using EXISTS (often more efficient)
EXPLAIN ANALYZE
SELECT * FROM staff s
WHERE EXISTS (
  SELECT 1 FROM departments d
  WHERE d.id = s.department_id AND d.name = 'Engineering'
);

-- GOOD: Or simply use a JOIN
EXPLAIN ANALYZE
SELECT s.name, s.salary
FROM staff s
JOIN departments d ON s.department_id = d.id
WHERE d.name = 'Engineering';

-- Add index for the JOIN column
CREATE INDEX idx_staff_dept ON staff(department_id);

-- Re-run with index
EXPLAIN ANALYZE
SELECT s.name, s.salary
FROM staff s
JOIN departments d ON s.department_id = d.id
WHERE d.name = 'Engineering';
`,
    },
    interviewQuestions: [
      {
        question: "Why should you avoid using SELECT * in production queries?",
        difficulty: "Easy",
        hint: "SELECT * is problematic because: (1) It fetches columns you don't need, wasting memory and network bandwidth. (2) It prevents index-only scans — the database must visit the heap even if all needed data is in the index. (3) It breaks when table schema changes (new columns appear unexpectedly). (4) It makes query intent unclear. (5) It transfers more data over the network. Instead, explicitly list needed columns: SELECT name, email FROM users.",
      },
      {
        question: "Why does applying a function to an indexed column prevent index usage, and how do you fix it?",
        difficulty: "Medium",
        hint: "When you write WHERE UPPER(name) = 'ALICE', PostgreSQL can't use an index on name because it would need to apply UPPER() to every indexed value to compare — defeating the purpose of the index. Fixes: (1) Rewrite the query: WHERE name = 'Alice' (if possible). (2) Create an expression index: CREATE INDEX idx ON table(UPPER(name)). (3) For date functions, rewrite EXTRACT(YEAR FROM date) = 2023 as date >= '2023-01-01' AND date < '2024-01-01'. The key insight: the index stores raw values, so the query must compare against raw values to use it.",
      },
      {
        question: "What is the N+1 query problem and how do you solve it?",
        difficulty: "Hard",
        hint: "The N+1 problem: you run 1 query to get N records, then N individual queries to get related data for each. Example: SELECT * FROM orders → 100 orders → 100 separate SELECT * FROM items WHERE order_id = ?. Total: 101 queries. Solutions: (1) Use JOIN: SELECT o.*, i.* FROM orders o JOIN items i ON o.id = i.order_id (1 query). (2) Use IN: SELECT * FROM items WHERE order_id IN (1,2,3,...100) (2 queries). (3) ORMs: use eager loading (include/join/prefetch). The fix reduces queries from N+1 to 1-2, dramatically reducing latency and database load.",
      },
    ],
  },

  // 8. EXPLAIN and EXPLAIN ANALYZE
  {
    id: "explain-analyze",
    title: "EXPLAIN and EXPLAIN ANALYZE",
    slug: "explain-analyze",
    icon: "Search",
    difficulty: "Advanced",
    description:
      "Master PostgreSQL's EXPLAIN and EXPLAIN ANALYZE commands to understand query execution plans and diagnose performance issues.",
    concept: {
      explanation:
        "EXPLAIN shows the execution plan PostgreSQL's query planner generates for a SQL statement without actually running it. It displays the planned operations (nodes) like Seq Scan, Index Scan, Hash Join, Sort, and Aggregate, along with estimated costs and row counts. EXPLAIN ANALYZE actually executes the query and shows both the plan AND actual execution statistics including real time, actual row counts, and loop iterations. The cost is expressed in arbitrary units: 'startup cost' is the time to return the first row, and 'total cost' is the time to return all rows. Key metrics to watch: actual time, rows (estimated vs actual), and the type of scan (Seq Scan suggests a missing index). Output formats include TEXT (default), JSON, YAML, and XML. EXPLAIN (BUFFERS) adds buffer usage statistics showing shared/local hits and reads.",
      realLifeAnalogy:
        "EXPLAIN is like asking a GPS for driving directions before starting your trip — it shows the planned route, estimated time, and distance. EXPLAIN ANALYZE is like actually driving the route and recording the real time taken at each turn. Sometimes the GPS estimate is wrong (estimated vs actual rows differ), which helps you identify where the plan went astray and find a better route (optimize the query).",
      keyPoints: [
        "EXPLAIN shows the planned execution without running the query",
        "EXPLAIN ANALYZE executes the query and shows actual vs estimated metrics",
        "Cost is in arbitrary units — compare relative costs, not absolute values",
        "Seq Scan = no index used (may be fine for small tables)",
        "Index Scan = index is being used for lookup",
        "Bitmap Index Scan = index used, then heap visited in bulk",
        "Watch for large differences between estimated and actual rows",
        "EXPLAIN (ANALYZE, BUFFERS) shows I/O statistics for deeper analysis",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== EXPLAIN and EXPLAIN ANALYZE =====

-- Create sample data
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  category VARCHAR(50),
  price NUMERIC(10,2),
  stock INT
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  quantity INT,
  unit_price NUMERIC(10,2)
);

INSERT INTO products (name, category, price, stock)
SELECT
  'Product_' || i,
  CASE (i % 5)
    WHEN 0 THEN 'Electronics'
    WHEN 1 THEN 'Clothing'
    WHEN 2 THEN 'Books'
    WHEN 3 THEN 'Food'
    WHEN 4 THEN 'Toys'
  END,
  (random() * 500 + 5)::NUMERIC(10,2),
  (random() * 200)::INT
FROM generate_series(1, 500) AS i;

INSERT INTO order_items (product_id, quantity, unit_price)
SELECT
  (random() * 499 + 1)::INT,
  (random() * 5 + 1)::INT,
  (random() * 500 + 5)::NUMERIC(10,2)
FROM generate_series(1, 2000) AS i;

-- 1. Basic EXPLAIN (shows plan only, does NOT run query)
EXPLAIN SELECT * FROM products WHERE category = 'Electronics';

-- 2. EXPLAIN ANALYZE (runs query and shows actual stats)
EXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Electronics';

-- 3. Add index and compare
CREATE INDEX idx_products_category ON products(category);
EXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Electronics';

-- 4. EXPLAIN with BUFFERS (shows I/O stats)
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM products WHERE category = 'Electronics';

-- 5. Join query plan
EXPLAIN ANALYZE
SELECT p.name, p.category, SUM(oi.quantity) AS total_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
WHERE p.category = 'Electronics'
GROUP BY p.name, p.category
ORDER BY total_sold DESC;

-- 6. Add index on foreign key and compare
CREATE INDEX idx_order_items_product ON order_items(product_id);

EXPLAIN ANALYZE
SELECT p.name, p.category, SUM(oi.quantity) AS total_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
WHERE p.category = 'Electronics'
GROUP BY p.name, p.category
ORDER BY total_sold DESC;

-- 7. Subquery plan
EXPLAIN ANALYZE
SELECT * FROM products
WHERE id IN (
  SELECT product_id FROM order_items
  WHERE quantity > 3
);
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between EXPLAIN and EXPLAIN ANALYZE?",
        difficulty: "Easy",
        hint: "EXPLAIN shows the query plan without executing the query — it displays estimated costs, estimated row counts, and the execution strategy (scan type, join method). EXPLAIN ANALYZE actually executes the query and shows both estimated AND actual metrics: real execution time, actual row counts, and loop counts. Use EXPLAIN for quick checks; use EXPLAIN ANALYZE for accurate performance data. Caution: EXPLAIN ANALYZE runs the query, so use it carefully with INSERT/UPDATE/DELETE (wrap in a transaction and rollback).",
      },
      {
        question: "What do the different scan types in EXPLAIN output mean?",
        difficulty: "Medium",
        hint: "Key scan types: (1) Seq Scan — reads every row in the table (full table scan). (2) Index Scan — uses an index to find rows, then fetches from the heap. (3) Index Only Scan — gets all data from the index without visiting the heap. (4) Bitmap Index Scan + Bitmap Heap Scan — uses index to build a bitmap of matching pages, then reads them in order. (5) CTE Scan — scans a materialized CTE. Index Only Scan is the fastest, Seq Scan is acceptable for small tables or when selecting most rows.",
      },
      {
        question: "How do you diagnose and fix a slow query using EXPLAIN ANALYZE output?",
        difficulty: "Hard",
        hint: "Steps: (1) Run EXPLAIN (ANALYZE, BUFFERS). (2) Look for Seq Scans on large tables — add an index. (3) Check estimated vs actual rows — large differences mean stale statistics (run ANALYZE). (4) Find the highest-cost node — that's your bottleneck. (5) Look for Sort operations with 'Sort Method: external merge' — increase work_mem. (6) Check for Nested Loop with many iterations — consider Hash Join by adding indexes or rewriting the query. (7) Look at actual time on each node to find the slowest step. (8) Check buffers for excessive reads (cache misses). Common fixes: add indexes, rewrite subqueries as JOINs, update statistics, increase work_mem.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Level 8: Database Design
  // ─────────────────────────────────────────────

  // 1. Normalization
  {
    id: "normalization",
    title: "Normalization",
    slug: "normalization",
    icon: "Layers",
    difficulty: "Intermediate",
    description:
      "Understand database normalization — the process of organizing data to reduce redundancy and improve data integrity.",
    concept: {
      explanation:
        "Database normalization is the process of structuring a relational database to minimize data redundancy and dependency anomalies. It involves decomposing large, flat tables into smaller, well-structured tables linked by relationships (foreign keys). The goal is to ensure that each piece of data is stored in exactly one place, so updates, inserts, and deletes affect only one location. Normalization follows a series of progressive 'normal forms' (1NF, 2NF, 3NF, BCNF, etc.), each eliminating a specific type of redundancy. The most common target is Third Normal Form (3NF), which eliminates repeating groups, partial dependencies, and transitive dependencies. While normalization improves data integrity and reduces storage waste, over-normalization can lead to complex queries with many JOINs — so practical database design often involves a balance between normalization and strategic denormalization.",
      realLifeAnalogy:
        "Imagine a school keeping all information in one giant spreadsheet: student name, address, class name, teacher name, teacher email — repeated for every class a student takes. If a teacher changes their email, you'd need to update hundreds of rows. Normalization is like reorganizing this into separate sheets: one for students, one for teachers, one for classes, and one for enrollments. Each teacher's email is stored once. Changes happen in one place and are instantly reflected everywhere.",
      keyPoints: [
        "Normalization reduces data redundancy by organizing data into related tables",
        "It prevents update, insert, and delete anomalies",
        "Normal forms are progressive: 1NF -> 2NF -> 3NF -> BCNF -> 4NF -> 5NF",
        "Most databases aim for Third Normal Form (3NF) as a practical target",
        "Each normal form addresses a specific type of dependency issue",
        "Normalization trades write simplicity for read complexity (more JOINs)",
        "Over-normalization can hurt query performance",
        "Denormalization is sometimes used strategically for read-heavy workloads",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Normalization =====

-- BEFORE: Unnormalized table with redundant data
CREATE TABLE student_courses_unnormalized (
  student_id INT,
  student_name VARCHAR(100),
  student_email VARCHAR(200),
  course_name VARCHAR(100),
  instructor_name VARCHAR(100),
  instructor_email VARCHAR(200),
  grade CHAR(2)
);

INSERT INTO student_courses_unnormalized VALUES
  (1, 'Alice', 'alice@uni.edu', 'Database Systems', 'Dr. Smith', 'smith@uni.edu', 'A'),
  (1, 'Alice', 'alice@uni.edu', 'Algorithms', 'Dr. Jones', 'jones@uni.edu', 'B+'),
  (2, 'Bob', 'bob@uni.edu', 'Database Systems', 'Dr. Smith', 'smith@uni.edu', 'A-'),
  (2, 'Bob', 'bob@uni.edu', 'Web Dev', 'Dr. Lee', 'lee@uni.edu', 'B'),
  (3, 'Carol', 'carol@uni.edu', 'Algorithms', 'Dr. Jones', 'jones@uni.edu', 'A');

-- See the redundancy: student info and instructor info repeated
SELECT * FROM student_courses_unnormalized;

-- AFTER: Normalized into separate tables
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(200) UNIQUE
);

CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(200) UNIQUE
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  instructor_id INT REFERENCES instructors(id)
);

CREATE TABLE enrollments (
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id),
  grade CHAR(2),
  PRIMARY KEY (student_id, course_id)
);

-- Insert normalized data (each fact stored ONCE)
INSERT INTO students (id, name, email) VALUES
  (1, 'Alice', 'alice@uni.edu'),
  (2, 'Bob', 'bob@uni.edu'),
  (3, 'Carol', 'carol@uni.edu');

INSERT INTO instructors (id, name, email) VALUES
  (1, 'Dr. Smith', 'smith@uni.edu'),
  (2, 'Dr. Jones', 'jones@uni.edu'),
  (3, 'Dr. Lee', 'lee@uni.edu');

INSERT INTO courses (id, name, instructor_id) VALUES
  (1, 'Database Systems', 1),
  (2, 'Algorithms', 2),
  (3, 'Web Dev', 3);

INSERT INTO enrollments VALUES
  (1, 1, 'A'), (1, 2, 'B+'),
  (2, 1, 'A-'), (2, 3, 'B'),
  (3, 2, 'A');

-- Query normalized data with JOINs
SELECT s.name AS student, c.name AS course,
       i.name AS instructor, e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
JOIN instructors i ON c.instructor_id = i.id;
`,
    },
    interviewQuestions: [
      {
        question: "What is database normalization and why is it important?",
        difficulty: "Easy",
        hint: "Normalization is the process of organizing database tables to reduce redundancy and prevent anomalies. It breaks large tables into smaller, related tables. Benefits: (1) Eliminates duplicate data — saves storage. (2) Prevents update anomalies — change data in one place. (3) Prevents insert anomalies — can add data without unrelated data. (4) Prevents delete anomalies — deleting one fact doesn't lose another. Trade-off: more JOINs needed for queries.",
      },
      {
        question: "What are the three types of data anomalies that normalization prevents?",
        difficulty: "Medium",
        hint: "1) Update anomaly: If a teacher's email is stored in 100 rows and it changes, you must update all 100 rows — miss one and data is inconsistent. 2) Insert anomaly: You can't add a new course without enrolling a student (if course data is in the enrollment table). 3) Delete anomaly: If you delete the last student enrolled in a course, you lose all course information too. Normalization prevents all three by storing each fact in exactly one place.",
      },
      {
        question: "When is it acceptable to not fully normalize a database, and what are the trade-offs?",
        difficulty: "Hard",
        hint: "Acceptable to skip full normalization when: (1) Read performance is critical and writes are infrequent (reporting databases, data warehouses). (2) The redundancy is small and well-controlled. (3) Complex JOINs would make queries too slow. (4) Using NoSQL patterns where denormalization is expected. Trade-offs: denormalization speeds up reads but slows writes, increases storage, risks data inconsistency, and requires application-level consistency management. The decision depends on read/write ratio, data volume, and consistency requirements.",
      },
    ],
  },

  // 2. First Normal Form
  {
    id: "first-normal-form",
    title: "First Normal Form (1NF)",
    slug: "first-normal-form",
    icon: "SquareStack",
    difficulty: "Intermediate",
    description:
      "Learn First Normal Form (1NF) — ensuring every column contains atomic values with no repeating groups.",
    concept: {
      explanation:
        "First Normal Form (1NF) is the foundational level of database normalization. A table is in 1NF when it satisfies these rules: (1) Every column contains only atomic (indivisible) values — no lists, arrays, or comma-separated values in a single cell. (2) Each row is unique — there is a primary key that identifies each record. (3) There are no repeating groups — you don't have columns like phone1, phone2, phone3 for the same type of data. (4) Each column contains values of a single type. Violations of 1NF include storing multiple phone numbers in one column ('555-1234, 555-5678'), having arrays of skills in a single field, or repeating columns for the same attribute. The fix is to break multi-valued fields into separate rows or separate tables.",
      realLifeAnalogy:
        "Imagine a contact list where one entry says 'Phone: 555-1234, 555-5678, 555-9999'. This violates 1NF because one cell has multiple values. To fix it, you'd create a separate phone number list: one row per phone number linked to the contact. It's like having one business card per phone number rather than cramming them all onto one card — each card has exactly one phone number.",
      keyPoints: [
        "Every column must contain atomic (indivisible) values",
        "No comma-separated lists or arrays in a single cell",
        "Each row must be uniquely identifiable (has a primary key)",
        "No repeating groups (e.g., skill1, skill2, skill3 columns)",
        "Each column contains only one type of data",
        "Fix: split multi-valued fields into separate rows or a related table",
        "1NF is the minimum requirement for a proper relational table",
        "PostgreSQL arrays technically violate 1NF but are practical in some cases",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== First Normal Form (1NF) =====

-- VIOLATION 1: Multi-valued column (comma-separated skills)
CREATE TABLE employees_bad (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  skills VARCHAR(500)  -- stores "Python, SQL, Java"
);

INSERT INTO employees_bad VALUES
  (1, 'Alice', 'Python, SQL, Java'),
  (2, 'Bob', 'JavaScript, React'),
  (3, 'Carol', 'Python, SQL, React, Go');

-- Problem: How to find all employees who know SQL?
-- This requires ugly string matching:
SELECT * FROM employees_bad WHERE skills LIKE '%SQL%';
-- Bug: would also match "MySQL" or "NoSQL"!

-- FIX: Separate table for skills (1NF compliant)
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE employee_skills (
  employee_id INT REFERENCES employees(id),
  skill VARCHAR(50),
  PRIMARY KEY (employee_id, skill)
);

INSERT INTO employees (id, name) VALUES
  (1, 'Alice'), (2, 'Bob'), (3, 'Carol');

INSERT INTO employee_skills VALUES
  (1, 'Python'), (1, 'SQL'), (1, 'Java'),
  (2, 'JavaScript'), (2, 'React'),
  (3, 'Python'), (3, 'SQL'), (3, 'React'), (3, 'Go');

-- Clean query: Find all employees who know SQL
SELECT e.name
FROM employees e
JOIN employee_skills es ON e.id = es.employee_id
WHERE es.skill = 'SQL';

-- VIOLATION 2: Repeating groups (phone1, phone2, phone3)
CREATE TABLE contacts_bad (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  phone1 VARCHAR(20),
  phone2 VARCHAR(20),
  phone3 VARCHAR(20)
);

-- FIX: Separate phone table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE contact_phones (
  contact_id INT REFERENCES contacts(id),
  phone VARCHAR(20),
  label VARCHAR(20),  -- 'home', 'work', 'mobile'
  PRIMARY KEY (contact_id, phone)
);
`,
    },
    interviewQuestions: [
      {
        question: "What are the rules for First Normal Form (1NF)?",
        difficulty: "Easy",
        hint: "1NF requires: (1) Atomic values — each cell contains one indivisible value, no lists or comma-separated values. (2) Unique rows — a primary key identifies each record. (3) No repeating groups — don't have col1, col2, col3 for the same attribute type. (4) Single data type per column. Example violation: storing 'Python, SQL, Java' in a skills column. Fix: create a separate employee_skills table with one row per skill.",
      },
      {
        question: "How do you fix a table that violates 1NF?",
        difficulty: "Medium",
        hint: "Two main fixes: (1) For multi-valued columns (skills = 'A, B, C'): create a child table with one row per value, linked by foreign key. Original: employees(id, name, skills). Fixed: employees(id, name) + employee_skills(employee_id, skill). (2) For repeating groups (phone1, phone2, phone3): create a child table with rows. Original: contacts(id, name, phone1, phone2). Fixed: contacts(id, name) + phones(contact_id, number, label). Both approaches create a one-to-many relationship.",
      },
      {
        question: "Does using PostgreSQL array columns violate 1NF, and when is it acceptable?",
        difficulty: "Hard",
        hint: "Technically yes — PostgreSQL arrays store multiple values in one column, violating the atomicity rule of 1NF. However, arrays are acceptable when: (1) You don't need to JOIN or query individual array elements frequently. (2) The array represents an ordered list that's always accessed as a whole (e.g., tags). (3) Performance matters and JOIN overhead is unacceptable. (4) GIN indexes can handle your query patterns. Use proper normalization when: you need referential integrity, complex queries on individual values, or the 'array' items have their own attributes. Pragmatic design often uses arrays for simple lists and normalized tables for complex relationships.",
      },
    ],
  },

  // 3. Second Normal Form
  {
    id: "second-normal-form",
    title: "Second Normal Form (2NF)",
    slug: "second-normal-form",
    icon: "GitMerge",
    difficulty: "Intermediate",
    description:
      "Learn Second Normal Form (2NF) — eliminating partial dependencies where non-key columns depend on only part of a composite key.",
    concept: {
      explanation:
        "Second Normal Form (2NF) builds on 1NF by eliminating partial dependencies. A table is in 2NF when: (1) It is already in 1NF, and (2) Every non-key column depends on the entire primary key, not just part of it. Partial dependencies only occur in tables with composite primary keys (keys made of two or more columns). For example, in an order_items table with a composite key (order_id, product_id), if product_name depends only on product_id (not on the full key), that's a partial dependency. The fix is to move the partially-dependent columns to a separate table keyed by the part they depend on. Tables with a single-column primary key are automatically in 2NF (since there's no 'part of' the key to depend on).",
      realLifeAnalogy:
        "Imagine a class roster that tracks (student_id, course_id) as its key, along with student_name and course_title. The student's name depends only on student_id (not on which course they're in), and the course title depends only on course_id. These are partial dependencies — the name and title don't need the full composite key. The fix is like creating separate directories: a student directory (student_id -> name) and a course catalog (course_id -> title), with the roster only tracking enrollment.",
      keyPoints: [
        "2NF requires the table to first be in 1NF",
        "Every non-key column must depend on the ENTIRE primary key",
        "Partial dependency: a non-key column depends on PART of a composite key",
        "Only tables with composite primary keys can violate 2NF",
        "Tables with single-column primary keys are automatically in 2NF",
        "Fix: move partially-dependent columns to a new table with the partial key",
        "2NF eliminates redundancy caused by partial dependencies",
        "Ensures that non-key attributes are fully functionally dependent on the key",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Second Normal Form (2NF) =====

-- VIOLATES 2NF: Partial dependencies with composite key
CREATE TABLE order_details_bad (
  order_id INT,
  product_id INT,
  -- These depend on the FULL key (order_id + product_id):
  quantity INT,
  line_total NUMERIC(10,2),
  -- This depends ONLY on order_id (partial dependency):
  order_date DATE,
  customer_name VARCHAR(100),
  -- This depends ONLY on product_id (partial dependency):
  product_name VARCHAR(200),
  product_price NUMERIC(10,2),
  PRIMARY KEY (order_id, product_id)
);

INSERT INTO order_details_bad VALUES
  (1, 101, 2, 59.98, '2024-01-15', 'Alice', 'Keyboard', 29.99),
  (1, 102, 1, 999.99, '2024-01-15', 'Alice', 'Laptop', 999.99),
  (2, 101, 3, 89.97, '2024-01-16', 'Bob', 'Keyboard', 29.99),
  (2, 103, 1, 49.99, '2024-01-16', 'Bob', 'Mouse', 49.99);

-- Notice: 'Keyboard' info is repeated, 'Alice' info is repeated

-- FIX: Decompose into 2NF-compliant tables

-- Products table (product_id -> product_name, product_price)
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(200),
  price NUMERIC(10,2)
);

-- Orders table (order_id -> order_date, customer_name)
CREATE TABLE orders (
  id INT PRIMARY KEY,
  order_date DATE,
  customer_name VARCHAR(100)
);

-- Order items (depends on FULL key: order_id + product_id)
CREATE TABLE order_items (
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  line_total NUMERIC(10,2),
  PRIMARY KEY (order_id, product_id)
);

INSERT INTO products VALUES
  (101, 'Keyboard', 29.99),
  (102, 'Laptop', 999.99),
  (103, 'Mouse', 49.99);

INSERT INTO orders VALUES
  (1, '2024-01-15', 'Alice'),
  (2, '2024-01-16', 'Bob');

INSERT INTO order_items VALUES
  (1, 101, 2, 59.98),
  (1, 102, 1, 999.99),
  (2, 101, 3, 89.97),
  (2, 103, 1, 49.99);

-- Query the normalized data
SELECT o.id AS order_id, o.order_date, o.customer_name,
       p.name AS product, oi.quantity, oi.line_total
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
JOIN products p ON oi.product_id = p.id;
`,
    },
    interviewQuestions: [
      {
        question: "What is Second Normal Form and what does it eliminate?",
        difficulty: "Easy",
        hint: "2NF eliminates partial dependencies. A table is in 2NF when: (1) It's in 1NF, and (2) Every non-key column depends on the entire primary key. Partial dependency: in a table with composite key (A, B), column C depends only on A. Example: order_items(order_id, product_id, quantity, product_name) — product_name depends only on product_id, not the full key. Fix: move product_name to a products table.",
      },
      {
        question: "Can a table with a single-column primary key violate 2NF?",
        difficulty: "Medium",
        hint: "No. 2NF violations can only occur in tables with composite primary keys (keys made of 2+ columns). Partial dependency means a non-key column depends on PART of the key — with a single-column key, there is no 'part' to depend on. So any table in 1NF with a single-column primary key is automatically in 2NF. This is why surrogate keys (auto-increment IDs) effectively bypass 2NF concerns, though the underlying data design issues may still exist as hidden dependencies.",
      },
      {
        question: "How do you identify partial dependencies in a table, and what is the process to fix them?",
        difficulty: "Hard",
        hint: "Identification: (1) Find all tables with composite primary keys. (2) For each non-key column, determine: does it depend on the FULL key or only PART? (3) If column X can be determined by just key_part_A alone (regardless of key_part_B), it's a partial dependency. Fix process: (1) Group partially-dependent columns by which key part they depend on. (2) Create new tables: each group becomes a table with its key part as the primary key. (3) Remove the moved columns from the original table. (4) Add foreign key references from the original table to the new tables. Example: (order_id, product_id, qty, product_name) -> products(product_id, name) + order_items(order_id, product_id, qty).",
      },
    ],
  },

  // 4. Third Normal Form
  {
    id: "third-normal-form",
    title: "Third Normal Form (3NF)",
    slug: "third-normal-form",
    icon: "Network",
    difficulty: "Advanced",
    description:
      "Learn Third Normal Form (3NF) — eliminating transitive dependencies where non-key columns depend on other non-key columns.",
    concept: {
      explanation:
        "Third Normal Form (3NF) builds on 2NF by eliminating transitive dependencies. A transitive dependency occurs when a non-key column depends on another non-key column, which in turn depends on the primary key. In other words: if A -> B -> C (key determines B, and B determines C), then C is transitively dependent on A through B. For example, in an employees table with (employee_id, department_id, department_name), department_name depends on department_id (not on employee_id directly) — this is a transitive dependency. The fix is to create a separate departments table. A table is in 3NF when: (1) It is in 2NF, and (2) No non-key column depends on another non-key column. The classic rule: every non-key column must provide a fact about 'the key, the whole key, and nothing but the key.'",
      realLifeAnalogy:
        "Imagine an employee directory that lists employee_id, department_id, department_name, and department_manager. The department name and manager depend on department_id, not on the employee. If the department changes its manager, you'd need to update every employee row in that department. It's like having every employee's badge also show their department manager's name — when the manager changes, you'd need to reprint every badge. Instead, keep department info on a separate department board.",
      keyPoints: [
        "3NF requires the table to first be in 2NF",
        "Eliminates transitive dependencies: A -> B -> C",
        "No non-key column should depend on another non-key column",
        "The key, the whole key, and nothing but the key (so help me Codd)",
        "Common violation: storing department_name in an employee table",
        "Fix: create a separate table for the transitively dependent group",
        "3NF is the standard target for most OLTP database designs",
        "Beyond 3NF (BCNF, 4NF, 5NF) is rarely needed in practice",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Third Normal Form (3NF) =====

-- VIOLATES 3NF: Transitive dependency
-- employee_id -> department_id -> department_name, dept_manager
CREATE TABLE employees_bad (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  salary NUMERIC(10,2),
  department_id INT,
  department_name VARCHAR(50),   -- depends on department_id, NOT on employee id
  dept_manager VARCHAR(100)      -- depends on department_id, NOT on employee id
);

INSERT INTO employees_bad VALUES
  (1, 'Alice', 85000, 10, 'Engineering', 'Dr. Smith'),
  (2, 'Bob', 78000, 10, 'Engineering', 'Dr. Smith'),
  (3, 'Carol', 72000, 20, 'Marketing', 'Ms. Jones'),
  (4, 'Dave', 68000, 20, 'Marketing', 'Ms. Jones'),
  (5, 'Eve', 90000, 10, 'Engineering', 'Dr. Smith');

-- Redundancy: 'Engineering' and 'Dr. Smith' stored 3 times!
SELECT * FROM employees_bad;

-- Transitive dependency chain:
-- employee_id -> department_id -> department_name
-- employee_id -> department_id -> dept_manager

-- FIX: Decompose into 3NF

-- Departments table (removes transitive dependency)
CREATE TABLE departments (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  manager VARCHAR(100)
);

CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  salary NUMERIC(10,2),
  department_id INT REFERENCES departments(id)
);

INSERT INTO departments VALUES
  (10, 'Engineering', 'Dr. Smith'),
  (20, 'Marketing', 'Ms. Jones');

INSERT INTO employees VALUES
  (1, 'Alice', 85000, 10),
  (2, 'Bob', 78000, 10),
  (3, 'Carol', 72000, 20),
  (4, 'Dave', 68000, 20),
  (5, 'Eve', 90000, 10);

-- Now updating the manager is a single-row update:
UPDATE departments SET manager = 'Dr. Brown' WHERE id = 10;

-- Query with JOIN
SELECT e.name, e.salary, d.name AS department, d.manager
FROM employees e
JOIN departments d ON e.department_id = d.id;
`,
    },
    interviewQuestions: [
      {
        question: "What is a transitive dependency and how does it violate 3NF?",
        difficulty: "Easy",
        hint: "A transitive dependency is when column C depends on column B, which depends on the primary key A: A -> B -> C. Example: employee_id -> department_id -> department_name. The department_name doesn't depend directly on the employee — it depends on the department. This violates 3NF because a non-key column (department_name) depends on another non-key column (department_id). Fix: move department_name to a separate departments table.",
      },
      {
        question: "What is the difference between 2NF and 3NF?",
        difficulty: "Medium",
        hint: "2NF eliminates partial dependencies (non-key column depends on PART of a composite key). 3NF eliminates transitive dependencies (non-key column depends on ANOTHER non-key column). 2NF is about the relationship between non-key columns and parts of the key. 3NF is about the relationship between non-key columns themselves. Both decompose the table by moving the dependent columns to a new table. A table can be in 2NF but not 3NF if it has transitive dependencies.",
      },
      {
        question: "Explain the phrase 'the key, the whole key, and nothing but the key' in the context of normalization.",
        difficulty: "Hard",
        hint: "This phrase summarizes 1NF through 3NF: (1) 'The key' — every table must have a primary key (1NF). (2) 'The whole key' — every non-key column must depend on the ENTIRE primary key, not just part of it (2NF — no partial dependencies). (3) 'Nothing but the key' — every non-key column must depend ONLY on the primary key, not on other non-key columns (3NF — no transitive dependencies). If a non-key column's value can be determined by something other than the primary key, it should be in a different table. This is Bill Kent's popular mnemonic for relational design.",
      },
    ],
  },

  // 5. Denormalization
  {
    id: "denormalization",
    title: "Denormalization",
    slug: "denormalization",
    icon: "Combine",
    difficulty: "Advanced",
    description:
      "Learn when and how to strategically denormalize databases to improve read performance at the cost of some redundancy.",
    concept: {
      explanation:
        "Denormalization is the deliberate process of adding redundant data to a normalized database to improve read performance. While normalization reduces redundancy, it often requires complex JOINs across multiple tables for common queries. Denormalization trades data integrity and storage space for faster reads. Common denormalization techniques include: adding redundant columns (storing a computed total alongside line items), materialized views (pre-computed query results), summary tables (pre-aggregated data), and caching frequently-joined data (storing customer_name in orders table). Denormalization is particularly valuable in read-heavy systems like reporting databases, data warehouses (OLAP), and high-traffic web applications. The key is to denormalize strategically based on actual query patterns, not speculatively. Always maintain the normalized source of truth and treat denormalized data as derived/cached data.",
      realLifeAnalogy:
        "Normalization is like a library with one master catalog card per book. To find who checked out a book, you look up the card, go to the patron file, then the checkout log — three lookups. Denormalization is like putting a sticky note on each book shelf saying 'Last checked out by: Alice, Jan 15'. It's redundant (the info is also in the checkout log), but saves time for a common question. If someone changes their name, you need to update both the patron file AND all the sticky notes — that's the trade-off.",
      keyPoints: [
        "Denormalization intentionally adds redundancy to speed up reads",
        "Trades storage space and write complexity for faster query performance",
        "Common in OLAP, data warehouses, and read-heavy applications",
        "Techniques: redundant columns, materialized views, summary tables",
        "Always keep the normalized source of truth",
        "Only denormalize based on measured performance issues and real query patterns",
        "Increases risk of data inconsistency — need triggers or application logic",
        "OLTP systems favor normalization; OLAP systems favor denormalization",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Denormalization =====

-- Fully normalized schema
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(200)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  order_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_name VARCHAR(200),
  quantity INT,
  unit_price NUMERIC(10,2)
);

INSERT INTO customers VALUES (1, 'Alice', 'alice@example.com');
INSERT INTO orders VALUES (1, 1, '2024-01-15');
INSERT INTO order_items VALUES
  (1, 1, 'Laptop', 1, 999.99),
  (2, 1, 'Mouse', 2, 29.99);

-- Normalized query: requires 3-table JOIN
SELECT c.name, o.order_date,
       SUM(oi.quantity * oi.unit_price) AS total
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY c.name, o.order_date;

-- DENORMALIZED: Add redundant columns for common queries
ALTER TABLE orders ADD COLUMN customer_name VARCHAR(100);
ALTER TABLE orders ADD COLUMN order_total NUMERIC(10,2);

-- Update denormalized fields
UPDATE orders o SET
  customer_name = c.name,
  order_total = (
    SELECT SUM(quantity * unit_price)
    FROM order_items WHERE order_id = o.id
  )
FROM customers c WHERE c.id = o.customer_id;

-- Faster query: no JOINs needed for common dashboard
SELECT customer_name, order_date, order_total FROM orders;

-- Materialized view: pre-computed summary
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT DATE_TRUNC('month', o.order_date) AS month,
       COUNT(DISTINCT o.id) AS order_count,
       SUM(oi.quantity * oi.unit_price) AS revenue
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
GROUP BY DATE_TRUNC('month', o.order_date);

-- Fast dashboard query
SELECT * FROM monthly_sales;

-- Refresh when data changes
REFRESH MATERIALIZED VIEW monthly_sales;
`,
    },
    interviewQuestions: [
      {
        question: "What is denormalization and when would you use it?",
        difficulty: "Easy",
        hint: "Denormalization is intentionally adding redundant data to normalized tables to improve read performance. Use it when: (1) Queries require frequent complex JOINs across many tables. (2) Read performance is critical (dashboards, reports). (3) The system is read-heavy with infrequent writes. (4) Query response time is more important than storage. Common in data warehouses, reporting systems, and high-traffic APIs. Always keep the normalized data as the source of truth.",
      },
      {
        question: "What are the different denormalization techniques?",
        difficulty: "Medium",
        hint: "Key techniques: (1) Redundant columns — store customer_name directly in orders table. (2) Materialized views — pre-computed query results, refreshed periodically. (3) Summary/aggregate tables — pre-calculated totals, counts, averages. (4) Duplicating columns across tables — store product_price in order_items at time of purchase. (5) Pre-joined tables — combine related tables into a single wide table. (6) Caching layers — Redis/Memcached for frequently accessed denormalized data. Each technique trades write complexity and storage for read speed.",
      },
      {
        question: "How do you maintain consistency in a denormalized database?",
        difficulty: "Hard",
        hint: "Consistency strategies: (1) Database triggers — automatically update denormalized columns when source data changes. (2) Application-level updates — update both normalized and denormalized data in the same transaction. (3) Materialized views with REFRESH — periodically recompute denormalized data. (4) Event-driven updates — use change data capture (CDC) to propagate changes. (5) Scheduled batch jobs — periodically reconcile denormalized data. Trade-offs: triggers add write overhead, application logic can have bugs, periodic refresh means temporary staleness. Best practice: treat denormalized data as a cache — always have a way to rebuild it from the normalized source.",
      },
    ],
  },

  // 6. ER Diagrams
  {
    id: "er-diagrams",
    title: "ER Diagrams",
    slug: "er-diagrams",
    icon: "Workflow",
    difficulty: "Intermediate",
    description:
      "Learn Entity-Relationship (ER) diagrams — the visual tool for designing database schemas before writing SQL.",
    concept: {
      explanation:
        "Entity-Relationship (ER) diagrams are visual blueprints for database design. They represent the structure of a database before any tables are created. An ER diagram consists of three main components: Entities (the things you store data about — become tables), Attributes (the properties of entities — become columns), and Relationships (how entities are connected — become foreign keys or junction tables). Entities are drawn as rectangles, attributes as ovals or listed inside the entity box, and relationships as diamonds or lines connecting entities. Relationships have cardinality: one-to-one (1:1), one-to-many (1:N), or many-to-many (M:N). ER diagrams help communicate database structure to stakeholders, identify missing entities or relationships early, and serve as documentation. They are created during the design phase before any SQL is written.",
      realLifeAnalogy:
        "An ER diagram is like an architect's blueprint for a building. Before laying any bricks (writing SQL), the architect draws rooms (entities), labels their features (attributes), and shows how rooms connect via doors and hallways (relationships). The blueprint shows the overall structure at a glance — you can see that the kitchen connects to the dining room (one-to-one) and the hallway leads to multiple bedrooms (one-to-many). Just as you wouldn't build without a blueprint, you shouldn't create a database without an ER diagram.",
      keyPoints: [
        "Entities = things you store data about (become tables)",
        "Attributes = properties of entities (become columns)",
        "Relationships = connections between entities (become foreign keys)",
        "Cardinality: 1:1, 1:N (one-to-many), M:N (many-to-many)",
        "Primary keys are underlined in ER diagrams",
        "M:N relationships require a junction (bridge) table",
        "Create ER diagrams BEFORE writing SQL",
        "Tools: draw.io, dbdiagram.io, Lucidchart, pgModeler",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== ER Diagrams → SQL Implementation =====

-- Entity: Students
-- Attributes: id (PK), name, email, enrollment_date
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  enrollment_date DATE DEFAULT CURRENT_DATE
);

-- Entity: Instructors
-- Attributes: id (PK), name, email, department
CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  department VARCHAR(50)
);

-- Entity: Courses
-- Attributes: id (PK), title, credits
-- Relationship: taught by instructor (M:1)
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  credits INT DEFAULT 3,
  instructor_id INT REFERENCES instructors(id)
);

-- Junction table for M:N relationship: Students <-> Courses
-- Relationship: Enrollments (with extra attribute: grade)
CREATE TABLE enrollments (
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id),
  grade CHAR(2),
  enrolled_at DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (student_id, course_id)
);

-- Insert sample data
INSERT INTO instructors (name, email, department) VALUES
  ('Dr. Smith', 'smith@uni.edu', 'Computer Science'),
  ('Dr. Jones', 'jones@uni.edu', 'Mathematics');

INSERT INTO courses (title, credits, instructor_id) VALUES
  ('Database Systems', 4, 1),
  ('Algorithms', 3, 2),
  ('Web Development', 3, 1);

INSERT INTO students (name, email) VALUES
  ('Alice', 'alice@uni.edu'),
  ('Bob', 'bob@uni.edu'),
  ('Carol', 'carol@uni.edu');

INSERT INTO enrollments (student_id, course_id, grade) VALUES
  (1, 1, 'A'), (1, 2, 'B+'), (1, 3, 'A-'),
  (2, 1, 'B'), (2, 3, 'A'),
  (3, 2, 'A');

-- Query: Students with their courses and instructors
SELECT s.name AS student, c.title AS course,
       i.name AS instructor, e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
JOIN instructors i ON c.instructor_id = i.id
ORDER BY s.name, c.title;

-- Query: How many students per course?
SELECT c.title, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.title;
`,
    },
    interviewQuestions: [
      {
        question: "What are the three main components of an ER diagram?",
        difficulty: "Easy",
        hint: "The three components are: (1) Entities — represent real-world objects or concepts that become tables (e.g., Student, Course, Order). Drawn as rectangles. (2) Attributes — properties or characteristics of entities that become columns (e.g., name, email, price). Listed inside the entity or drawn as ovals. Primary keys are underlined. (3) Relationships — connections between entities that become foreign keys (e.g., 'enrolls in', 'teaches'). Drawn as diamonds or lines with cardinality notation (1:1, 1:N, M:N).",
      },
      {
        question: "How do you translate an M:N relationship from an ER diagram to SQL tables?",
        difficulty: "Medium",
        hint: "An M:N (many-to-many) relationship requires a junction (bridge/linking) table. Example: Students M:N Courses. Create three tables: (1) students(id, name). (2) courses(id, title). (3) enrollments(student_id, course_id) — the junction table with foreign keys to both entities and a composite primary key. The junction table can also hold relationship attributes (e.g., grade, enrolled_date). Without the junction table, you'd need arrays or comma-separated lists, which violate 1NF.",
      },
      {
        question: "What is the difference between conceptual, logical, and physical ER diagrams?",
        difficulty: "Hard",
        hint: "Three levels of abstraction: (1) Conceptual — highest level, shows entities and relationships only. No attributes, no data types, no keys. Used for stakeholder communication. Example: 'Student enrolls in Course'. (2) Logical — adds attributes, primary keys, foreign keys, and cardinality. Database-agnostic (no specific data types). Shows the full data model. (3) Physical — adds PostgreSQL-specific details: exact data types (VARCHAR(100)), indexes, constraints, table spaces, partitioning. Ready to generate DDL. Each level adds detail: conceptual for business users, logical for architects, physical for DBAs.",
      },
    ],
  },

  // 7. Relationships
  {
    id: "database-relationships",
    title: "Relationships (1:1, 1:N, M:N)",
    slug: "database-relationships",
    icon: "Link",
    difficulty: "Intermediate",
    description:
      "Master the three types of database relationships — One-to-One, One-to-Many, and Many-to-Many — and how to implement them in PostgreSQL.",
    concept: {
      explanation:
        "Database relationships define how tables are connected to each other through foreign keys. There are three fundamental types: One-to-One (1:1) — each row in Table A relates to exactly one row in Table B (e.g., user and user_profile). Implemented by placing a UNIQUE foreign key in either table. One-to-Many (1:N) — each row in Table A can relate to many rows in Table B, but each row in B relates to only one in A (e.g., department has many employees). Implemented by placing a foreign key in the 'many' side table. Many-to-Many (M:N) — rows in Table A can relate to many rows in Table B and vice versa (e.g., students and courses). Implemented using a junction table with foreign keys to both tables. Understanding relationships is crucial for proper schema design and efficient queries.",
      realLifeAnalogy:
        "Think of relationships like social connections: One-to-One is like a person and their passport — each person has exactly one passport, and each passport belongs to exactly one person. One-to-Many is like a mother and her children — one mother can have many children, but each child has exactly one biological mother. Many-to-Many is like authors and books — an author can write many books, and a book can have many authors.",
      keyPoints: [
        "One-to-One (1:1): UNIQUE foreign key in either table",
        "One-to-Many (1:N): foreign key in the 'many' side table",
        "Many-to-Many (M:N): junction table with two foreign keys",
        "Foreign keys enforce referential integrity",
        "The 'many' side always holds the foreign key",
        "Junction tables can have their own attributes (e.g., enrollment date)",
        "CASCADE options control what happens on delete/update",
        "Most real-world relationships are One-to-Many",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Database Relationships =====

-- ========== ONE-TO-ONE (1:1) ==========
-- Each user has exactly one profile

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  avatar_url VARCHAR(500),
  date_of_birth DATE
);

INSERT INTO users VALUES (1, 'alice', 'alice@example.com');
INSERT INTO user_profiles VALUES (1, 1, 'Software engineer', NULL, '1995-03-15');

-- ========== ONE-TO-MANY (1:N) ==========
-- Each department has many employees

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INT REFERENCES departments(id) ON DELETE SET NULL
);

INSERT INTO departments VALUES (1, 'Engineering'), (2, 'Marketing');
INSERT INTO employees VALUES
  (1, 'Alice', 1), (2, 'Bob', 1), (3, 'Carol', 2);

-- One department -> many employees
SELECT d.name AS department, e.name AS employee
FROM departments d
JOIN employees e ON d.id = e.department_id;

-- ========== MANY-TO-MANY (M:N) ==========
-- Students can take many courses; courses have many students

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);

-- Junction table
CREATE TABLE student_courses (
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at DATE DEFAULT CURRENT_DATE,
  grade CHAR(2),
  PRIMARY KEY (student_id, course_id)
);

INSERT INTO students VALUES (1, 'Alice'), (2, 'Bob');
INSERT INTO courses VALUES (1, 'SQL 101'), (2, 'Python 101');
INSERT INTO student_courses VALUES
  (1, 1, '2024-01-15', 'A'),
  (1, 2, '2024-01-15', 'B+'),
  (2, 1, '2024-01-20', 'A-');

-- Students and their courses
SELECT s.name, c.title, sc.grade
FROM student_courses sc
JOIN students s ON sc.student_id = s.id
JOIN courses c ON sc.course_id = c.id;
`,
    },
    interviewQuestions: [
      {
        question: "What are the three types of database relationships and how are they implemented?",
        difficulty: "Easy",
        hint: "1) One-to-One (1:1): Add a UNIQUE foreign key in either table. Example: users + user_profiles. 2) One-to-Many (1:N): Add a foreign key in the 'many' side table. Example: departments + employees (employee has department_id). 3) Many-to-Many (M:N): Create a junction table with foreign keys to both tables. Example: students + courses + student_courses junction table. The junction table's primary key is usually the composite of both foreign keys.",
      },
      {
        question: "Why does the foreign key go on the 'many' side in a One-to-Many relationship?",
        difficulty: "Medium",
        hint: "The foreign key goes on the 'many' side because each row on the 'many' side points to exactly ONE row on the 'one' side — this is a single value that fits in one column. If you put the FK on the 'one' side, you'd need to store MULTIPLE values (all the related IDs), which violates 1NF. Example: department has many employees. Each employee has ONE department_id (simple FK). If department stored all employee_ids, it would need an array or comma-separated list — that's a 1NF violation.",
      },
      {
        question: "What are ON DELETE CASCADE, SET NULL, RESTRICT, and SET DEFAULT, and when do you use each?",
        difficulty: "Hard",
        hint: "These control what happens to child rows when a parent is deleted: (1) CASCADE — delete child rows too. Use for dependent data (deleting a user deletes their profile). (2) SET NULL — set FK to NULL. Use when child can exist independently (deleting department sets employee's dept to NULL). (3) RESTRICT/NO ACTION — prevent parent deletion if children exist. Use to protect important data (can't delete customer with orders). (4) SET DEFAULT — set FK to a default value. Use for reassignment (deleted dept's employees go to 'Unassigned'). Choose based on business rules: CASCADE for ownership, SET NULL for optional associations, RESTRICT for critical references.",
      },
    ],
  },

  // 8. Schema Design Best Practices
  {
    id: "schema-design-best-practices",
    title: "Schema Design Best Practices",
    slug: "schema-design-best-practices",
    icon: "CheckSquare",
    difficulty: "Advanced",
    description:
      "Learn the best practices for designing efficient, maintainable PostgreSQL database schemas.",
    concept: {
      explanation:
        "Schema design best practices are guidelines that lead to databases that are efficient, maintainable, and scalable. Key practices include: Use meaningful, consistent naming conventions (snake_case for tables and columns, plural table names). Always use a primary key (prefer surrogate keys like SERIAL/UUID for most tables). Add created_at and updated_at timestamps to every table for auditing. Use appropriate data types (don't store dates as strings, don't use TEXT for everything). Define constraints (NOT NULL, UNIQUE, CHECK, foreign keys) at the database level, not just in application code. Index columns used in WHERE, JOIN, and ORDER BY clauses. Use ENUM types or reference tables for fixed categories. Avoid nullable foreign keys when possible. Design for your query patterns — normalize for OLTP, denormalize for analytics. Document your schema with comments. These practices prevent common issues like data inconsistency, poor performance, and maintenance nightmares.",
      realLifeAnalogy:
        "Good schema design is like good architecture for a house. You plan room sizes based on usage (data types), install locks on doors that need them (constraints), label every circuit breaker (naming conventions), put timestamps on the foundation (audit columns), and build the structure to code (best practices). A well-designed house is easy to maintain and modify. A poorly designed one has surprises behind every wall — unlabeled wires, load-bearing walls where you don't expect them, and rooms that are the wrong size for their purpose.",
      keyPoints: [
        "Use snake_case naming: user_accounts, created_at, order_id",
        "Every table needs a primary key (prefer SERIAL or UUID)",
        "Add created_at and updated_at timestamps to all tables",
        "Use appropriate data types: TIMESTAMPTZ for dates, NUMERIC for money",
        "Define constraints in the database: NOT NULL, UNIQUE, CHECK, FK",
        "Index columns used in WHERE, JOIN, and ORDER BY",
        "Use ENUM or reference tables for fixed categories",
        "Comment your tables and columns with COMMENT ON",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Schema Design Best Practices =====

-- 1. Naming conventions: snake_case, plural tables, descriptive names
-- 2. Surrogate primary keys (SERIAL or UUID)
-- 3. Timestamps on every table
-- 4. Proper data types and constraints

-- BAD: Poor schema design
CREATE TABLE tbl1 (
  ID int,
  n varchar(999),
  e varchar(999),
  t varchar(50),     -- what is "t"?
  s varchar(10),     -- status as arbitrary string
  amt float,         -- float for money = rounding bugs!
  d varchar(20)      -- date stored as string
);

-- GOOD: Well-designed schema
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  phone VARCHAR(20),
  status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE customers IS 'Customer accounts for the platform';
COMMENT ON COLUMN customers.status IS 'Account status: active, inactive, or suspended';

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  notes TEXT,
  ordered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Strategic indexes
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status) WHERE status != 'delivered';
CREATE INDEX idx_orders_ordered_at ON orders(ordered_at);

-- Insert and verify
INSERT INTO customers (first_name, last_name, email) VALUES
  ('Alice', 'Smith', 'alice@example.com');

INSERT INTO orders (customer_id, total_amount) VALUES (1, 149.99);

-- Check the schema
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'customers'
ORDER BY ordinal_position;

-- Verify constraints
SELECT tc.constraint_name, tc.constraint_type, kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'customers';
`,
    },
    interviewQuestions: [
      {
        question: "What are the most important columns every database table should have?",
        difficulty: "Easy",
        hint: "Every table should have: (1) A primary key — usually id SERIAL or UUID. Uniquely identifies each row. (2) created_at TIMESTAMPTZ DEFAULT NOW() — records when the row was created. (3) updated_at TIMESTAMPTZ DEFAULT NOW() — records last modification (updated via trigger). These enable: auditing (when was this changed?), debugging (was this created before or after that bug?), data synchronization (what changed since last sync?), and compliance (data retention policies). Some teams also add created_by and updated_by for user tracking.",
      },
      {
        question: "Why should you use NUMERIC instead of FLOAT for monetary values?",
        difficulty: "Medium",
        hint: "FLOAT/DOUBLE use binary floating-point representation, which cannot exactly represent most decimal fractions. Example: 0.1 + 0.2 = 0.30000000000000004 in floating-point. For money, this means: $10.10 + $20.20 might not equal $30.30 — leading to rounding errors, incorrect totals, and accounting discrepancies. NUMERIC(precision, scale) stores exact decimal values: NUMERIC(12,2) stores up to 12 digits with exactly 2 decimal places. It's slower than FLOAT but guarantees exact arithmetic — essential for financial calculations.",
      },
      {
        question: "How do you design a schema that balances normalization, performance, and maintainability?",
        difficulty: "Hard",
        hint: "Balanced approach: (1) Start with 3NF normalization for data integrity. (2) Identify hot query paths through EXPLAIN ANALYZE. (3) Add strategic indexes on WHERE, JOIN, ORDER BY columns. (4) Denormalize only measured bottlenecks — add redundant columns or materialized views. (5) Use partial indexes for common filtered queries. (6) Enforce constraints in the database (NOT NULL, CHECK, FK) — not just in application code. (7) Design for your workload: OLTP favors normalization, OLAP favors star/snowflake schemas. (8) Use appropriate types (TIMESTAMPTZ, NUMERIC, JSONB). (9) Plan for growth: partitioning for large tables, connection pooling. (10) Document with COMMENT ON and maintain an ER diagram. The goal: normalized source of truth with strategic denormalization for performance.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Level 9: PostgreSQL Advanced Features
  // ─────────────────────────────────────────────

  // 1. Views
  {
    id: "views",
    title: "Views",
    slug: "views",
    icon: "Eye",
    difficulty: "Intermediate",
    description:
      "Learn how to create and use views — saved SQL queries that act as virtual tables for simplifying complex queries and controlling data access.",
    concept: {
      explanation:
        "A view in PostgreSQL is a named query stored in the database that acts like a virtual table. When you query a view, PostgreSQL executes the underlying SQL query and returns the results as if it were a regular table. Views don't store data themselves — they always reflect the current state of the underlying tables. Views are powerful for several reasons: they simplify complex queries by encapsulating JOINs and aggregations behind a simple name, they provide a security layer by exposing only specific columns or rows to users, they create a stable interface that doesn't break when underlying tables change, and they improve code reuse across applications. You can create views with CREATE VIEW, replace them with CREATE OR REPLACE VIEW, and drop them with DROP VIEW. Some views are even updatable — you can INSERT, UPDATE, or DELETE through them if they meet certain conditions.",
      realLifeAnalogy:
        "A view is like a window in a building. The window doesn't contain anything itself — it just gives you a specific perspective on what's outside (the actual data in tables). Different windows (views) in the same building show different angles of the same landscape. If something changes outside, every window immediately shows the updated scenery. You can also think of it as a saved recipe: instead of reciting the full recipe every time, you just say its name.",
      keyPoints: [
        "A view is a saved SQL query that acts as a virtual table",
        "Views don't store data — they always show current table data",
        "Simplify complex queries: wrap JOINs/aggregations behind a name",
        "Security: expose only specific columns or filtered rows to users",
        "CREATE OR REPLACE VIEW updates a view without dropping it",
        "Simple views (single table, no aggregation) can be updatable",
        "Views can reference other views (nested views)",
        "No performance benefit over running the query directly (unlike materialized views)",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Views =====

-- Setup tables
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(200),
  department VARCHAR(50),
  salary NUMERIC(10,2),
  hire_date DATE,
  is_active BOOLEAN DEFAULT true
);

INSERT INTO employees (name, email, department, salary, hire_date, is_active) VALUES
  ('Alice', 'alice@company.com', 'Engineering', 95000, '2021-03-15', true),
  ('Bob', 'bob@company.com', 'Engineering', 88000, '2022-01-10', true),
  ('Carol', 'carol@company.com', 'Marketing', 72000, '2020-07-22', true),
  ('Dave', 'dave@company.com', 'Marketing', 68000, '2023-05-01', true),
  ('Eve', 'eve@company.com', 'Sales', 78000, '2019-11-30', false),
  ('Frank', 'frank@company.com', 'Engineering', 105000, '2018-06-15', true);

-- 1. Create a simple view
CREATE VIEW active_employees AS
SELECT id, name, department, salary
FROM employees
WHERE is_active = true;

-- Query the view like a table
SELECT * FROM active_employees;

-- 2. View with JOINs and aggregation
CREATE VIEW department_stats AS
SELECT department,
       COUNT(*) AS employee_count,
       ROUND(AVG(salary), 2) AS avg_salary,
       MIN(salary) AS min_salary,
       MAX(salary) AS max_salary
FROM employees
WHERE is_active = true
GROUP BY department;

SELECT * FROM department_stats ORDER BY avg_salary DESC;

-- 3. Security view: hide sensitive columns
CREATE VIEW employee_directory AS
SELECT id, name, department
FROM employees
WHERE is_active = true;

-- Users with access to employee_directory can't see salary or email
SELECT * FROM employee_directory;

-- 4. Replace a view
CREATE OR REPLACE VIEW active_employees AS
SELECT id, name, department, salary, hire_date
FROM employees
WHERE is_active = true;

SELECT * FROM active_employees;

-- 5. Views reflect current data — update base table
UPDATE employees SET salary = 97000 WHERE name = 'Alice';
SELECT * FROM active_employees WHERE name = 'Alice';

-- 6. Drop a view
DROP VIEW IF EXISTS employee_directory;
`,
    },
    interviewQuestions: [
      {
        question: "What is a view and how is it different from a table?",
        difficulty: "Easy",
        hint: "A view is a stored SQL query that acts as a virtual table. Key differences: (1) A table stores data on disk; a view stores only the query definition. (2) Querying a view executes the underlying query each time. (3) Views always show current data from base tables. (4) Views can combine multiple tables into one logical table. (5) Views can restrict which columns/rows users see. Use views for simplification and security; use tables for actual data storage.",
      },
      {
        question: "What makes a view updatable, and what are the restrictions?",
        difficulty: "Medium",
        hint: "A view is automatically updatable in PostgreSQL when: (1) It references exactly one table in FROM. (2) No aggregate functions (COUNT, SUM, etc.). (3) No DISTINCT, GROUP BY, HAVING, LIMIT, OFFSET. (4) No UNION, INTERSECT, EXCEPT. (5) No window functions. (6) All columns in the view come from the base table. When these conditions are met, you can INSERT, UPDATE, DELETE through the view. For complex views, you can create INSTEAD OF triggers to handle modifications manually.",
      },
      {
        question: "What are the performance implications of views, and how do they compare to materialized views?",
        difficulty: "Hard",
        hint: "Regular views have NO performance benefit — the underlying query runs every time you SELECT from the view. If the query is complex (many JOINs, large tables), it's just as slow as running the query directly. Materialized views cache the result on disk, making reads instant but requiring REFRESH to update. Use regular views when: data must be real-time, query is simple, or you need updatability. Use materialized views when: the query is expensive, data staleness is acceptable, and reads vastly outnumber writes. Regular views add no storage overhead; materialized views consume disk space.",
      },
    ],
  },

  // 2. Materialized Views
  {
    id: "materialized-views",
    title: "Materialized Views",
    slug: "materialized-views",
    icon: "Database",
    difficulty: "Intermediate",
    description:
      "Learn how materialized views cache query results on disk for fast reads, and when to use them over regular views.",
    concept: {
      explanation:
        "A materialized view in PostgreSQL is a view that physically stores its query results on disk, like a cached snapshot. Unlike regular views that execute the query every time, materialized views compute the result once and serve it instantly on subsequent reads. This makes them ideal for expensive queries (complex JOINs, aggregations over large tables) that don't need real-time data. The trade-off is that materialized view data can become stale — it won't reflect changes to base tables until you run REFRESH MATERIALIZED VIEW. You can refresh concurrently (without locking reads) using REFRESH MATERIALIZED VIEW CONCURRENTLY, which requires a unique index on the materialized view. Materialized views can also be indexed, further speeding up queries. They're commonly used for dashboards, reports, analytics, and any scenario where query speed matters more than real-time accuracy.",
      realLifeAnalogy:
        "A regular view is like looking through a window — you see the live scene outside. A materialized view is like taking a photograph of that scene. The photo loads instantly every time you look at it, but it doesn't update when the scene changes. You need to take a new photo (REFRESH) to capture the latest state. For a dashboard that shows yesterday's sales totals, a photo (materialized view) is perfect — much faster than looking through the window and counting every time.",
      keyPoints: [
        "Materialized views store query results physically on disk",
        "Much faster reads than regular views — data is pre-computed",
        "Data can become stale until REFRESH MATERIALIZED VIEW is called",
        "REFRESH MATERIALIZED VIEW CONCURRENTLY avoids locking during refresh",
        "Concurrent refresh requires a UNIQUE INDEX on the materialized view",
        "Can create indexes on materialized views for even faster queries",
        "Ideal for dashboards, reports, and expensive aggregate queries",
        "Trade-off: uses disk space and data may not be real-time",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Materialized Views =====

-- Setup
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  product VARCHAR(100),
  category VARCHAR(50),
  amount NUMERIC(10,2),
  sold_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO sales (product, category, amount, sold_at)
SELECT
  'Product_' || (i % 20 + 1),
  CASE (i % 4)
    WHEN 0 THEN 'Electronics'
    WHEN 1 THEN 'Clothing'
    WHEN 2 THEN 'Food'
    WHEN 3 THEN 'Books'
  END,
  (random() * 200 + 10)::NUMERIC(10,2),
  NOW() - (random() * INTERVAL '90 days')
FROM generate_series(1, 1000) AS i;

-- 1. Create a materialized view
CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT
  DATE_TRUNC('month', sold_at) AS month,
  category,
  COUNT(*) AS total_orders,
  SUM(amount) AS total_revenue,
  ROUND(AVG(amount), 2) AS avg_order_value
FROM sales
GROUP BY DATE_TRUNC('month', sold_at), category
ORDER BY month DESC, total_revenue DESC;

-- 2. Query is instant — reads cached data
SELECT * FROM monthly_sales_summary;

-- 3. Add an index for faster queries
CREATE UNIQUE INDEX idx_monthly_sales
ON monthly_sales_summary(month, category);

-- 4. Filter the materialized view
SELECT * FROM monthly_sales_summary
WHERE category = 'Electronics'
ORDER BY month DESC;

-- 5. Insert new data into base table
INSERT INTO sales (product, category, amount)
VALUES ('New Product', 'Electronics', 299.99);

-- 6. Materialized view is STALE — doesn't show new data
SELECT * FROM monthly_sales_summary
WHERE category = 'Electronics'
ORDER BY month DESC
LIMIT 3;

-- 7. Refresh to update (locks reads during refresh)
REFRESH MATERIALIZED VIEW monthly_sales_summary;

-- 8. Concurrent refresh (no read lock, needs unique index)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_summary;

-- 9. Now shows updated data
SELECT * FROM monthly_sales_summary
WHERE category = 'Electronics'
ORDER BY month DESC
LIMIT 3;

-- 10. Check materialized view size
SELECT pg_size_pretty(pg_total_relation_size('monthly_sales_summary'));
`,
    },
    interviewQuestions: [
      {
        question: "What is a materialized view and how does it differ from a regular view?",
        difficulty: "Easy",
        hint: "A materialized view stores query results on disk; a regular view re-executes the query each time. Materialized: fast reads, stale data until REFRESH, uses disk space, can be indexed. Regular: always current data, slower for complex queries, no storage overhead. Use materialized views for expensive aggregations, dashboards, and reports. Use regular views for real-time data, simple queries, and updatable views.",
      },
      {
        question: "What is the difference between REFRESH MATERIALIZED VIEW and REFRESH MATERIALIZED VIEW CONCURRENTLY?",
        difficulty: "Medium",
        hint: "REFRESH MATERIALIZED VIEW takes an exclusive lock — no one can read the view during refresh. It replaces all data at once. REFRESH MATERIALIZED VIEW CONCURRENTLY allows reads during refresh by computing the new data alongside the old, then swapping. Requirements for CONCURRENTLY: (1) A UNIQUE INDEX must exist on the materialized view. (2) It's slower because it computes a diff. (3) It cannot be used on the first refresh (view must have data). Use CONCURRENTLY in production to avoid downtime; use regular REFRESH for initial loads or maintenance windows.",
      },
      {
        question: "How do you automate materialized view refreshes in production?",
        difficulty: "Hard",
        hint: "Automation strategies: (1) pg_cron extension — schedule periodic REFRESH: SELECT cron.schedule('refresh_mv', '*/15 * * * *', 'REFRESH MATERIALIZED VIEW CONCURRENTLY my_view'). (2) Application-level — refresh after batch writes or on a schedule via a job queue. (3) Trigger-based — refresh after N inserts or on specific events (careful: can be expensive). (4) Lazy refresh — track staleness and refresh on next read if stale. (5) Event-driven — use LISTEN/NOTIFY to trigger refresh after data changes. Best practice: use CONCURRENTLY, schedule during low-traffic periods, monitor refresh duration, and set up alerts if refresh fails.",
      },
    ],
  },

  // 3. Stored Procedures
  {
    id: "stored-procedures",
    title: "Stored Procedures",
    slug: "stored-procedures",
    icon: "Terminal",
    difficulty: "Advanced",
    description:
      "Learn how to create stored procedures in PostgreSQL for encapsulating complex operations with transaction control.",
    concept: {
      explanation:
        "Stored procedures in PostgreSQL (introduced in version 11) are named blocks of procedural code stored in the database that can be called with the CALL statement. Unlike functions, procedures can manage transactions — they can COMMIT and ROLLBACK within their body, making them ideal for multi-step operations that need intermediate commits. Procedures are written in PL/pgSQL (or other procedural languages) and can accept IN, OUT, and INOUT parameters. They don't return a value like functions do — instead they use OUT parameters or modify data directly. Common use cases include batch data processing, ETL operations, complex business logic with transaction control, and administrative maintenance tasks. Procedures encapsulate logic in the database layer, reducing network round trips and ensuring consistency.",
      realLifeAnalogy:
        "A stored procedure is like a recipe card in a professional kitchen. Instead of the head chef (application) calling out each step individually — 'heat the pan, add oil, add garlic, stir for 2 minutes' — they just say 'CALL make_garlic_sauce' and the sous chef (database) follows all the steps. If something goes wrong at step 3 (ROLLBACK), the sous chef can clean up and start over without the head chef managing every detail. The recipe (procedure) is stored in the kitchen (database), not carried around by the head chef.",
      keyPoints: [
        "Created with CREATE PROCEDURE, called with CALL",
        "Can manage transactions: COMMIT and ROLLBACK within the body",
        "Don't return values — use OUT parameters instead",
        "Written in PL/pgSQL or other procedural languages",
        "Ideal for batch processing and multi-step operations",
        "Reduce network round trips by encapsulating logic in the database",
        "Available since PostgreSQL 11 (before that, only functions existed)",
        "Can have IN, OUT, and INOUT parameters",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Stored Procedures =====

-- Setup: bank accounts
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  owner VARCHAR(100) NOT NULL,
  balance NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (balance >= 0)
);

CREATE TABLE transfer_log (
  id SERIAL PRIMARY KEY,
  from_account INT REFERENCES accounts(id),
  to_account INT REFERENCES accounts(id),
  amount NUMERIC(12,2),
  transferred_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO accounts (owner, balance) VALUES
  ('Alice', 5000.00),
  ('Bob', 3000.00),
  ('Carol', 1000.00);

-- 1. Create a stored procedure for money transfer
CREATE OR REPLACE PROCEDURE transfer_money(
  sender_id INT,
  receiver_id INT,
  transfer_amount NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Debit sender
  UPDATE accounts
  SET balance = balance - transfer_amount
  WHERE id = sender_id;

  -- Check if sender had enough funds
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Sender account % not found', sender_id;
  END IF;

  -- Credit receiver
  UPDATE accounts
  SET balance = balance + transfer_amount
  WHERE id = receiver_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Receiver account % not found', receiver_id;
  END IF;

  -- Log the transfer
  INSERT INTO transfer_log (from_account, to_account, amount)
  VALUES (sender_id, receiver_id, transfer_amount);

  -- Commit the transaction
  COMMIT;
END;
$$;

-- 2. Call the procedure
CALL transfer_money(1, 2, 500.00);

-- 3. Verify the transfer
SELECT * FROM accounts;
SELECT * FROM transfer_log;

-- 4. Procedure with OUT parameters
CREATE OR REPLACE PROCEDURE get_account_info(
  IN account_id INT,
  OUT account_owner VARCHAR,
  OUT account_balance NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
  SELECT owner, balance
  INTO account_owner, account_balance
  FROM accounts
  WHERE id = account_id;
END;
$$;

CALL get_account_info(1, NULL, NULL);

-- 5. Procedure for batch processing
CREATE OR REPLACE PROCEDURE apply_interest(
  rate NUMERIC DEFAULT 0.02
)
LANGUAGE plpgsql
AS $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN SELECT id, balance FROM accounts LOOP
    UPDATE accounts
    SET balance = balance + (balance * rate)
    WHERE id = rec.id;
  END LOOP;
  COMMIT;
END;
$$;

CALL apply_interest(0.05);
SELECT * FROM accounts;
`,
    },
    interviewQuestions: [
      {
        question: "What is a stored procedure and how is it different from a function?",
        difficulty: "Easy",
        hint: "Key differences: (1) Procedures use CALL; functions use SELECT or in expressions. (2) Procedures can manage transactions (COMMIT/ROLLBACK); functions cannot. (3) Procedures don't return values (use OUT params); functions return values. (4) Procedures can't be used in SELECT statements; functions can. (5) Both are stored in the database. Use procedures for multi-step operations needing transaction control (e.g., money transfers, batch processing). Use functions for computations, data transformations, and use in queries.",
      },
      {
        question: "When would you use a stored procedure over application-level code?",
        difficulty: "Medium",
        hint: "Use procedures when: (1) The operation needs multiple SQL statements with transaction control. (2) Network latency matters — procedures run in the database, avoiding round trips. (3) Multiple applications need the same logic — centralize in the database. (4) Data integrity is critical — enforce rules at the database level. (5) Batch processing — process millions of rows without transferring data. Use application code when: (1) Logic involves external APIs or services. (2) Business rules change frequently. (3) Complex error handling and logging is needed. (4) Testability and debugging are priorities.",
      },
      {
        question: "How does transaction control work inside stored procedures compared to functions?",
        difficulty: "Hard",
        hint: "Procedures: Can use COMMIT and ROLLBACK to end the current transaction and start a new one within the procedure body. Each COMMIT is permanent — the procedure can make partial progress. This is useful for batch processing where you commit every N rows. Functions: Cannot manage transactions. They run within the caller's transaction. If the function fails, the entire transaction (including the calling query) rolls back. Functions are atomic within their transaction. This fundamental difference is why procedures were added in PostgreSQL 11 — functions couldn't handle long-running batch operations that needed intermediate commits.",
      },
    ],
  },

  // 4. Functions
  {
    id: "postgresql-functions",
    title: "Functions",
    slug: "postgresql-functions",
    icon: "Code",
    difficulty: "Advanced",
    description:
      "Learn how to create custom PostgreSQL functions using SQL and PL/pgSQL for reusable logic, computed values, and trigger handlers.",
    concept: {
      explanation:
        "PostgreSQL functions (also called user-defined functions or UDFs) are named blocks of code that accept parameters, perform operations, and return a result. Functions can be written in multiple languages: SQL (for simple queries), PL/pgSQL (for procedural logic with variables, loops, conditionals), Python (PL/Python), and others. Functions can return scalar values (single value), rows (composite types), sets of rows (RETURNS SETOF or RETURNS TABLE), or void. They can be used anywhere in SQL: in SELECT lists, WHERE clauses, JOINs, DEFAULT values, and as trigger handlers. Functions are classified as VOLATILE (default — can modify data and return different results each call), STABLE (same results within a transaction), or IMMUTABLE (always same results for same inputs — can be optimized). Functions run within the caller's transaction and cannot COMMIT or ROLLBACK.",
      realLifeAnalogy:
        "A function is like a calculator on your desk. You give it inputs (parameters), it processes them following its programmed logic, and gives you back a result. You can use this calculator in different contexts: while filling out a form (in a SELECT), while making a decision (in a WHERE clause), or to prepare data for another step (in a trigger). The calculator itself doesn't change the paperwork on your desk — it just computes and returns answers. Some calculators give the same answer every time for the same inputs (IMMUTABLE), while others might check the clock or database state (VOLATILE).",
      keyPoints: [
        "Created with CREATE FUNCTION, called in SELECT or expressions",
        "Languages: SQL, PL/pgSQL, PL/Python, PL/Perl, and more",
        "Return types: scalar, row, SETOF (multiple rows), TABLE, void",
        "Volatility: IMMUTABLE (pure), STABLE (consistent per transaction), VOLATILE (default)",
        "Cannot manage transactions (no COMMIT/ROLLBACK — use procedures)",
        "Can be used in SELECT, WHERE, JOIN, DEFAULT, CHECK, and triggers",
        "IMMUTABLE functions can be used in index expressions",
        "Overloading: multiple functions with same name but different parameters",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== PostgreSQL Functions =====

-- 1. Simple SQL function
CREATE OR REPLACE FUNCTION add_numbers(a INT, b INT)
RETURNS INT
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT a + b;
$$;

SELECT add_numbers(3, 7);

-- 2. PL/pgSQL function with logic
CREATE OR REPLACE FUNCTION get_grade(score NUMERIC)
RETURNS VARCHAR
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  IF score >= 90 THEN RETURN 'A';
  ELSIF score >= 80 THEN RETURN 'B';
  ELSIF score >= 70 THEN RETURN 'C';
  ELSIF score >= 60 THEN RETURN 'D';
  ELSE RETURN 'F';
  END IF;
END;
$$;

SELECT get_grade(85), get_grade(72), get_grade(55);

-- 3. Function returning a table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  salary NUMERIC(10,2)
);

INSERT INTO employees (name, department, salary) VALUES
  ('Alice', 'Engineering', 95000),
  ('Bob', 'Engineering', 88000),
  ('Carol', 'Marketing', 72000),
  ('Dave', 'Sales', 78000);

CREATE OR REPLACE FUNCTION get_department_employees(dept VARCHAR)
RETURNS TABLE(emp_name VARCHAR, emp_salary NUMERIC)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
    SELECT name, salary FROM employees
    WHERE department = dept
    ORDER BY salary DESC;
END;
$$;

SELECT * FROM get_department_employees('Engineering');

-- 4. Function with DEFAULT parameters
CREATE OR REPLACE FUNCTION format_name(
  first_name VARCHAR,
  last_name VARCHAR,
  uppercase BOOLEAN DEFAULT false
)
RETURNS VARCHAR
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  full_name VARCHAR;
BEGIN
  full_name := first_name || ' ' || last_name;
  IF uppercase THEN
    RETURN UPPER(full_name);
  END IF;
  RETURN full_name;
END;
$$;

SELECT format_name('John', 'Doe');
SELECT format_name('John', 'Doe', true);

-- 5. Using function in WHERE clause
SELECT * FROM employees WHERE get_grade(salary / 1000) = 'A';

-- 6. Function for computed column default
CREATE OR REPLACE FUNCTION generate_code()
RETURNS VARCHAR
LANGUAGE sql
VOLATILE
AS $$
  SELECT 'ORD-' || LPAD(nextval('order_seq')::TEXT, 6, '0');
$$;

CREATE SEQUENCE order_seq;
SELECT generate_code(), generate_code();
`,
    },
    interviewQuestions: [
      {
        question: "What are the different volatility categories for PostgreSQL functions?",
        difficulty: "Easy",
        hint: "Three categories: (1) IMMUTABLE — always returns the same result for the same arguments. No database lookups, no side effects. Examples: math operations, string formatting. Can be used in index expressions. (2) STABLE — returns same result within a single transaction for same arguments. Can read the database but not modify it. Example: lookup functions. (3) VOLATILE (default) — can return different results each call, can modify database. Examples: random(), NOW(), functions that INSERT/UPDATE. Misclassifying volatility can cause incorrect query optimizations.",
      },
      {
        question: "What is the difference between RETURNS TABLE, RETURNS SETOF, and OUT parameters?",
        difficulty: "Medium",
        hint: "Three ways to return multiple values: (1) OUT parameters — define output variables in the function signature. Good for returning a single row with named columns. (2) RETURNS SETOF type — returns multiple rows of an existing type or table. Use RETURN NEXT or RETURN QUERY. (3) RETURNS TABLE(col1 type, col2 type) — defines an inline table type and returns multiple rows. Most flexible and readable. All three can be used with SELECT * FROM function(). RETURNS TABLE is generally preferred for clarity.",
      },
      {
        question: "How can functions impact query performance, and what are best practices?",
        difficulty: "Hard",
        hint: "Performance impacts: (1) VOLATILE functions in WHERE clauses prevent index usage — the planner can't optimize. Fix: mark functions IMMUTABLE or STABLE when possible. (2) Functions called per-row (in SELECT list or WHERE) execute once per row — O(n). Fix: use JOINs or CTEs instead. (3) PL/pgSQL functions have overhead vs inline SQL. (4) SQL-language functions can be 'inlined' by the planner for better optimization. Best practices: use correct volatility classification, prefer SQL language for simple functions (enables inlining), create expression indexes for IMMUTABLE functions, avoid calling functions in tight loops, use RETURNS TABLE with RETURN QUERY for set-returning functions.",
      },
    ],
  },

  // 5. Triggers
  {
    id: "triggers",
    title: "Triggers",
    slug: "triggers",
    icon: "Zap",
    difficulty: "Advanced",
    description:
      "Learn how to create triggers that automatically execute functions in response to INSERT, UPDATE, or DELETE events on tables.",
    concept: {
      explanation:
        "A trigger in PostgreSQL is a specification that the database should automatically execute a function whenever a certain event (INSERT, UPDATE, DELETE, or TRUNCATE) occurs on a table. Triggers can fire BEFORE (allowing you to modify or reject the data), AFTER (for logging or cascading actions), or INSTEAD OF (for views). They can execute FOR EACH ROW (once per affected row) or FOR EACH STATEMENT (once per SQL statement). The trigger function has access to special variables: NEW (the new row for INSERT/UPDATE), OLD (the old row for UPDATE/DELETE), TG_OP (the operation type), and TG_TABLE_NAME. Common use cases include: audit logging (tracking who changed what), auto-updating timestamps, enforcing complex business rules, maintaining derived/cached data, and preventing unauthorized changes. Triggers are powerful but should be used judiciously — they add hidden complexity and can impact performance.",
      realLifeAnalogy:
        "A trigger is like a motion-sensor light. When someone walks through a door (an INSERT happens), the light automatically turns on (the trigger function runs). You don't have to manually flip the switch — it happens automatically in response to the event. BEFORE triggers are like a security checkpoint before entering — they can stop you or modify your entry pass. AFTER triggers are like a security camera recording after you've entered — they log what happened but don't change the outcome.",
      keyPoints: [
        "Triggers automatically execute functions on INSERT, UPDATE, DELETE, or TRUNCATE",
        "BEFORE triggers can modify or reject data; AFTER triggers react to completed changes",
        "FOR EACH ROW fires once per row; FOR EACH STATEMENT fires once per query",
        "Trigger functions access NEW (new data) and OLD (old data) variables",
        "INSTEAD OF triggers work on views to make them updatable",
        "Common use: audit logs, auto-timestamps, enforcing business rules",
        "Triggers add hidden complexity — document and use judiciously",
        "Trigger execution order: BEFORE -> actual operation -> AFTER",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Triggers =====

-- Setup
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_log (
  id SERIAL PRIMARY KEY,
  table_name VARCHAR(50),
  operation VARCHAR(10),
  old_data JSONB,
  new_data JSONB,
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  changed_by VARCHAR(100) DEFAULT current_user
);

-- 1. Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_products_timestamp
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- 2. Audit log trigger
CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (table_name, operation, new_data)
    VALUES (TG_TABLE_NAME, 'INSERT', to_jsonb(NEW));
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (table_name, operation, old_data, new_data)
    VALUES (TG_TABLE_NAME, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW));
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (table_name, operation, old_data)
    VALUES (TG_TABLE_NAME, 'DELETE', to_jsonb(OLD));
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_products_audit
  AFTER INSERT OR UPDATE OR DELETE ON products
  FOR EACH ROW
  EXECUTE FUNCTION log_changes();

-- 3. Test the triggers
INSERT INTO products (name, price, stock) VALUES
  ('Laptop', 999.99, 50),
  ('Mouse', 29.99, 200);

-- Check audit log
SELECT * FROM audit_log;

-- Update triggers both timestamp and audit
UPDATE products SET price = 899.99 WHERE name = 'Laptop';

SELECT name, price, updated_at FROM products WHERE name = 'Laptop';
SELECT operation, old_data->>'price' AS old_price,
       new_data->>'price' AS new_price
FROM audit_log WHERE operation = 'UPDATE';

-- 4. BEFORE trigger for validation
CREATE OR REPLACE FUNCTION validate_price()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.price <= 0 THEN
    RAISE EXCEPTION 'Price must be positive, got %', NEW.price;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_price
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION validate_price();

-- This will fail:
-- INSERT INTO products (name, price) VALUES ('Bad Product', -10);
`,
    },
    interviewQuestions: [
      {
        question: "What is a trigger and what are the different trigger timing options?",
        difficulty: "Easy",
        hint: "A trigger automatically executes a function when an event occurs on a table. Timing options: (1) BEFORE — runs before the operation. Can modify NEW data or return NULL to cancel. (2) AFTER — runs after the operation completes. Used for logging, notifications. (3) INSTEAD OF — replaces the operation (only for views). Events: INSERT, UPDATE, DELETE, TRUNCATE. Granularity: FOR EACH ROW (per row affected) or FOR EACH STATEMENT (once per SQL command).",
      },
      {
        question: "What are NEW and OLD in trigger functions, and when is each available?",
        difficulty: "Medium",
        hint: "NEW and OLD are special variables in trigger functions: INSERT triggers: only NEW is available (the row being inserted). OLD is NULL. UPDATE triggers: both available. OLD = row before update, NEW = row after update. You can modify NEW in BEFORE triggers. DELETE triggers: only OLD is available (the row being deleted). NEW is NULL. TRUNCATE triggers: neither available (operates on the whole table). In BEFORE triggers, returning NULL cancels the operation. Returning NEW allows it to proceed (possibly modified).",
      },
      {
        question: "What are the potential pitfalls of using triggers, and how do you mitigate them?",
        difficulty: "Hard",
        hint: "Pitfalls: (1) Hidden logic — triggers fire implicitly, making debugging hard. (2) Cascading triggers — trigger A modifies table B, which fires trigger B, which modifies table C. Can cause infinite loops. (3) Performance — row-level triggers on bulk operations can be very slow (1M rows = 1M trigger calls). (4) Transaction issues — triggers run in the same transaction, so long-running triggers block commits. (5) Testing complexity — can't easily test in isolation. Mitigations: document all triggers thoroughly, use pg_trigger to list them, prefer statement-level triggers for bulk operations, use WHEN clauses to limit firing, avoid recursive triggers, keep trigger functions simple, and consider application-level alternatives for complex logic.",
      },
    ],
  },

  // 6. JSON and JSONB
  {
    id: "json-jsonb",
    title: "JSON and JSONB",
    slug: "json-jsonb",
    icon: "Braces",
    difficulty: "Advanced",
    description:
      "Learn how to store, query, and index JSON data in PostgreSQL using the JSON and JSONB data types.",
    concept: {
      explanation:
        "PostgreSQL provides two JSON data types: JSON (stores exact text, preserves formatting and duplicate keys) and JSONB (stores binary decomposed format, faster to query, supports indexing). JSONB is preferred in almost all cases because it's more efficient for querying and supports GIN indexes for fast lookups. PostgreSQL offers rich operators for JSON: -> extracts a JSON object by key (returns JSON), ->> extracts as text, @> checks containment, ? checks key existence, and #> navigates nested paths. You can index JSONB columns with GIN indexes for fast @>, ?, and ?& operations. JSONB bridges the gap between relational and document databases — you get the schema flexibility of MongoDB with the ACID guarantees and SQL power of PostgreSQL. Common use cases include storing user preferences, API responses, dynamic attributes, and event data.",
      realLifeAnalogy:
        "JSON in PostgreSQL is like having a filing cabinet (relational tables) where some drawers contain structured folders (regular columns), and one drawer contains flexible envelopes (JSONB columns) where each envelope can hold different documents. You can still search through the envelopes efficiently (GIN indexes), and they're protected by the same lock and key system (ACID transactions) as the structured folders. JSON is like storing the original handwritten letter (exact text); JSONB is like scanning and OCR-ing it into a searchable digital format (binary, faster to search).",
      keyPoints: [
        "JSON stores exact text; JSONB stores binary format (faster, indexable)",
        "JSONB is preferred — use JSON only when exact text preservation matters",
        "-> returns JSON element; ->> returns text; @> checks containment",
        "? checks if a key exists; ?| any key exists; ?& all keys exist",
        "#> and #>> navigate nested paths with array of keys",
        "GIN indexes on JSONB enable fast containment and key-existence queries",
        "jsonb_set(), jsonb_insert() for modifying JSONB data",
        "Bridges relational and document database paradigms",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== JSON and JSONB =====

-- 1. Create table with JSONB column
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50),
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO events (event_type, payload) VALUES
  ('user_signup', '{"user_id": 1, "name": "Alice", "email": "alice@test.com", "plan": "free"}'),
  ('purchase', '{"user_id": 1, "product": "Pro Plan", "amount": 29.99, "currency": "USD"}'),
  ('user_signup', '{"user_id": 2, "name": "Bob", "email": "bob@test.com", "plan": "pro", "referral": "alice"}'),
  ('page_view', '{"user_id": 1, "page": "/dashboard", "duration_ms": 3500}'),
  ('purchase', '{"user_id": 2, "product": "Team Plan", "amount": 99.99, "currency": "USD", "seats": 5}');

-- 2. Extract values with -> (JSON) and ->> (text)
SELECT
  payload->'name' AS name_json,       -- returns JSON: "Alice"
  payload->>'name' AS name_text,      -- returns text: Alice
  payload->>'email' AS email
FROM events
WHERE event_type = 'user_signup';

-- 3. Filter by JSONB value
SELECT * FROM events
WHERE payload->>'user_id' = '1';

-- 4. Containment operator @>
SELECT * FROM events
WHERE payload @> '{"plan": "pro"}';

-- 5. Key existence with ?
SELECT * FROM events
WHERE payload ? 'referral';

-- 6. Nested JSON access
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);

INSERT INTO users (profile) VALUES
  ('{"name": "Alice", "address": {"city": "NYC", "zip": "10001"}, "tags": ["admin", "beta"]}'),
  ('{"name": "Bob", "address": {"city": "LA", "zip": "90001"}, "tags": ["user"]}');

-- Navigate nested path
SELECT profile#>>'{address,city}' AS city FROM users;

-- 7. Modify JSONB with jsonb_set
UPDATE users
SET profile = jsonb_set(profile, '{address,city}', '"Chicago"')
WHERE profile->>'name' = 'Alice';

SELECT profile#>>'{address,city}' AS city FROM users;

-- 8. GIN index for fast JSONB queries
CREATE INDEX idx_events_payload ON events USING gin(payload);

-- These queries use the GIN index:
EXPLAIN SELECT * FROM events WHERE payload @> '{"plan": "pro"}';
EXPLAIN SELECT * FROM events WHERE payload ? 'referral';

-- 9. Aggregate JSONB data
SELECT
  payload->>'currency' AS currency,
  COUNT(*) AS purchases,
  SUM((payload->>'amount')::NUMERIC) AS total
FROM events
WHERE event_type = 'purchase'
GROUP BY payload->>'currency';
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between JSON and JSONB in PostgreSQL?",
        difficulty: "Easy",
        hint: "JSON stores the exact input text — preserves whitespace, key order, and duplicate keys. Faster to insert (no parsing), but slower to query. JSONB stores binary decomposed format — parses on input, removes whitespace, deduplicates keys, sorts keys. Slower to insert but much faster to query. JSONB supports GIN indexes for containment (@>) and key existence (?) operators. Use JSONB for almost everything. Use JSON only when you need exact text preservation (audit logs, API response archiving).",
      },
      {
        question: "What are the main JSONB operators and when do you use each?",
        difficulty: "Medium",
        hint: "Operators: (1) -> get JSON element by key/index (returns JSON). (2) ->> get element as text. (3) #> get nested element by path array. (4) #>> get nested element as text. (5) @> containment — does left contain right? (6) <@ contained by. (7) ? key exists. (8) ?| any of the keys exist. (9) ?& all keys exist. (10) || concatenate JSONB. Use -> and ->> for SELECT/WHERE. Use @> with GIN index for fast filtering. Use #> for nested access. Use ? for optional field checks. @> and ? can use GIN indexes.",
      },
      {
        question: "When should you use JSONB columns vs traditional relational columns?",
        difficulty: "Hard",
        hint: "Use JSONB when: (1) Schema varies between rows (user preferences, product attributes). (2) Storing semi-structured data (API responses, logs). (3) Schema evolves frequently without migrations. (4) Nested data structures are natural (addresses, configurations). Use relational columns when: (1) Data has a consistent schema. (2) You need foreign key constraints. (3) You query/filter on specific fields heavily. (4) You need CHECK constraints on values. (5) JOINs on the values are common. Hybrid approach: use relational columns for core structured data and a JSONB column for flexible metadata. Don't use JSONB as an excuse to avoid schema design — it should complement, not replace, proper normalization.",
      },
    ],
  },

  // 7. Full Text Search
  {
    id: "full-text-search",
    title: "Full Text Search",
    slug: "full-text-search",
    icon: "FileSearch",
    difficulty: "Advanced",
    description:
      "Learn PostgreSQL's built-in full-text search capabilities for efficient text searching with ranking, stemming, and language support.",
    concept: {
      explanation:
        "PostgreSQL's full-text search (FTS) provides a powerful way to search natural language text, going far beyond simple LIKE or ILIKE patterns. FTS works by converting text into tsvector (a sorted list of normalized words called lexemes) and search queries into tsquery (a query expression with operators). The matching operator @@ checks if a tsvector matches a tsquery. FTS supports: stemming (finding 'running' when searching 'run'), stop words removal (ignoring 'the', 'a', 'is'), language-aware processing, ranking results by relevance with ts_rank, highlighting matches with ts_headline, and prefix matching. You can create GIN indexes on tsvector columns for fast searches. FTS can handle multiple languages and custom dictionaries. It's a production-ready alternative to Elasticsearch for many use cases, with the advantage of being built into PostgreSQL — no separate infrastructure needed.",
      realLifeAnalogy:
        "Full-text search is like a librarian vs. a filing clerk. LIKE/ILIKE is like a filing clerk who only finds exact matches — ask for 'running' and they'll miss documents containing 'run', 'runs', or 'runner'. Full-text search is like a librarian who understands language: they know 'running' relates to 'run', they ignore common words like 'the' and 'a', they can rank results by relevance, and they can search across titles and descriptions simultaneously. The GIN index is like the library's catalog system — it makes searches instant.",
      keyPoints: [
        "tsvector: normalized, stemmed word tokens from a document",
        "tsquery: search expression with &(AND), |(OR), !(NOT) operators",
        "@@ operator matches tsvector against tsquery",
        "to_tsvector('english', text) converts text to searchable tokens",
        "to_tsquery('english', query) converts search terms to query",
        "ts_rank() scores results by relevance",
        "ts_headline() highlights matching terms in results",
        "GIN indexes on tsvector columns for fast full-text searches",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Full Text Search =====

-- Setup
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300),
  body TEXT,
  published_at DATE
);

INSERT INTO articles (title, body, published_at) VALUES
  ('Introduction to PostgreSQL', 'PostgreSQL is a powerful open-source relational database. It supports advanced features like JSON, full-text search, and partitioning.', '2024-01-15'),
  ('Database Indexing Strategies', 'Indexes are crucial for database performance. B-tree indexes support range queries while hash indexes are optimized for equality lookups.', '2024-02-20'),
  ('Building REST APIs with Node.js', 'Learn how to build scalable REST APIs using Node.js and Express. Connect to PostgreSQL databases for data persistence.', '2024-03-10'),
  ('Advanced SQL Query Optimization', 'Optimizing SQL queries involves understanding execution plans, using proper indexes, and rewriting queries to avoid common performance pitfalls.', '2024-04-05'),
  ('Full Text Search in PostgreSQL', 'PostgreSQL provides built-in full-text search capabilities. It supports stemming, ranking, and language-aware text processing without external tools.', '2024-05-12');

-- 1. Basic full-text search with @@
SELECT title FROM articles
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'database');

-- 2. Multiple search terms (AND)
SELECT title FROM articles
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'database & performance');

-- 3. OR search
SELECT title FROM articles
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'API | indexing');

-- 4. Stemming: 'optimizing' matches 'optimization', 'optimized'
SELECT title FROM articles
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'optimizing');

-- 5. Search across multiple columns
SELECT title FROM articles
WHERE to_tsvector('english', title || ' ' || body) @@
      to_tsquery('english', 'PostgreSQL & search');

-- 6. Rank results by relevance
SELECT title,
       ts_rank(to_tsvector('english', body),
               to_tsquery('english', 'PostgreSQL')) AS rank
FROM articles
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'PostgreSQL')
ORDER BY rank DESC;

-- 7. Highlight matching terms
SELECT title,
       ts_headline('english', body,
                   to_tsquery('english', 'database & performance'),
                   'StartSel=<<, StopSel=>>') AS highlighted
FROM articles
WHERE to_tsvector('english', body) @@ to_tsquery('english', 'database & performance');

-- 8. Add a stored tsvector column with GIN index
ALTER TABLE articles ADD COLUMN search_vector tsvector;

UPDATE articles SET search_vector =
  to_tsvector('english', title || ' ' || body);

CREATE INDEX idx_articles_search ON articles USING gin(search_vector);

-- Fast search using the index
EXPLAIN SELECT title FROM articles
WHERE search_vector @@ to_tsquery('english', 'PostgreSQL');

-- 9. Auto-update search_vector with a trigger
CREATE OR REPLACE FUNCTION articles_search_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', NEW.title || ' ' || NEW.body);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_articles_search
  BEFORE INSERT OR UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION articles_search_update();
`,
    },
    interviewQuestions: [
      {
        question: "How does full-text search differ from LIKE and ILIKE?",
        difficulty: "Easy",
        hint: "LIKE/ILIKE: (1) Pattern matching on exact strings. (2) No stemming — 'run' won't match 'running'. (3) Leading wildcards (%text) can't use indexes. (4) No relevance ranking. (5) Language-unaware. Full-text search: (1) Linguistic matching with stemming. (2) Stop word removal. (3) GIN-indexable for fast searches. (4) ts_rank for relevance scoring. (5) Language-aware processing. (6) Boolean operators (AND, OR, NOT). Use LIKE for exact patterns; use FTS for natural language search.",
      },
      {
        question: "What is a tsvector and a tsquery, and how do they work together?",
        difficulty: "Medium",
        hint: "tsvector: a sorted list of distinct lexemes (normalized words) extracted from a document. 'The quick brown fox' becomes 'brown':3 'fox':4 'quick':2 (positions stored, stop words removed, words stemmed). tsquery: a search expression with operators. 'quick & fox' means both must appear. 'cat | dog' means either. '!spam' means must not appear. The @@ operator checks if a tsvector satisfies a tsquery. to_tsvector('english', text) and to_tsquery('english', query) handle language-specific processing (stemming, stop words).",
      },
      {
        question: "How do you optimize full-text search performance in PostgreSQL?",
        difficulty: "Hard",
        hint: "Optimization strategies: (1) Store tsvector in a dedicated column — avoid computing it on every query. (2) Create GIN index on the tsvector column for fast searches. (3) Use a trigger to auto-update the tsvector column on INSERT/UPDATE. (4) Use setweight() to prioritize title matches over body matches: setweight(to_tsvector(title), 'A') || setweight(to_tsvector(body), 'B'). (5) Use websearch_to_tsquery() for user-friendly search input parsing. (6) Use GiST indexes instead of GIN for frequently-updated tables (GIN is faster for reads but slower to update). (7) For very large datasets, combine with partial indexes or partitioning.",
      },
    ],
  },

  // 8. Partitioning
  {
    id: "partitioning",
    title: "Partitioning",
    slug: "partitioning",
    icon: "LayoutGrid",
    difficulty: "Advanced",
    description:
      "Learn how to partition large tables in PostgreSQL for improved query performance, easier maintenance, and efficient data archival.",
    concept: {
      explanation:
        "Table partitioning in PostgreSQL splits a large table into smaller physical pieces called partitions, while still presenting them as a single logical table. PostgreSQL supports three partitioning strategies: Range partitioning (by value ranges — dates, IDs), List partitioning (by discrete values — categories, regions), and Hash partitioning (by hash function — even distribution). The main benefits are: query performance (partition pruning skips irrelevant partitions), easier maintenance (DROP partition instead of DELETE for bulk removal), parallel operations (VACUUM, indexing per partition), and efficient archival (detach old partitions). The parent table defines the structure and partitioning key; child partitions store the actual data. Each partition can have its own indexes and constraints. Partition pruning happens automatically when queries filter on the partition key, allowing PostgreSQL to scan only relevant partitions instead of the entire table.",
      realLifeAnalogy:
        "Partitioning is like organizing a massive filing cabinet by year. Instead of one giant cabinet with 10 years of invoices, you have 10 smaller cabinets labeled 2015-2024. When someone asks for 2023 invoices, you go directly to the 2023 cabinet (partition pruning) instead of searching through all 10 years. To archive old records, you simply remove the 2015 cabinet (DROP partition) — no need to sort through individual files. Each cabinet can have its own internal organization (indexes).",
      keyPoints: [
        "Splits a large table into smaller physical pieces (partitions)",
        "Three strategies: Range (dates, IDs), List (categories), Hash (even distribution)",
        "Partition pruning: queries only scan relevant partitions",
        "Each partition can have its own indexes and constraints",
        "DROP/DETACH partition for fast bulk data removal (vs slow DELETE)",
        "Parent table defines structure; child partitions store data",
        "Ideal for time-series data, logs, and tables with 100M+ rows",
        "Partitioning key must be included in any unique or primary key",
      ],
    },
    code: {
      language: "sql",
      defaultCode: `-- ===== Partitioning =====

-- 1. RANGE partitioning by date
CREATE TABLE events (
  id SERIAL,
  event_type VARCHAR(50),
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions for each quarter
CREATE TABLE events_2024_q1 PARTITION OF events
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE events_2024_q2 PARTITION OF events
  FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');

CREATE TABLE events_2024_q3 PARTITION OF events
  FOR VALUES FROM ('2024-07-01') TO ('2024-10-01');

CREATE TABLE events_2024_q4 PARTITION OF events
  FOR VALUES FROM ('2024-10-01') TO ('2025-01-01');

-- Insert data — automatically routed to correct partition
INSERT INTO events (event_type, payload, created_at) VALUES
  ('login', '{"user": "alice"}', '2024-02-15 10:30:00+00'),
  ('purchase', '{"amount": 99.99}', '2024-05-20 14:00:00+00'),
  ('login', '{"user": "bob"}', '2024-08-10 09:15:00+00'),
  ('signup', '{"user": "carol"}', '2024-11-05 16:45:00+00');

-- Query the parent table (scans all partitions)
SELECT * FROM events;

-- Partition pruning: only scans Q2 partition
EXPLAIN SELECT * FROM events
WHERE created_at >= '2024-04-01' AND created_at < '2024-07-01';

-- 2. LIST partitioning by category
CREATE TABLE orders (
  id SERIAL,
  region VARCHAR(20) NOT NULL,
  customer_name VARCHAR(100),
  total NUMERIC(10,2),
  PRIMARY KEY (id, region)
) PARTITION BY LIST (region);

CREATE TABLE orders_north PARTITION OF orders
  FOR VALUES IN ('north', 'northeast', 'northwest');

CREATE TABLE orders_south PARTITION OF orders
  FOR VALUES IN ('south', 'southeast', 'southwest');

CREATE TABLE orders_west PARTITION OF orders
  FOR VALUES IN ('west');

CREATE TABLE orders_east PARTITION OF orders
  FOR VALUES IN ('east');

INSERT INTO orders (region, customer_name, total) VALUES
  ('north', 'Alice', 150.00),
  ('south', 'Bob', 200.00),
  ('west', 'Carol', 175.00);

-- Only scans orders_north partition
EXPLAIN SELECT * FROM orders WHERE region = 'north';

-- 3. HASH partitioning for even distribution
CREATE TABLE sessions (
  id SERIAL,
  user_id INT NOT NULL,
  session_data JSONB,
  PRIMARY KEY (id, user_id)
) PARTITION BY HASH (user_id);

CREATE TABLE sessions_0 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE sessions_1 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE sessions_2 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE sessions_3 PARTITION OF sessions
  FOR VALUES WITH (MODULUS 4, REMAINDER 3);

-- 4. Drop old data by detaching/dropping partitions
-- ALTER TABLE events DETACH PARTITION events_2024_q1;
-- DROP TABLE events_2024_q1;  -- instant deletion of all Q1 data
`,
    },
    interviewQuestions: [
      {
        question: "What are the three types of partitioning in PostgreSQL?",
        difficulty: "Easy",
        hint: "1) Range partitioning — splits by value ranges. Best for time-series data: partition by month/quarter/year. Example: events before April go to Q1 partition. 2) List partitioning — splits by discrete values. Best for categories: partition by region, status, country. Example: 'north' orders go to orders_north. 3) Hash partitioning — splits by hash function modulus. Best for even distribution when no natural partition key exists. Example: user_id % 4 distributes across 4 partitions. Choose based on your data and query patterns.",
      },
      {
        question: "What is partition pruning and how does it improve performance?",
        difficulty: "Medium",
        hint: "Partition pruning is when PostgreSQL's query planner identifies which partitions can be skipped based on the query's WHERE clause. If you query WHERE created_at >= '2024-04-01' AND created_at < '2024-07-01' on a date-range-partitioned table, the planner only scans the Q2 partition and ignores Q1, Q3, Q4. This dramatically reduces I/O. For pruning to work: (1) The WHERE clause must filter on the partition key. (2) The condition must be evaluable at plan time (constants, not function results). (3) enable_partition_pruning must be on (default). Check with EXPLAIN — pruned partitions won't appear in the plan.",
      },
      {
        question: "What are the limitations and gotchas of table partitioning in PostgreSQL?",
        difficulty: "Hard",
        hint: "Limitations: (1) Primary key and unique constraints must include the partition key — can't have a globally unique id without including the partition column. (2) Foreign keys referencing partitioned tables are limited (improved in PG 12+). (3) No automatic partition creation — you must create partitions ahead of time (or use pg_partman extension). (4) Cross-partition queries (without partition key in WHERE) scan ALL partitions. (5) Each partition needs its own indexes. (6) UPDATE that changes the partition key moves the row between partitions (can be slow). (7) Too many partitions (thousands) can slow down planning. Best practices: use pg_partman for automatic management, keep partition count reasonable (tens to hundreds), always include partition key in queries.",
      },
    ],
  },
];

export const postgresqlModules: PostgreSQLModule[] = [
  {
    id: "postgresql-fundamentals",
    level: 1,
    title: "PostgreSQL Fundamentals",
    difficulty: "Beginner",
    description:
      "The foundation of PostgreSQL — learn the basics of relational databases, installation, architecture, data types, tables, constraints, and keys.",
    topicIds: [
      "introduction-to-postgresql",
      "installing-postgresql",
      "postgresql-architecture",
      "creating-a-database",
      "postgresql-data-types",
      "creating-tables",
      "altering-tables",
      "dropping-tables",
      "postgresql-constraints",
      "primary-key-and-foreign-key",
    ],
  },
  {
    id: "basic-queries",
    level: 2,
    title: "Basic Queries",
    difficulty: "Beginner",
    description:
      "Learn to retrieve, filter, and sort data — master the essential SQL query clauses including SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, and pattern matching operators.",
    topicIds: [
      "select-statement",
      "where-clause",
      "order-by",
      "limit-and-offset",
      "distinct",
      "aliases",
      "and-or-not-operators",
      "between-operator",
      "in-operator",
      "like-operator",
    ],
  },
  {
    id: "data-manipulation",
    level: 3,
    title: "Data Manipulation",
    difficulty: "Intermediate",
    description:
      "Master CRUD operations — learn INSERT, UPDATE, DELETE, UPSERT, bulk loading, and transaction control for reliable data manipulation.",
    topicIds: [
      "insert-statement",
      "update-statement",
      "delete-statement",
      "returning-clause",
      "upsert-on-conflict",
      "bulk-inserts",
      "transactions-basics",
      "commit-and-rollback",
    ],
  },
  {
    id: "joins",
    level: 4,
    title: "Joins",
    difficulty: "Intermediate",
    description:
      "Master combining data from multiple tables — learn INNER, LEFT, RIGHT, FULL, SELF, and CROSS joins with practical examples and join condition techniques.",
    topicIds: [
      "inner-join",
      "left-join",
      "right-join",
      "full-join",
      "self-join",
      "cross-join",
      "join-conditions",
      "multiple-table-joins",
    ],
  },
  {
    id: "aggregations-and-grouping",
    level: 5,
    title: "Aggregations & Grouping",
    difficulty: "Intermediate",
    description:
      "Summarize and analyze data — learn aggregate functions (COUNT, SUM, AVG, MIN, MAX), GROUP BY, HAVING, aggregations with joins, and window functions basics.",
    topicIds: [
      "count-function",
      "sum-function",
      "avg-function",
      "min-and-max",
      "group-by",
      "having-clause",
      "aggregations-with-joins",
      "window-functions-basics",
    ],
  },
  {
    id: "advanced-queries",
    level: 6,
    title: "Advanced Queries",
    difficulty: "Advanced",
    description:
      "Master complex query techniques — subqueries, correlated subqueries, EXISTS, CTEs, recursive CTEs, and set operations (UNION, INTERSECT, EXCEPT).",
    topicIds: [
      "subqueries",
      "correlated-subqueries",
      "exists-operator",
      "common-table-expressions",
      "recursive-cte",
      "union-and-union-all",
      "intersect-operator",
      "except-operator",
    ],
  },
  {
    id: "indexes-and-performance",
    level: 7,
    title: "Indexes & Performance",
    difficulty: "Advanced",
    description:
      "Optimize database performance — learn about index types (B-tree, Hash, Composite, Partial), query optimization techniques, and how to analyze execution plans with EXPLAIN.",
    topicIds: [
      "what-is-an-index",
      "creating-indexes",
      "btree-index",
      "hash-index",
      "composite-index",
      "partial-index",
      "query-optimization",
      "explain-analyze",
    ],
  },
  {
    id: "database-design",
    level: 8,
    title: "Database Design",
    difficulty: "Advanced",
    description:
      "Design efficient databases — master normalization (1NF, 2NF, 3NF), denormalization strategies, ER diagrams, relationship types, and schema design best practices.",
    topicIds: [
      "normalization",
      "first-normal-form",
      "second-normal-form",
      "third-normal-form",
      "denormalization",
      "er-diagrams",
      "database-relationships",
      "schema-design-best-practices",
    ],
  },
  {
    id: "advanced-features",
    level: 9,
    title: "Advanced Features",
    difficulty: "Advanced",
    description:
      "Master PostgreSQL's advanced production features — views, materialized views, stored procedures, functions, triggers, JSONB, full-text search, and table partitioning.",
    topicIds: [
      "views",
      "materialized-views",
      "stored-procedures",
      "postgresql-functions",
      "triggers",
      "json-jsonb",
      "full-text-search",
      "partitioning",
    ],
  },
];
