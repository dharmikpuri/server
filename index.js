const express = require("express")
const { connection } = require("./config/db")
var cors = require('cors')
const { productRouter } = require("./Routes/product.route")
const { userRouter } = require("./Routes/user.route")
const app = express()
app.use(cors())
app.use(express.json())
app.use("/product" , productRouter)
app.use("/user" , userRouter)

app.listen(8080, async()=> {
     try {
        await connection 
        console.log("database connected");

     } catch (error) {
        console.log(error)
     }
     console.log("server started on port 8080")
})