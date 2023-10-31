const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'mysuperpass',
  database: 'app'
};

const connection = mysql.createConnection(dbConfig);

// Function to check if a table exists
function tableExists(tableName) {
  const query = 'SHOW TABLES LIKE ?';
  return new Promise((resolve, reject) => {
    connection.query(query, [tableName], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

// Function to create a table
function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    );
  `;
  return new Promise((resolve, reject) => {
    connection.query(createTableQuery, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Initialize the application and the database connection
app.get('/', async (req, res) => {
  try {
    // Check if the 'people' table exists, and create it if it doesn't
    const tableExistsResult = await tableExists('people');
    if (!tableExistsResult) {
      await createTable();
    }

    // Insert data into the 'people' table
    const insertQuery = 'INSERT INTO people (name) VALUES (?)';
    connection.query(insertQuery, ['Aluno']);

    // Retrieve and display data from the 'people' table
    const selectQuery = "SELECT * FROM people WHERE name = 'Aluno'";
    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error in query: ' + err.message);
        connection.end();
        return res.status(500).json({ error: 'Error in the query.' });
      }

      const names = results.map((row) => row.name);
      const resultText = names.join(', ');

      return res.send(`
        <h1>FULL CYCLE ROCKS!!!</h1>
        ${resultText}
      `);
    });
  } catch (error) {
    console.error('Error: ' + error.message);
    return res.status(500).json({ error: 'Internal error.' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
