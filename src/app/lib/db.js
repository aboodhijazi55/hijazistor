import { Client } from 'pg';

// Create a new client instance
const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "hijazistor",
    password: "afassgaahh1998",
    port: 5432,
});

// Connect to the database
db.connect();

// Export a query function to execute SQL queries
export const query = (text, params) => {
    return db.query(text, params);
};

// Export the module
// export default {
//     query,
// };