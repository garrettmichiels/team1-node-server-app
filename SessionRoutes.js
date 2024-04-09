export default function SessionRoutes(app) {
    app.get("/api/session/set/:key/:value", (req, res) => {
      const key = req.params.key;
      const value = req.params.value;
      req.session[key] = value;
      res.send(req.session);
    });
    app.get("/api/session/get/:key", (req, res) => {
      const {key} = req.params;
      const value = req.session[key];
      res.send(`${key} = ${value}`);
    });
    app.get("/api/session/destroy", (req, res) => {
      req.session.destroy();
      res.send(req.session);
    });

  }