const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let moods = [
  {
    id: 1,
    date: "2026-05-01",
    mood: "Happy",
    energy: 10,
    comment: "Had a great day!"
  }
];

app.get("/", (req, res) => {
  res.render("index");
});

//add mood
app.get("/addMood", (req, res) => {
  res.render("addMood");
});

app.post("/addMood", (req, res) => {

  const { date, mood, energy, comment } = req.body;

  const newMood = {
    id: moods.length + 1,
    date,
    mood,
    energy,
    comment
  };

  moods.push(newMood);

  res.redirect("/moods");
});

//edit mood
app.get("/editMood/:id", (req, res) => {

  const mood = moods.find(m => m.id == req.params.id);

  res.render("editMood", { mood });
});

app.post("/editMood/:id", (req, res) => {

  const moodEntry = moods.find(m => m.id == req.params.id);

  const { date, mood, energy, comment } = req.body;

  moodEntry.date = date;
  moodEntry.mood = mood;
  moodEntry.energy = energy;
  moodEntry.comment = comment;

  res.redirect("/moods");
});

//delete mood
app.post("/deleteMood/:id", (req, res) => {

  moods = moods.filter(m => m.id != req.params.id);

  res.redirect("/moods");
});

//filter moods
app.get("/moods", (req, res) => {

  const { mood, date } = req.query;

  let filteredMoods = moods;

  if (mood) {
    filteredMoods = filteredMoods.filter(
      m => m.mood === mood
    );
  }

  if (date) {
    filteredMoods = filteredMoods.filter(
      m => m.date === date
    );
  }

  res.render("moods", {
    moods: filteredMoods
  });
});

app.get("/moodCalendar", (req, res) => {
  res.render("moodCalendar", { moods });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});