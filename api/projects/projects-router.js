// Write your "projects" router here!
const express = require("express");
const Projects = require("../projects/projects-model");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the adopters",
      });
    });
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
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

// router.get("/api/projects", (req, res) => {
//   Projects.insert(req.params.id)
//     .then((project) => {
//       if (project) {
//         res.status(200).json(project);
//       } else {
//         res.status(404).json({ message: "Adopter not found" });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({
//         message: "Error retrieving the adopter",
//       });
//     });
// });

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: "Error adding the adopter",
      });
    });
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
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
  const { name, description, completed } = req.body;

  if (!name || !description || !completed) {
    res
      .status(400)
      .json({ message: "Add a name, completed and a description" });
  } else {
    Projects.get(req.params.id)
      .then((project) => {
        if (project) {
          return Projects.update(req.params.id, changes);
        } else {
          res.status(404).json({ message: "The adopter could not be found" });
        }
      })
      .then((data) => {
        if (data) {
          return Projects.get(req.params.id);
        }
      })
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          message: "Error updating the adopter",
        });
      });
  }
});

module.exports = router;
