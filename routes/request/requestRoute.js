const express = require('express');
const  TokenController  = require('../../controller/token');
const requestController  = require('../../controller/requestForVisit');


const router = express.Router();

router.post('/visitRequest/:roomID/:userID', TokenController.checkToken, requestController.siteVisitRequest);

module.exports = router;