import * as dao from "./dao.js";
import * as companyDao from "../Companies/dao.js"

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
    let user = await dao.findUserByUsername(req.body.username);
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
        console.log(currentUser)
        req.session["currentUser"] = currentUser;
        res.send(currentUser);

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

const addJobToUser = async (req, res) => {
  const status = await dao.addJobToUser(req.params.userId, req.params.job);
  res.json(status);
}

const deleteCompany = async (req, res) => {
  const status = await dao.deleteCompany(req.params.userId, req.params.companyId);
  res.json(status);
};

const addCompany = async (req, res) => {
  console.log(req.params.userId);
  console.log(req.params.companyId)
  console.log(req.body)
  try {
    const company = await companyDao.findCompanyByMuseId(req.params.companyId)
    console.log("company is", company)
    const status = await dao.addCompany(req.params.userId, company._id);
    res.json(status);
  } catch (e) {
    try{
      const create_status = await companyDao.createCompany(req.body)
      const company = await companyDao.findCompanyByMuseId(req.params.companyId)
      console.log("company is", company)
      const status = await dao.addCompany(req.params.userId, company._id);
      res.json(status);
    } catch (e) {
      console.log("couldn't create company")
    }
  }
};


  app.post("/api/users/profile", profile);
  app.post("/api/users/register", signup);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", signout);

  app.put("/api/users/:id", updateUser);


  app.get("/api/users", findUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/:username", findUserByUsername);
  app.delete("/api/users/:userId/companies/:companyId", deleteCompany);
  app.put("/api/users/:userId/companies/:companyId", addCompany);
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

