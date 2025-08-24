import express, {NextFunction} from 'express'
import groupsRouter from "./routers/groups-router.js";
import urlsRouter from "./routers/urls-router.js";
import clickStatsRouter from "./routers/clickstats-router.js";
import cors from 'cors';
import shortUrlRouter from "./routers/short-url-router.js";
import {API_PREFIX, PORT} from "./config/constants.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(`${API_PREFIX}/groups`, groupsRouter);
app.use(`${API_PREFIX}/urls`, urlsRouter);
app.use(`${API_PREFIX}/clickstats`, clickStatsRouter);

app.use("/", shortUrlRouter);


// app.use(function (err, req: Request, res: Response, next: NextFunction) {
//     res
//         .status(err.status || 500)
//         .json({
//             message: err.message || "Something went wrong!"
//         });
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
