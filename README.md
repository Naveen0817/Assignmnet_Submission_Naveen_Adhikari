The Task Management API is a RESTful API built with Node.js and Express that allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks. It uses SQLite for data persistence during development and is designed to be simple, efficient, and easy to use.

Features
Create, retrieve, update, and delete tasks.

RESTful API endpoints for task management.

SQLite database for local data persistence.

CORS enabled for cross-origin resource sharing.

Getting Started
To get the API up and running on your local machine, follow these steps:

Clone the repository:
https://github.com/Naveen0817/Assignmnet_Submission_Naveen_Adhikari/tree/main

Navigate to the project directory:
cd task-management-api


Install the dependencies:
npm install


Start the server:
node server.js



The API will be running on http://localhost:3000.

Usage
To interact with the API, use HTTP clients like curl, Postman, or write your own client using JavaScript with fetch or axios.

Endpoints
GET /tasks: Retrieve all tasks.

POST /tasks: Create a new task.

GET /tasks/:id: Retrieve a single task by ID.

PUT /tasks/:id: Update an existing task.

DELETE /tasks/:id: Delete a task.

Examples
Create a new task:

bash

curl -X POST -H "Content-Type: application/json" -d '{"title":"New Task", "description":"Description for new task", "dueDate":"2023-05-20"}' http://localhost:3000/tasks
Retrieve all tasks:

bash
curl http://localhost:3000/tasks
