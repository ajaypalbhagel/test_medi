const express = require('express');
const router = express.Router();
const appointmentService = require('../service/appointmentService')

// create Medication controller
router.post('/', async(req, res, next)  => {
    const [error,errorMsg, result] = await appointmentService.createAppointment(req.body);
    if (error) {
        return res.status(500).json({
            message: errorMsg
        })
    } else {
        res.status(200).json({
            response: result
        })
    }
});

// update Appointment controller
router.put('/:AppointmentId', async(req, res, next)  => {
    const [error,errorMsg, result] = await appointmentService.updateAppointment(req.body,req.params.AppointmentId);
    if (error) {
        return res.status(500).json({
            message: errorMsg
        })
    } else {
        res.status(200).json({
            response: result
        })
    }
});

// query Medication controller
router.post('/query', async(req, res, next)  => {
    const [error,errorMsg, result] = await appointmentService.getAppointmentResult(req.body);
    if (error) {
        return res.status(500).json({
            message: errorMsg
        })
    } else {
        res.status(200).json({
            response: result
        })
    }
});

module.exports = router
