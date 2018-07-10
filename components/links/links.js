const {
  addLink,
  updateLink,
  deleteLink,
  getLastWeek
} = require("./linksController");

module.exports = router => {
  router.post("/addlink", addLink);

  router.get("/update", updateLink);

  router.get("/delete", deleteLink);

  router.get("/getlinks", getLastWeek);
};
