const express = require('express');
const router = express.Router();
const entityService = require('../service/entityService')

// create entity controller
router.post('/', async(req, res, next)  => {
    const [error,errorMsg, result] = await entityService.createEntity(req.body);
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

// update entity controller
router.patch('/:entityId', async(req, res, next)  => {
    const [error,errorMsg, result] = await entityService.updateEntity(req.body,req.params.entityId);
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

// query entity controller
router.post('/query', async(req, res, next)  => {
    const [error,errorMsg, result] = await entityService.getEntityResult(req.body,req.params.entityId);
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
