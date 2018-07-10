const { registration, update } = require("./userController");

module.exports = router => {
  router.post("/register", registration);

  router.get("/login", update);
};
