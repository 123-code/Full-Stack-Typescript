import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {helloResolver} from './resolvers/hello';



const main = async () => {
 
  const app = express();
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[helloResolver],
      validate:false
    })
  });

  // graphql endpoint
  apolloServer.applyMiddleware({app});

  app.listen(4000,()=>{
    console.log("listening on port 4000");
  });
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up(); 
};

main().catch((err) => {
  console.error(err);
});