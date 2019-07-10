const { Router } = require('express');
const controller = require('./controller');
const axios = require('axios');
const router = new Router();
const Bull = require('bull');
const Queue = new Bull('Queue', { redis: { port: 6379, host: 'queuebull_redis_1' } });


router.post('/add-queue', (req, res) => {
    Queue.add({ ...req.body });
    return res.sendStatus(200);
});

router.post('/sum', (req, res) => {
    controller.sum(req, res)
});

Queue.process(async (job) => {
    console.log("***** EXECUTANDO FILA ****")
    console.log(job.data);
    return axios.post('http://localhost:3000/api/count/sum', job.data);
});

exports.router = router;