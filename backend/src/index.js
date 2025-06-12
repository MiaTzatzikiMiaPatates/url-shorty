import express from 'express'
import groupsRouter from "./routers/groups-router.js";
import urlsRouter from "./routers/urls-router.js";
import clickstatsRouter from "./routers/clickstats-router.js";

const app = express();
const port = 3000;
const apiPrefix = "/api";

app.use(express.json());

app.use(`${apiPrefix}/groups`, groupsRouter);
app.use(`${apiPrefix}/urls`, urlsRouter);
app.use(`${apiPrefix}/urls`, clickstatsRouter);
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
