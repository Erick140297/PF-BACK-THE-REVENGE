const app = require("./app");
const db = require("./db");

const PORT = process.env.PORT || 3001;

const server = () => {
  try {
    db();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

server()