require("babel-register");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const { members } = require("./members");
const { success, error, getIndex, createId } = require("./functions");

let MembersRouter = express.Router();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MembersRouter.route("/:id")
  // RETRIEVE A SINGLE MEMBER
  .get((req, res) => {
    let index = getIndex(members, req.params.id);
    if (typeof index == "string") {
      res.json(error(index));
    } else {
      res.json(success(members[index]));
    }
  })
  // EDIT A MEMBER
  .put((req, res) => {
    let index = getIndex(members, req.params.id);
    if (typeof index == "string") {
      res.json(error(index));
    } else {
      let same = false;
      for (let i = 0; i < members.length; i++) {
        if (
          req.body.name == members[i].name &&
          req.params.id != members[i].id
        ) {
          same = true;
          break;
        }
      }
      if (same) {
        res.json(error("Same name"));
      } else {
        members[index].name = req.body.name;
        res.json(success(true));
      }
    }
  })
  // REMOVE A MEMBER
  .delete((req, res) => {
    let index = getIndex(members, req.params.id);
    if (typeof index == "string") {
      res.json(error(index));
    } else {
      members.splice(index, 1);
      res.json(success(members));
    }
  });

MembersRouter.route("/")
  // RETRIEVE ALL MEMBERS
  .get((req, res) => {
    if (req.query.max !== undefined && req.query.max > 0) {
      res.json(success(members.slice(0, req.query.max)));
    } else if (req.query.max !== undefined) {
      res.json(error("Wrong max value"));
    } else {
      res.json(success(members));
    }
  })
  // CREATE A MEMBER
  .post((req, res) => {
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
          id: createId(members),
          name: req.body.name
        };
        members.push(member);
        res.json(success(member));
      }
    } else {
      res.json(error("No name value"));
    }
  });

app.use("/api/v1/members", MembersRouter);

app.listen(8080, () => console.log("Started on port 8080"));
