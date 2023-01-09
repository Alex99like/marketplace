// @ts-ignore
import {app} from "./app.js";
import * as process from "process";

const port = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`Server has been started ${port}`)
})