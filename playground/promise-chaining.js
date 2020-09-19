require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5f64bbca4826b60e9c4467c1', {age: 28}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 28})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//      console.log(e)
// })

const updateAgeAndCount = async (id, email) => {
    const user = await User.findByIdAndUpdate(id, {email})
    const count = await User.countDocuments({email})
    return count
}

updateAgeAndCount('5f63682f58660d05a2e7a833','tommy@gmail.com').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})