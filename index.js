const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("kc18july23");
  const coll = db.collection("student");
  const data = {
    _id: req.body.rno,
    name: req.body.name,
    marks: req.body.marks,
  };
  coll
    .insertOne(data)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/read", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("kc18july23");
  const coll = db.collection("student");
  coll
    .find({})
    .toArray()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.put("/update/:rno", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("kc18july23");
  const coll = db.collection("student");
  const rnoToUpdate = req.params.rno;
  const updatedData = {
    name: req.body.name,
    marks: req.body.marks,
  };
  coll
    .updateOne({ _id: rnoToUpdate }, { $set: updatedData })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.send({ updatedId: rnoToUpdate });
      } else {
        res.status(404).send("Record not found");
      }
    })
    .catch((err) => res.send(err));
});

app.delete("/remove", (req, res) => {
  const url = "mongodb://0.0.0.0:27017";
  const client = new MongoClient(url);
  const db = client.db("kc18july23");
  const coll = db.collection("student");
  const data = {
    _id: req.body.rno,
  };
  console.log(data);
  coll
    .deleteOne(data)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.listen(9000, () => {
  console.log("server ready @ 9000");
});
