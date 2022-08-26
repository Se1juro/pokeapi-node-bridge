import "dotenv/config";
import morgan from "morgan";
import { Action, createExpressServer } from "routing-controllers";
import path from "path";

const app = createExpressServer({
  routePrefix: "/pokeapi",
  controllers: [path.join(__dirname + "/controllers/*.ts")],
  middlewares: [path.join(__dirname + "/middlewares/*.ts")],
  cors: true,
  classTransformer: true,
  currentUserChecker: async(action:Action)=>{
    return action.request.user
  }
});

app.use(morgan("dev"));

export default app;