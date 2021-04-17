const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config();
const fs = require('fs-extra');

const app = express()
const port = 8888

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('doctors'));
app.use(fileUpload())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2jkon.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

client.connect(err => {
    const adminsCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION);
    const coursesCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION2);
    const studentsCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION3);
    const reviewsCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION4);
    app.post('/addAdmin', (req, res) => {
        try {
            const admin = req.body.email;
            adminsCollection.insertOne({ email: admin })
                .then(result => {
                    res.send(result.insertedCount > 0);
                })
        }
        catch {
            res.send(false);
        }
    })

    app.post('/addCourse', (req, res) => {
        try {
            const file = req.files.file;
            const title = req.body.title;
            const fee = req.body.fee;
            const shortDescription = req.body.shortDescription;
            const newImg = file.data;
            const encImg = newImg.toString('base64');
            var img = {
                contentType: file.mimetype,
                size: file.size,
                img: Buffer.from(encImg, 'base64')
            };

            coursesCollection.insertOne({ title, fee, shortDescription, img })
                .then(result => {
                    res.send(result.insertedCount > 0);
                })
        }
        catch {
            res.send(false);
        }
    });

    app.get('/allCourses', (req, res) => {
        try {
            coursesCollection.find({})
                .toArray((err, docs) => {
                    res.send(docs);
                })
        }
        catch {
            res.send([]);
        }
    })

    app.get('/course/:id', (req, res) => {
        try {
            const id = ObjectID(req.params.id);
            console.log(id);
            coursesCollection.find({ _id: id })
                .toArray((err, document) => {
                    res.send(document[0]);
                })
        }
        catch {
            res.send({})
        }
    });

    app.post('/addStudent', (req, res) => {
        try {
            const data = req.body;
            studentsCollection.insertOne(data)
                .then(result => {
                    res.send(result.insertedCount > 0);
                })
        }
        catch {
            res.send(false);
        }
    });

    app.get('/enrolledCourses', (req, res) => {
        try {
            const email = req.query.email;
            console.log(email);
            studentsCollection.find({ "email": email })
                .toArray((err, docs) => {
                    if (docs.length) {
                        res.send(docs);
                    }
                    else {
                        res.send([]);
                    }
                })
        }
        catch {
            res.send([]);
        }
    });

    app.post('/addReview', (req, res) => {
        try {
            const name = req.body.name;
            const city = req.body.city;
            const review = req.body.review;
            const img = req.body.img;
            reviewsCollection.insertOne({ name, city, review, img })
                .then(result => {
                    res.send(result.insertedCount > 0);
                })
        }
        catch {
            res.send(false);
        }
    })

    app.get('/reviews', (req, res) => {
        try {
            reviewsCollection.find({})
                .toArray((err, docs) => {
                    res.send(docs);
                })
        }
        catch {
            res.send([]);
        }
    })

    app.delete('/deleteCourse/:id', (req, res) => {
        try {
            const id = ObjectID(req.params.id);
            console.log(id);
            coursesCollection.findOneAndDelete({ _id: id })
                .then(document => {
                    res.send({ "message:": "delete" });
                })
        }
        catch {
            res.send(false);
        }
    })

    app.get('/allStudents', (req, res) => {
        try {
            studentsCollection.find({})
                .toArray((err, docs) => {
                    res.send(docs);
                })
        }
        catch {
            res.send([]);
        }
    })

    app.post('/updateStatus', (req, res) => {
        try {
            const id = req.body.id;
            const status = req.body.status;
            console.log(id, status);
            studentsCollection.updateOne({ _id: ObjectID(id) }, {
                $set: { "courseStatus": status }
            })
                .then(result => {
                    res.send(result.modifiedCount > 0)
                })
        }
        catch {
            res.send(false);
        }
    })

    app.get('/isAdmin', (req, res) => {
        try {
            const email = req.query.email;
            adminsCollection.find({email: email})
            .toArray((err, result) => {
                if(result.length){
                    res.send(true);
                }
                else{
                    res.send(false);
                }
            })
        }
        catch {
            res.send(false);
        }
    });

})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})