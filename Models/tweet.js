//here I am going to learn how to make a tweet website huff finally something intresting
const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect('mongodb://127.0.0.1:27017/tweet',{useNewUrlParser: true , useUnifiedTopology: true })
.then(()=> {
    console.log("mongoose is connected")
})
.catch (err => {
    console.log("error in connection")
    console.log(err);
})
//one user has many tweets here i will tell about 
const userSchema = new Schema({
  username: String,
  age: Number
});
//tweet Schema user->tweet means user is gonna use tweet schema 
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId,  ref: 'User'}
})


const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('tweet', tweetSchema);

//const makeTweets = async() => {
//    const user = new User({username: 'chickenfan99' , age: 61});
//    const tweet2= new Tweet({text: 'hi i dont like chickens' , likes: 200})
//    tweet2.user = user;
//    tweet2.save();
//}
//makeTweets();

const findTweet = async() =>{
    const t = await Tweet.findOne({}).populate('user');
    console.log(t)
}
findTweet();