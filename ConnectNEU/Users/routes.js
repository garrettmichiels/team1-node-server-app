import * as dao from "./dao.js";

export default function UsersRoutes(app) {
  const findUsers = async (req, res) => {
    // const currentUser = req.session["currentUser"];
    // if (!currentUser || currentUser.role !== "ADMIN") {
    //   res.status(401).send("Unauthorized");
    //   return;
    // }

    const users = await dao.findAllUsers();

    res.json(users);
  };

  const findUserById = async (req, res) => {
    const id = req.params.id;
    // res.json(db.users.find((user) => user._id === id));
    const user = await dao.findUserById(id);
    res.json(user);
  };

  const findUserByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };

  const profile = async (req, res) => {
    console.log("[6] profile");
    console.log("[7] req.session", req.session);
    if (!req.session.currentUser) {
      console.log("[8] Not logged in");
      res.status(401).send("Not logged in");
      return;
    }
    console.log("[9] req.session.currentUser", req.session.currentUser);
    res.send(req.session.currentUser);
  };


  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    user = await dao.findUserByEmail(req.body.email);
    if (user) {
      res.status(400).json(
        { message: "Email already taken" });
    }
    
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  app.post("/api/users/profile", profile);
  app.get("/api/users", findUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/:username", findUserByUsername);
}