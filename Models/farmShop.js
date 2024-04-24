const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect('mongodb://127.0.0.1:27017/farmShop',{useNewUrlParser: true , useUnifiedTopology: true })
.then(()=> {
    console.log("mongoose is connected")
})
.catch (err => {
    console.log("error in connection")
    console.log(err);
})

const ProductSchema = new mongoose.Schema({
     name: String,
     price: Number,
     seasons: {
        type: String,
        enum: ['winter','summer','rainy','snow']
     }
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products : [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Product = mongoose.model('Product',ProductSchema);
const Farm = mongoose.model('Farm',farmSchema);


//Product.insertMany([
  //  {name: 'mango', price: 3 , seasons: 'summer' },
   // {name: 'banana', price: 5 , seasons: 'winter' },
    //{name: 'orange', price: 6 , seasons: 'rainy' }
//])
const makeFarm = async()=> { 
    const farm = new Farm({ name: 'spinach', city: 'bihar'});
    const mango = await Product.findOne({name: 'mango'});
    farm.products.push(mango)
    await farm.save()
    console.log(farm);
}

const addProduct = async()=>{
    const farm = await Farm.findOne({ name: 'spinach'});
    const mango = await Product.findOne({ name: 'mango' })
    farm.products.push(mango);
    await farm.save();
    console.log(farm);
}

Farm.findOne({name: 'spinach'})
.populate('products')
.then(farm => console.log(farm))