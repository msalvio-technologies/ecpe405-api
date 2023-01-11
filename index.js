const express = require("express");
const app = express();
const { MongoClient } = require("mongodb"); // https://github.com/mongodb/node-mongodb-native
const port = 3000;

// Set up default mongoose connection
const url = "mongodb+srv://altaras_server:Ns9YHnNb0ll4wtE1@cluster0.lppy8eb.mongodb.net/test";
const client = new MongoClient(url);

const dbName = "sample_mflix";
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
app.post("/insert", (req, res) => {
  db.collection("movies")
  .insertOne({title: "DanLorenz's Adventure", year: 2023})
  .then((records) => {
  return res.json(records);
  })
  .catch((err) => {
  console.log(err);
  return res.json({ msg: "There was an error processing your query" });
  });
  });

//2. update data of the given _id
app.put("/update", (req, res) => {
  db.collection("movies")
  .updateOne({title: "The Great Train Robbery"},{ $set: {
  runtime: 15
  }})
  .then((records) => {
  return res.json(records);
  })
  .catch((err) => {
  console.log(err);
  return res.json({ msg: "There was an error processing your query" });
  });
  });

//3. delete the given _id
app.delete("/delete", (req, res) => {db.collection("movies")
.deleteOne({title: "Blacksmith Scene"})
.then((records) => {
return res.json(records);
})
.catch((err) => {
console.log(err);
return res.json({ msg: "There was an error processing your query" });
});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
