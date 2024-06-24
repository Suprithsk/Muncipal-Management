const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.post('/createCity', adminController.createCity);
router.post('/createArea', adminController.createArea);
router.get('/getCities', adminController.getAllCities);
router.get('/getAreas/:city_id', adminController.getAreaByCityId);
router.get('/getAllProblems', adminController.getAllProblems);
router.get('/getAllTickets', adminController.getAllTickets);
router.put('/markProblemAsResolved/:problem_id', adminController.markProblemAsResolved);
router.put('/markTicketAsCompleted/:ticket_id', adminController.markTicketAsCompleted);
router.get('/getAllResolvedProblems', adminController.getAllResolvedProblems);
router.get('/getAllCompletedTickets', adminController.getAllCompletedTickets);

module.exports = router;