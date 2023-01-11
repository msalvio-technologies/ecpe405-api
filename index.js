//Balceda, John Michael A.
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb"); // https://github.com/mongodb/node-mongodb-native
const port = 3000;

app.use(express.json());
//Balceda, John Michael A.
// Set up default mongoose connection
const url = "mongodb://0.0.0.0:27017";
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
app.post("/insert", async (req, res) => {


  const movie = new Object({
    movie_name: req.body.movie_name,
    movie_genre: req.body.movie_genre
  });


  // db.collection("movies").markModified('movies');
  const savedUse = await db.collection("movies").insertOne(movie);
  res.send({
    _id: movie._id,
    status: "Created"
  });
});

//2. update data of the given _id
app.put("/update/:id", (req, res) => {
  db.collection("movies")
  .updateOne({movie_name: "Transformers"},{ $set: { movie_name:"Transoformer"
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
app.delete("/delete/:id", async (req, res) => {
  await db.collection("movies")
    .deleteOne({movie_name:req.params.id})
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
