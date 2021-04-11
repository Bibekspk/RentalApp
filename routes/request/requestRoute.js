const express = require('express');
const  TokenController  = require('../../controller/token');
const requestController  = require('../../controller/requestForVisit');

const router = express.Router();

router.post("/:roomId/visitRequest/:userId",  requestController.siteVisitRequest);

module.exports = router;

