export default function SessionRoutes(app) {
    app.get("/session/set/:key/:value", (req, res) => {
      const key = req.params.key;
      const value = req.params.value;
      req.session[key] = value;
      res.send(req.session);
    });
    app.get("/session/get/:key", (req, res) => {
      const key = req.params.key;
      res.send(req.session[key]);
    });
    app.get("/session/destroy", (req, res) => {
      req.session.destroy();
      res.send(req.session);
    });
    app.get("/session", (req, res) => {
      res.send(req.session);
    });
  }