require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('5f6564be5a8637078c9b708b').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})