import mongoose from "mongoose";

export const connectDB =async() => {
    await mongoose.connect('mongodb+srv://lehongngan998:lehongngan998@cluster0.nrvsnxk.mongodb.net/food-order')
    .then(()=>console.log("DB connected"))
}