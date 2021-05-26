const express = require('express');
const  TokenController  = require('../../controller/token');
const requestController  = require('../../controller/requestForVisit');

const router = express.Router();

router.post("/:roomId/visitRequest/:userId",  requestController.siteVisitRequest);
router.put("/approveRequest",  requestController.approveVisit);
router.get("/getRequests",  requestController.getRequests);

module.exports = router;

