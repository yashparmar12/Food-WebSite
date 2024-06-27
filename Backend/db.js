const mongoose = require('mongoose');
const url = 'mongodb+srv://userName:pass@cluster0.7fk8luh.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster0';

const DataBase = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Database Connected");

        const fetchData = await mongoose.connection.db.collection("food_items");
        const foodItemsData = await fetchData.find({}).toArray();

        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const foodCategoryData = await foodCategory.find({}).toArray();

        return { food_items: foodItemsData, foodCategory: foodCategoryData };
    } catch (err) {
        console.log(err);
        throw new Error("Error fetching data from MongoDB");
    }
    
};






// const DataBase = async () => {
//     try {
//         await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//         console.log("Database Connected");

//         const fetchData = await mongoose.connection.db.collection("food_items");
//         fetchData.find({}).toArray(function (err, data) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 global.food_items = data;
//                 console.log(global.food_items);
//             }
//         });

//         const foodCategory = await mongoose.connection.db.collection("foodCategory");
//         foodCategory.find({}).toArray(function (err, catData) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 global.foodCategory = catData;
//             }
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };


// const DataBase = async () => {

//     await mongoose.connect(url, { useNewUrlParser: true });

//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Database Connected");
//         const fetchData = await mongoose.connection.db.collection("food_items");
//         fetchData.find({}).toArray(async function (error, data) {
//             const foodCategory = await mongoose.connection.db.collection("foodCategory");
//             foodCategory.find({}).toArray(function (error, catData) {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     global.foodCategory = catData;
//                 }
//             })
//             if (error) {
//                 console.log(error);
//             } else {
//                 global.food_items = data;
//             }
//         })
//     }

    //     fetchData.find({}).toArray( async function(err,data){
    //         const foodCategory = await mongoose.connection.db.collection("foodCategory");
    //         foodCategory.find({}).toArray(function(err,catData){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 global.food_items = data;
    //                 global.foodCategory = catData;
    //             }
    //         })

    //     });
    // } catch (err) {
    //     console.log(err);
    // }
// };




module.exports = DataBase;
