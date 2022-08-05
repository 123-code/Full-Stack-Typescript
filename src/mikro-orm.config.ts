// this file allows us to access this info from the CLI
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';

console.log("dirname", __dirname);

export default  {

    migrations:{
        path: path.join(__dirname,'./migrations'), // path to folder with migration files
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities:[Post],
    dbName:'lireddit',
    user:'root',
    password:'root',
    debug:!__prod__,
    type:'postgresql',
    // line below takes what init needs fpr its first parameter
} as Parameters<typeof MikroORM.init>[0];
