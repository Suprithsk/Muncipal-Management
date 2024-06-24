const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/createProblem', userController.createProblem);
router.get('/getProblemByUserId/:user_id', userController.getProblemByUserId);
router.post('/raiseTicketByProblemId/:problem_id', userController.raiseTicketByProblemId);
router.get('/getTicketByUserId/:user_id', userController.getTicketByUserId);
router.get('/getResolvedTickets/:user_id', userController.getResolvedTickets);
router.get('/getResolvedProblems/:user_id', userController.getResolvedProblems);
router.get('/getCities', userController.getAllCities);
router.get('/getAreasByCityId/:city_id', userController.getAreaByCityId);

module.exports = router;
