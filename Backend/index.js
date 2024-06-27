const express = require('express');
// const cors = require('cors');
const DataBase = require("./db");
const router1 = require("./Routes/CreateUser");
const router2 = require("./Routes/DisplayData");

const app = express();
const Port = 5000;

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());
app.use("/api", router1);
app.use("/api", router2);

// app.get('/', async(req,res)=>{
//     res.send("<h1>MEthod runing</h1>")
// });



DataBase();
app.listen(Port, ()=>{
    console.log(`Server is listening at ${Port}`);
});

