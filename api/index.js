const server = require("./src/app.js");
const { conn } = require("./src/db.js");


let prueba = "hello world"
console.log(prueba)

conn.sync({ force: true }).then(() => {
  // getEpisodes();
  server.listen(3001, () => {
    console.log("Listening at 3001"); // eslint-disable-line no-console
  });
});
