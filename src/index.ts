import "reflect-metadata";
import { useContainer as routeContainer } from "routing-controllers";
import { Container } from "typeorm-typedi-extensions";
import app from "./app";
import { AppDataSource as dbDevelopment } from "./configDb.dev";
import { AppDataSource as dbProduction } from "./configDb.prod";
import os from "os";
import cluster from "cluster";
import { resolve } from "path";

const numCpu = os.cpus().length;

const main = async () => {
  try {
    console.log(__dirname + "/models/*.model.js");
    routeContainer(Container);
    switch (process.env.NODE_ENV) {
      case "development":
        await dbDevelopment.initialize();
        break;
      case "production":
        await dbProduction.initialize();
        break;
    }
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
