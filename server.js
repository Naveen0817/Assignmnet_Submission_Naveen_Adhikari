const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Open a database connection
const db = new sqlite3.Database('tasks.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the tasks database.');
        // Create the tasks table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            dueDate TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Tasks table created or already exists.');
            }
        });
    }
});

// Root path route handler
app.get('/', (req, res) => {
    res.send('Welcome to the Task Management API! Use /tasks to access the tasks.');
});

// Retrieve all tasks
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching tasks');
        } else {
            res.json(rows);
        }
    });
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;
    if (!title || !description || !dueDate) {
        return res.status(400).send('Title, description, and due date are required.');
    }
    db.run('INSERT INTO tasks (title, description, dueDate) VALUES (?, ?, ?)', [title, description, dueDate], function(err) {
        if (err) {
            res.status(500).send('Error inserting task');
        } else {
            res.status(201).json({ id: this.lastID, title, description, dueDate });
        }
    });
});

// Retrieve a single task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
        if (err) {
            res.status(500).send('Error fetching task');
        } else if (!row) {
            res.status(404).send('Task not found');
        } else {
            res.json(row);
        }
    });
});

// Update an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { title, description, dueDate } = req.body;
    db.run('UPDATE tasks SET title = ?, description = ?, dueDate = ? WHERE id = ?', [title, description, dueDate, taskId], function(err) {
        if (err) {
            res.status(500).send('Error updating task');
        } else if (this.changes === 0) {
            res.status(404).send('Task not found');
        } else {
            res.json({ id: taskId, title, description, dueDate });
        }
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    db.run('DELETE FROM tasks WHERE id = ?', [taskId], function(err) {
        if (err) {
            res.status(500).send('Error deleting task');
        } else if (this.changes === 0) {
            res.status(404).send('Task not found');
        } else {
            res.status(204).send();
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});