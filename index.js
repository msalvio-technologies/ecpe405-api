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
  .insertOne({title: "Second life, second chance", year: 2022})
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
  .updateOne({title: "Traffic in souls"},{ $set: {
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


//3. delete the given _id
app.delete("/delete", (req, res) => {db.collection("movies")
  .deleteOne({title: "The great train robbery?"})
  .then((records) => {
  return res.json(records);
  })
  .catch((err) => {
  console.log(err);
  return res.json({ msg: "There was an error processing your query" });
  }); 
});

app.listen(port, () => {
  console.log('Example app listening on port ${port}');
});