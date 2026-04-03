const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../frontend')));

let tasks = [];

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const task = {
        id: Date.now(),
        title,
        description: description || '',
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    tasks.push(task);
    res.json(task);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.status = 'completed';
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});