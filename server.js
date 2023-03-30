require("dotenv").config();
const express = require("express");
const app = express();
const {userRouter, ticketRouter, orderRouter} = require("./routes")


app.use(express.json())

app.get("/", (req, res) => {
    console.log(req.body);
    res.send("salam bache");
})

///////////////////////////////////////User

app.use("/api/v1/user", userRouter)
app.use("/api/v1/ticket", ticketRouter)
app.use("/api/v1/order", orderRouter)

app.get("/error", (req, res) => {
    throw new Error("Errorrrrrrr!");
})


app.use((error, req, res, next) => {
    console.log("ssssss", error.message);
    res.send(error.messsage);
})
/////////////////////////////////////////////////

app.use((req, res) => {
    res.send("Not Found")
})

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`run of port ${PORT}`);
});