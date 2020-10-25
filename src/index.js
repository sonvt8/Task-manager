const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('5f956de9e994940eca226110')
    // await task.populate('creater').execPopulate()
    // console.log(task.creater)

    const user = await User.findById('5f956ddae994940eca22610d')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()