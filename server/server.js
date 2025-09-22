const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

const db_eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    priority: {type: Boolean, default: false}
})

const db_eventModel = mongoose.model("Event", db_eventSchema)

app.post("/createEvent", async (req, res) => {
    const newEvent = new db_eventModel({name: req.body.name, date: req.body.date})
    await newEvent.save()

    console.log("hell yeah");
    res.json()
})

app.get("/fetchEvent", async (req, res) => {
    const foundEvent = await db_eventModel.findOne({_id: req.query.id})
    res.json(foundEvent)
})

app.get("/fetchEvents", async (req, res) => {   
    return res.json(await db_eventModel.find().lean())
})

app.patch("/updateEvent", async (req, res) => {
    console.log(req.body.event.date);
    
    await db_eventModel.findByIdAndUpdate(req.body.event._id, {name: req.body.event.name, date: req.body.event.date})
    res.json()
})

app.patch("/flipPriority", async (req, res) => {
    const updatedEvent = await db_eventModel.findOne({_id: req.body._id})
    updatedEvent.priority = !updatedEvent.priority
    await updatedEvent.save()

    res.json()
})

async function connectDb() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Konferencija")
        console.log("✅ Connected to database successfully!");
    } catch (err) {
        console.log(`❌ An error occurred: ${err}`);
    }
}

connectDb()

app.listen(5000, () => {
    console.log("✅ App hosted on port: 5000 successfully!");
})