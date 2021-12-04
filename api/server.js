const express = require("express");
const projectRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");
const server = express();
server.use(express.json());

//server.get('',(req,res) => {
//Action.get()
// .then((dogs) => {
//  throw new Error("foo");
//  res.json(dogs);
// })
//.catch((err) => {
//res.status(500).json({ message: "something bad happened" });
//});

//})

server.use((req, res, next) => {
  console.log("hi from server.js!!!");
  console.log(`${req.method} ${req.path}`);
  next();
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Welcome to Projects</h2>
      <p>Welcome to the Projects API</p>
    `);
});

server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
