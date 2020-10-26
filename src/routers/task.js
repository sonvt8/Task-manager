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

router.get('/tasks/mytasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(404).send(e)
    }
})

// Display v
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