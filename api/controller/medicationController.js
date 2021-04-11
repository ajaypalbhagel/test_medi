const express = require('express');
const router = express.Router();
const medicationService = require('../service/medicationService')

// create Medication controller
router.post('/', async(req, res, next)  => {
    const [error,errorMsg, result] = await medicationService.createMedication(req.body);
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

// // update Medication controller
// router.patch('/:MedicationId', async(req, res, next)  => {
//     const [error,errorMsg, result] = await medicationService.updateMedication(req.body,req.params.MedicationId);
//     if (error) {
//         return res.status(500).json({
//             message: errorMsg
//         })
//     } else {
//         res.status(200).json({
//             response: result
//         })
//     }
// });

// query Medication controller
router.post('/query', async(req, res, next)  => {
    const [error,errorMsg, result] = await medicationService.getMedicationResult(req.body);
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
