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
    priority: {type: Boolean, default: false},
    archived: {type: Boolean, default: false}
})

const db_eventModel = mongoose.model("Event", db_eventSchema)

app.post("/createEvent", async (req, res) => {
    try {
        const newEvent = new db_eventModel({...req.body.newEvent, plugins: Object.keys(req.body.newEvent.plugins).length !== 0 ? req.body.newEvent.plugins : {"_": ""}})
        await newEvent.save()
        console.log(newEvent);
        
        res.status(200).json(newEvent)
    } catch (_) {
        res.sendStatus(500)
    }
})

app.get("/fetchEvent", async (req, res) => {
    try {
        const foundEvent = await db_eventModel.findOne({_id: req.query.id}).lean()
        return res.status(200).json(foundEvent)
    } catch (_) {
        return res.sendStatus(500)
    }
})

app.get("/fetchEvents", async (_, res) => {   
    try {
        return res.status(200).json(await db_eventModel.find().lean())
    } catch (_) {
        return res.sendStatus(500)
    }
})

app.patch("/updateEvent", async (req, res) => {
    try {
        const target = req.body.target
        console.log(target, "update");

        await db_eventModel.updateOne({_id: target._id}, {name: target.name, date: target.date, plugins: target.plugins, archived: target.archived})
        res.sendStatus(200)
    } catch (_) {
        console.log(_);
        
        res.sendStatus(500)
    }
})

app.patch("/flipPriority", async (req, res) => {
    try {
        const updatedEvent = await db_eventModel.findOne({_id: req.body._id})
        updatedEvent.priority = !updatedEvent.priority
        await updatedEvent.save()
        res.sendStatus(200)
    } catch (_) {
        res.sendStatus(500)
    }
})

app.delete("/clearArchive", async (_, res) => {
    try {
        await db_eventModel.deleteMany({archived: true})
        res.sendStatus(200)
    } catch (_) {
        res.sendStatus(500)
    }
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