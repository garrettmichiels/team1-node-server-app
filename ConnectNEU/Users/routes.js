import * as dao from "./dao.js";

export default function UsersRoutes(app) {

  const findUsers = async (req, res) => {

    const users = await dao.findAllUsers();

    res.json(users);
  };

  const findUserById = async (req, res) => {
    const id = req.params.id;
    console.log("before u", id)

    const user = await dao.findUserById(id);
    console.log("found u", user)
    res.json(user);

  };

  const findUserByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };

  const profile = async (req, res) => {
    console.log("req.session user ", req.session.currentUser);
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
    console.log(req.body.user)
    const user = req.body;
    const existingUser = await dao.findUserByUsername(user.username);
    if (existingUser) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    existingUser = await dao.findUserByEmail(user.email);
    if (existingUser) {
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
    // console.log(username,password);
    const ewq = await dao.findUserByCredentials(username, password);
    // console.log("login node" , ewq);

    if (ewq) {
      // console.log("in session with current user");
      req.session.currentUser = ewq;
      res.send(ewq);
    } else {
      res.status(401).send("Invalid credentials");
    }
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    res.json(status);
  };

  const deleteFollower = async (req, res) => {
    const status = await dao.deleteFollower(req.params.userId, req.params.followerId);
    res.json(status);
};

    const addUserReview = async (req, res) => { 
        const {userId} = req.params
        const status = await dao.addReview(userId, req.body)
        const user = await dao.findUserById(userId)
        res.json(user)
    }
    const deleteUserReview = async (req, res) => { 
        const {userId, reviewId} = req.params
        const status = await dao.deleteReview(userId, reviewId)
        res.json(status)
    }

  app.post("/api/users/profile", profile);
  app.post("/api/users/register", signup);
  app.post("/api/users/login", login);

  app.put("/api/users/:id", updateUser);


  app.get("/api/users", findUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/:username", findUserByUsername);
  app.get("/api/users/:userId/followers/:followerId", deleteFollower);

  app.put("/api/users/:userId/reviews", addUserReview)
  app.delete("/api/users/:userId/reviews", deleteUserReview)

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

