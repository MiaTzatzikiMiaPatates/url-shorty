import express from 'express'
import groupsRouter from "./routers/groups-router.js";
import urlsRouter from "./routers/urls-router.js";
import clickStatsRouter from "./routers/clickstats-router.js";
import cors from 'cors';

const app = express();
const port = 3000;
const apiPrefix = "/api";


app.use(cors())

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(`${apiPrefix}/groups`, groupsRouter);
app.use(`${apiPrefix}/urls`, urlsRouter);
app.use(`${apiPrefix}/clickstats`, clickStatsRouter);

// app.delete('/', function (req, res) {
//         throw {
//             status: statusCodes.IM_A_TEAPOT,
//             message: "Test message!"
//         };
//     }
// );
//
// app.use(function (err, req, res, next) {
//     res
//         .status(err.status || 500)
//         .json({
//             message: err.message || "Something went wrong!"
//         });
// });

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
