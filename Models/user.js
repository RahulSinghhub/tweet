const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/relationDemo',{useNewUrlParser: true , useunifiedTopology: true})
.then ( () => {
    console.log('mongoose connection established')
})
.catch((err)=>{
    console.log("connection not established")
    console.log(err)
})
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})
const User = mongoose.model('User', userSchema);

const makeUser = async() => {
    const u =new User({
        first: 'harry',
        last : 'potter'
    })
    u.address.push({
        street: '123 lane',
        city: 'new York',
        state: 'Ny',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}
makeUser();