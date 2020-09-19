require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5f6564be5a8637078c9b708b').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskandCount = async (id) => {
    const found = await Task.findById(id)
    if(!found){
        throw new Error('id does not exist')
    }else {
        const deleted = await Task.deleteOne(found)
    }
    const count  = await Task.countDocuments({completed : false})
    return count
}

deleteTaskandCount('5f6575bfe199a70db9bdbafd').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})