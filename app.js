require("babel-register");
const express = require("express");
const morgan = require("morgan");
const app = express();

const members = [
  { id: 1, name: "John" },
  { id: 2, name: "Julie" },
  { id: 3, name: "Jack" },
  { id: 4, name: "Paul" }
];

app.use(morgan("dev"));

app.get("/api/v1/members/:id", (req, res) => {
  res.send(members[req.params.id - 1]);
});

app.get("/api/v1/members", (req, res) => {
  if (req.query.max !== undefined && req.query.max > 0) {
    res.send(members.slice(0, req.query.max));
  } else {
    res.send(members);
  }
});

app.listen(8080, () => console.log("Started on port 8080"));
