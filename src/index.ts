import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {helloResolver} from './resolvers/hello';
import { PostResolver } from "./resolvers/post";

 

const main = async () => {
 
  const app = express();
  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[helloResolver,PostResolver],
      validate:false
    }),
    context:()=>({em:orm.em})
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