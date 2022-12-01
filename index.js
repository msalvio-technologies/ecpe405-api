// ALCIR R. COSAS ENCE4A

const express = require("express");
const app = express();
const { MongoClient } = require("mongodb"); // https://github.com/mongodb/node-mongodb-native
const port = 3000;

// Set up default mongoose connection
const url = "mongodb://localhost:27018";
const client = new MongoClient(url);

const dbName = "mflix";
let db;
client
  .connect()
  .then(async () => {
    db = client.db(dbName);

    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
    console.log("Unable to connect to Mongodb");
  });

//getting all movies (limit only 5 movies to save processing time)
app.get("/", (req, res) => {
  db.collection("movies")
    .find({})
    .limit(5) //uncomment to display all
    .toArray()
    .then((records) => {
      return res.json(records);
    })
    .catch((err) => {
      console.log(err);
      return res.json({ msg: "There was an error processing your query" });
    });
});

//1. insert data
app.post("/insert", (req, res) => {});

//2. update data of the given _id
app.put("/update", (req, res) => {
  db.collection("movies")
  .updateOne({title: "A Corner in Wheat"}, {$set: {year: 2022}})
  .then((records) => {return res.json(records);})
  .catch((err)=> {console.log(err); 
    return res.json({ msg: "There was an error processing your query" });
  });
});

//3. delete the given _id
app.delete("/:_id", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
