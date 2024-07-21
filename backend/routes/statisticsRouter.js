const router = require("express").Router();
const { getStatisticsDaily, getStatisticsMonthly, getStatisticsYearly } = require("../controller/statisticsController");



router.get("/daily", getStatisticsDaily);

router.get("/monthly", getStatisticsMonthly);

router.get("/yearly", getStatisticsYearly);

module.exports = router;
