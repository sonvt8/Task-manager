const express = require('express');
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        creater: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(e)
    }
})

router.get('/tasks',async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (err) {
        res.status(500).send(e)
    }
})

router.get('/tasks/my-tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed //for URL:locahost:3000/tasks/my-tasks?completed=true
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 // -1: desc; 1: asc
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                //for URL:locahost:3000/tasks/my-tasks?limit=2&skip=1
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                //for URL:locahost:3000/tasks/my-tasks?sortBy=createdAt:desc
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(404).send(e)
    }
})

// Display all created own tasks by ID
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, creater: req.user._id})
        console.log(task)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(404).send(e)
    }
})

// Update your own created tasks by ID
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try {
        const task = await Task.findOne({_id, creater: req.user._id})

        if (!task) {
            return res.status(404).send('Task not found')
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Delete your own created tasks by ID
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, creater: req.user._id})

        if (!task) {
            return res.status(404).send('Task not found')
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router