const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("css"));
let items = [];
let workItems = [];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  var today = new Date();
  var day = "";

  // it gets the day because you put the list first and the getDay method gets the day of the week in a form of an interger
  // so its like saying weekday(list)[0] than it goes through the list and finds the number and 0 would be sunday and same rules apply for any day

  // since its 0 index day 6 is saturday and day 0 is sunday

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
console.log(req.body)
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function (req, res) {
  console.log("Server started on port 3000");
});
