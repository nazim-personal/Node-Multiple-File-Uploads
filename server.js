
//import bodyParser = require ('body-)parser';
const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const dotenv = require('dotenv');
//import route = require ('./rou)tes/route.js';
const bodyParser = require('body-parser');
const fileRoute = require('./routes/file-upload-routes.js');
const path = require('path');
const app = express();

dotenv.config();
// @ts-ignore
app.use(bodyParser.json({ limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({ limit:"30mb", extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/server',(req, res)=>{
    res.send("Hello To Server Site");
});

//starting middleware
app.use(express.json());
// app.use(express.static(__dirname + "./uploads/"));
// app.use("/static", express.static("uploads"));

// if image upload
// app.use(express.static(__dirname + "uploads"));
// app.use("/uploads", express.static("uploads"));
//end of middleware

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api',fileRoute.routes);

process.setMaxListeners(0); // for this warning MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 exit listeners added to [Bus]. Use emitter.setMaxListeners() to increase limit
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server: ${PORT}`));
// @ts-ignore
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> app.listen(PORT, ()=>console.log(`Server is running on Port : ${PORT} `)))
.catch((error)=> console.log(error.message))

//  mongoose.set('useFindAndModify', true);
