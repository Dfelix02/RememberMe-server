const router = require("express").Router();

const User = require("../model/User");
const verify = require("./privateRoutes");
const { todoValidation } = require("../validation");

//update list
router.post("/list", verify, async (req, res, next) => {
  //   const validation = todoValidation(req.body.task);
  //   if (validation.error)
  //     return res.status(400).send(validation.error.details[0].message);

  try {
    const id = req.body.id;
    const user = User.findById(id);
    console.log(req.body.id);
    if (user) {
      console.log(req.body.task);

      const task = req.body.task;
      const list = user.todo;
      const newList = [task, ...list];
      const options = { new: true };
      const result = await User.findByIdAndUpdate(
        id,
        { todo: newList },
        options
      );
      res.send(result);
    } else {
    }
  } catch (err) {}
});

module.exports = router;
