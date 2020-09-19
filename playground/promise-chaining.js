require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5f64bbca4826b60e9c4467c1', {age: 28}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 28})
}).then((result) => {
    console.log(result)
}).catch((e) => {
     console.log(e)
})