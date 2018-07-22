const { registration, update, login } = require("./userController");

module.exports = router => {
  router.post("/register", registration);

  router.post("/update", update);

  router.get("/login", login);
};
