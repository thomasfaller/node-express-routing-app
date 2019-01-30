require("babel-register");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
// const members = require("./members");
const { success, error } = require("./functions");

const members = [
  { id: 1, name: "John" },
  { id: 2, name: "Julie" },
  { id: 3, name: "Jack" },
  { id: 4, name: "Paul" }
];

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/members/:id", (req, res) => {
  res.json(success(members[req.params.id - 1].names));
});

app.get("/api/v1/members", (req, res) => {
  if (req.query.max !== undefined && req.query.max > 0) {
    res.json(success(members.slice(0, req.query.max)));
  } else if (req.query.max !== undefined) {
    res.json(error("Wrong max value"));
  } else {
    res.json(success(members));
  }
});

app.post("/api/v1/members", (req, res) => {
  if (req.body.name) {
    let sameName = false;
    for (let i = 0; i < members.length; i++) {
      if (members[i].name == req.body.name) {
        sameName = true;
        break;
      }
    }

    if (sameName) {
      res.json(error("Member already exists."));
    } else {
      let member = {
        id: members.length + 1,
        name: req.body.name
      };
      members.push(member);
      res.json(success(member));
    }
  } else {
    res.json(error("No name value"));
  }
});

app.listen(8080, () => console.log("Started on port 8080"));
