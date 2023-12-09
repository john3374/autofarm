const express = require("express");
const http = require("http");
const https = require("https");
const db = require("../mysqlPool");
const router = express.Router();

const gstrFG = (res, path, iduser) => {
  if (1)
    // TODO: make login work...
    http
      .request({ host: "192.168.2.76", path }, (res2) => {
        let str = "";
        res2.on("data", (chunk) => (str += chunk));
        res2.on("end", () => {
          try {
            const obj = JSON.parse(str.replace(/([a-zA-Z]+)/gi, '"$1"'));
            obj.location = 1;
            // TODO: change to POST with body
            if (path !== "/status") {
              const ddh = path.split("-");
              let idequip = 0,
                status = "";
              if (ddh[0].endsWith("pump")) idequip = 2;
              else if (ddh[0].endsWith("light")) idequip = 1;
              if (ddh[1] === "on") status = "off";
              else if (ddh[1] === "off") status = "on";
              const ntfy = https.request({ hostname: "ntfy.akfn.net", port: 443, path: "/farm", method: "POST" });
              ntfy.write(`${ddh[0]} ${status}`);
              ntfy.end();
              db.pool.query("INSERT INTO usagelog (idequipment, idlocation, status, createdBy) values (?,?,?,?)", [idequip, obj.location, status, 1]);
            }
            res.json(obj);
          } catch (e) {
            res.status(500).end();
          }
        });
      })
      .end();
  else {
    res.status(401);
    res.end();
  }
};

let data = {
  lightStart: 0,
  lightDuration: 18,
  pumpInterval: 8,
};
let lastUpdate = 0,
  statusCache = null;

router.get("/", (req, res) => {
  const { auth_token, auth_expiry } = req.session;
  if (auth_expiry < new Date().getTime()) res.redirect("/account/signin");
  else res.render("index", { auth_token });
});

router.get("/status", (req, res) =>
  statusCache && new Date().getTime() - lastUpdate < 5000
    ? res.json(statusCache)
    : http
        .request({ host: "192.168.2.76", path: "/status" }, (res2) => {
          let str = "";
          res2.on("data", (chunk) => (str += chunk));
          res2.on("end", () => {
            try {
              const obj = JSON.parse(str.replace(/([a-zA-Z]+)/gi, '"$1"'));
              obj.location = 1;
              statusCache = obj;
              lastUpdate = new Date().getTime();
              res.json(obj);
            } catch (e) {
              console.error(e);
              res.status(500).end();
            }
          });
        })
        .end()
);

router.get("/pump-on", ({ session: { iduser } }, res) => gstrFG(res, "/pump-off", iduser));
router.get("/pump-off", ({ session: { iduser } }, res) => gstrFG(res, "/pump-on", iduser));
router.get("/light-on", ({ session: { iduser } }, res) => gstrFG(res, "/light-off", iduser));
router.get("/light-off", ({ session: { iduser } }, res) => gstrFG(res, "/light-on", iduser));

router.post("/log", (req, res) => {
  const { location } = req.body;
  db.pool.query(
    "select b.name as `name`, a.`status` as `status`, a.created as created, c.nickname as `by` from usagelog a join equipment b on a.idequipment=b.idequipment join user c on a.createdBy=c.iduser where a.idlocation=? order by a.created desc limit 4",
    [location],
    (err, dres) => {
      if (err) {
        console.log(err);
        res.status(500).end("error");
      } else {
        res.json(dres);
      }
    }
  );
});

module.exports = router;
