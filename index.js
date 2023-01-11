//Angelica De La Torre ENCE4A

const express = require("express");
const app = express();
const { MongoClient } = require("mongodb"); // https://github.com/mongodb/node-mongodb-native
const port = 3000;

// Set up default mongoose connection
const url = "mongodb://127.0.0.1";
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
app.post("/insert", (req, res) => {
  db.collection("movies")
  .insertOne({title: "The Unconditional Love", year: 2021})
  .then((records) => {
    return res.json(records);
  })
  .catch((err) => {
    console.log(err);
    return res.json({ msg: "There was an error processing your query" });
  });
});

//2. update data
app.put("/update", (req, res) => {
  db.collection("movies")
  .updateOne({title: "Traffic in Souls"},{ $set: {
    year: 2023
  }})
  .then((records) => {
    return res.json(records);
  })
  .catch((err) => {
    console.log(err);
    return res.json({ msg: "There was an error processing your query" });
  });
});

//3. delete
app.delete("/delete", (req, res) => {db.collection("movies")
  .deleteOne({title: "In the Land of the Head Hunters"})
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
