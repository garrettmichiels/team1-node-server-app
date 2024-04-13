import * as dao from "./dao.js";

export default function UsersRoutes(app) {
  app.get("/api/users", async (req, res) => {
    // const currentUser = req.session["currentUser"];
    // if (!currentUser || currentUser.role !== "ADMIN") {
    //   res.status(401).send("Unauthorized");
    //   return;
    // }

    const users = await dao.findAllUsers();

    res.json(users);
  });


  app.get("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    // res.json(db.users.find((user) => user._id === id));
    const user = await dao.findUserById(id);
    res.json(user);
  });

  app.get("/api/users/:username", async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  });
}