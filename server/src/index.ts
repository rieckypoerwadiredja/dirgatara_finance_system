import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from "./Schema";
import { Users } from "./Entities/Users";
import { createConnection } from "typeorm";
import { BankBG } from "./Entities/BankBG";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "dirgantara",
    username: "root",
    password: "admin",
    logging: true,
    synchronize: true,
    entities: [Users, BankBG],
  });

  const app = express();
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );

  app.listen(3001, () =>
    console.log(`server running at http://localhost:3001/`)
  );
};

main().catch((err) => {
  console.log(err);
});
