import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
  const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = {
      _id: new Date().getTime() + "",
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    }
    usersDao.createUser(newUser);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };
  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {
    const username = req.body.username;
    const updateInfo = req.body;
    const user = usersDao.findUserByUsername(username);
    if (!user) {
      res.sendStatus(404)
    } else {
      const userId = user._id;
      usersDao.updateUser(userId, updateInfo);
      res.sendStatus(200);
    }
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:uid", update);
};
export default AuthController;