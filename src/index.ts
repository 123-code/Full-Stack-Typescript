import { MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";

const main = async () => {
    const orm = await MikroORM.init({
        entities:[],
        dbName:'lireddit',
        user:'root',
        password:'root',
        debug:!__prod__,
        type:'postgresql',
    });
    
}

main();

console.log("Hello World");