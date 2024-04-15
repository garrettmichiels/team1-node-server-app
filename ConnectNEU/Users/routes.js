import * as dao from "./dao.js";

export default function UsersRoutes(app) {

  const findUsers = async (req, res) => {

    const users = await dao.findAllUsers();

    res.json(users);
  };

  const findUserById = async (req, res) => {
    const id = req.params.id;
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
    console.log("req.session", req.session);
    if (!req.session.currentUser) {
      console.log("Not logged in");
      res.status(401).send("Not logged in");
      return;
    }
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

    try{
        const newUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.send(newUser);
    } catch (e) {
      console.log("Error Creating User");
    }
  };


  const login =  async (req, res) => {
    const { username, password } = req.body;
    const ewq = await dao.findUserByCredentials(username, password);

    if (ewq) {
      console.log("in session with current user");
      console.log(username);
      req.session.currentUser = ewq;
      res.send(ewq);
    } else {
      res.status(401).send("Invalid credentials");
    }
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    currentUser = await dao.findUserById(userId);
    res.json(status);
  };

  app.post("/api/users/profile", profile);
  app.post("/api/users/register", signup);
  app.post("/api/users/login", login);

  app.put("/api/users/:id", updateUser);


  app.get("/api/users", findUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/:username", findUserByUsername);
}

//   app.post("/api/users/login", async (req, res) => {
//     const { username, password } = req.body;
//     const ewq = await dao.findUserByCredentials(username, password);

//     if (ewq) {
//       req.session.currentUser = ewq;
//       res.send(ewq);
//     } else {
//       res.status(401).send("Invalid credentials");
//     }
//   });
// }

