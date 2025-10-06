const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

const db_eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    plugins: {type: Object, default: {}, minimize: false},
    priority: {type: Boolean, default: false}
})

const db_eventModel = mongoose.model("Event", db_eventSchema)

app.post("/createEvent", async (req, res) => {
    const newEvent = new db_eventModel({...req.body.newEvent, plugins: Object.keys(req.body.newEvent.plugins).length !== 0 ? req.body.newEvent.plugins : {"_": ""}})
    await newEvent.save()
    res.json(newEvent)
})

app.get("/fetchEvent", async (req, res) => {
    try {
        const foundEvent = await db_eventModel.findOne({_id: req.query.id}).lean()
        return res.status(200).json(foundEvent)
    } catch (err) {
        return res.sendStatus(500)
    }
})

app.get("/fetchEvents", async (req, res) => {   
    try {
        return res.json(await db_eventModel.find().lean())
    } catch (err) {
        return res.sendStatus(500)
    }
})

app.patch("/updateEvent", async (req, res) => {
    console.log(req.body.event.date);
    
    await db_eventModel.updateOne({_id: req.body.event._id}, {name: req.body.event.name, date: req.body.event.date, participants: req.body.event.participants})
    res.sendStatus(200)
})

app.patch("/flipPriority", async (req, res) => {
    const updatedEvent = await db_eventModel.findOne({_id: req.body._id})
    updatedEvent.priority = !updatedEvent.priority
    await updatedEvent.save()

    res.json()
})

app.delete("/deleteEvent", async (req, res) => {
    await db_eventModel.deleteOne({_id: req.body.id})
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