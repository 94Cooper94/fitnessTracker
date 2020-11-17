const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbNote => {
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

// put call for updating workout (pushing in new data)
app.put('/api/workouts', ({ body }, res) => {
  db.Workout.updateEvents(body)
  .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
  .then(dbUser => {
    res.json(dbUser);
  })
  .catch(err => {
    res.json(err);
  });
});

// two more app.get calls for html routes
app.get("/stats", (req, res) => {
  db.Workout.find({})
    .then(dbUser => {
      res.sendFile(dbStats);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/exercise", (req, res) => {
  db.Workout.find({})
    .then(dbUser => {
      res.sendFile(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
