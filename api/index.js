const server = require("./src/app.js");
const { conn } = require("./src/db.js");



conn.sync({ force: false }).then(() => {
  // getEpisodes();
  server.listen(3001, () => {
    console.log("Listening at 3001"); // eslint-disable-line no-console
  });
});
