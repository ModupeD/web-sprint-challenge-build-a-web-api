// Write your "actions" router here!
const express = require("express");
const Actions = require("../actions/actions-model");
const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the adopters",
      });
    });
});

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "Adopter not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        message: "Error retrieving the adopters",
      });
    });
});

router.post("/", (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: "Error adding the adopter",
      });
    });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The adopter has been nuked" });
      } else {
        res.status(404).json({ message: "The adopter could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the adopter",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const { name, description, completed } = changes;

  if (!name || !description || !completed) {
    res
      .status(400)
      .json({ message: "Add a name, completed and a description" });
  } else {
    Actions.get(req.params.id).then((action) => {
      if (action) {
        Actions.update(req.params.id, changes)
          .then(() => {
            res.status(200).json(action);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).json({
              message: "Error updating the adopter",
            });
          });
      } else {
        res.status(404).json({ message: "The adopter could not be found" });
      }
    });
  }
});

module.exports = router;
