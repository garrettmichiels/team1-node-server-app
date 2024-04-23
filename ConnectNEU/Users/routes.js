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
    if (!req.session.currentUser) {
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
        const currentUser = await dao.createUser(user);
        req.session["currentUser"] = currentUser;
        res.send(currentUser);
    } catch (e) {
      console.log("Error Creating User");
    }
  };

  const login =  async (req, res) => {
    const { username, password } = req.body;
    const ewq = await dao.findUserByCredentials(username, password);

    if (ewq) {
      req.session.currentUser = ewq;
      res.send(ewq);
    } else {
      res.status(401).send("Invalid credentials");
    }
  };

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateUser(id, req.body);
    console.log("update status", status)
    console.log("finding user with _id: ", id)
    const updatedUser = await dao.findUserBy_Id(id);
    req.session["currentUser"] = updatedUser;
    console.log("The current user has been updated to", updatedUser)
    res.json(updatedUser);
  };

  const deleteFollower = async (req, res) => {
    console.log(req.params.userId);
    const status = await dao.deleteFollower(req.params.userId, req.params.followerId);
    res.json(status);
};

const addFollower = async (req, res) => {
  console.log(req.params.userId);
  const status = await dao.addFollower(req.params.userId, req.params.followerId);
  res.json(status);
};

const addJobToUser = async (req, res) => {
  const status = await dao.addJobToUser(req.params.userId, req.params.job);
  res.json(status);
}

const deleteCompany = async (req, res) => {
  const status = await dao.deleteFollower(req.params.userId, req.params.companyId);
  res.json(status);
};

const addCompany = async (req, res) => {
  console.log(req.params.userId);
  const status = await dao.addCompany(req.params.userId, req.params.companyId);
  res.json(status);
};


  app.post("/api/users/profile", profile);
  app.post("/api/users/register", signup);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", signout);

  app.put("/api/users/:id", updateUser);


  app.get("/api/users", findUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/:username", findUserByUsername);
  app.delete("/api/users/:userId/followers/:followerId", deleteFollower);
  app.delete("/api/users/:userId/companies/:companyId", deleteCompany);
  app.put("/api/users/:userId/companies/:companyId", addCompany);
  app.put("/api/users/:userId/followers/:followerId", addFollower);
  app.put("/api/users/:userId/jobs/:jobId", addJobToUser);


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

