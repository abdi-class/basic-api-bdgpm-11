import App from "./app";

const main = () => {
  const server = new App(); // instance of App express config

  server.startAPI(); // execute methode startAPI
};

main();
