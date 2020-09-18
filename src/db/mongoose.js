const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

const me = new User({
    name: '   Vu    ',
    email: 'Tommyvu@gmail.com',
    age: 33,
    password: '123456p'
})

me.save().then(() => {
    console.log(me)
}).catch((err) => {
    console.log('Error!',err.errors)
})

// const Task = mongoose.model('Task',{
//     description: {type: String},
//     completed: {type: Boolean}
// })

// const myTask = new Task({
//     description: 'Training two hours in Dev',
//     completed: false
// })

// myTask.save().then(() => {
//     console.log(myTask)
// }).catch((err) => {
//     console.log(err)
// })