const express = require("express");
const app = express();
const {userRouter} = require("./routes")


app.use(express.json())

app.get("/", (req, res) => {
    console.log(req.body);
    res.send("salam bache");
})

///////////////////////////////////////User

app.use("/api/v1/user", userRouter)


/////////////////////////////////////////////////

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`run of port ${PORT}`);
});