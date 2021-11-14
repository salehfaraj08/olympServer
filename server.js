const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const jumperModel = require('./models/jumper.model').jumpersModel;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', (req, res) => {
    console.log(req.body);
    const { name, country, age, jumps } = req.body
    const newJumper = new jumperModel({
        name: name,
        country: country,
        age: age,
        jumps: jumps
    });
    newJumper.save();
    res.send(newJumper);
});

app.get('/', (req, res) => {
    jumperModel.find({}, (err, data) => {
        if (err) throw err;
        let newData = data;
        newData = newData.map(jumper => {
            console.log(jumper.jumps)
            let sum = parseInt(jumper.jumps.reduce((prev, curr) =>
                prev + curr, 0
            ) / 3);
            jumper = { ...jumper._doc, avg: sum };
            return jumper;
        });
        res.send(newData);
    });
});

app.delete('/jumper/delete/:deleteId', (req, res) => {
    const { deleteId } = req.params;
    console.log(deleteId);

    jumperModel.findByIdAndDelete(deleteId, (err, data) => {
        if (err) throw err;
        if (data) {
            return res.status(200).json({ success: data })
        }
        return res.status(400).json({ jumperNotFound: 'jumper not found' })
    });
});

app.put('/jumper/update/:updateId', (req, res) => {
    const { updateId } = req.params;
    jumperModel.findByIdAndUpdate(updateId, req.body, (err, data) => {
        if (err) throw err;
        res.send(data)
    });
});

mongoose.connect('mongodb+srv://saleh:saleh0811@cluster0.whijz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db');
});

app.listen(5001, () => console.log(`Listening on port 5001`));