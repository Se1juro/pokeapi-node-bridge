import "reflect-metadata";
import { useContainer as routeContainer } from "routing-controllers";
import { Container } from "typeorm-typedi-extensions";
import app from "./app";
import { AppDataSource } from "./configDb";
import os from "os";
import cluster from "cluster";

const numCpu = os.cpus().length;

const main = async () => {
  try {
    routeContainer(Container);
    await AppDataSource.initialize();
    console.log("Database connected");

    if (process.env.NODE_ENV === "production" && cluster.isPrimary) {
      for (let i = 0; i <= numCpu; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
      });
    } else {
      app.listen(process.env.PORT);
    }

    console.log(
      `🚀 Server listening on port ${process.env.PORT} and process ${process.pid}`
    );
  } catch (error) {
    console.log("An error happened");
    console.log(error);
  }
};

main();
