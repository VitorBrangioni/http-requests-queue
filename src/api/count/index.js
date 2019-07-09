const { Router } = require('express');
const controller = require('./controller');
const router = new Router();
const Bull = require('bull');
const Queue = new Bull('Queue', { redis: { port: 6379, host: 'queuebull_redis_1' } });

router.post('/sum', (req, res) => {
    Queue.add({ req, res });
    // controller.sum(req, res)

});

Queue.process(async (job, done) => {
    console.log("***** EXECUTANDO FILA ****")
    const { req, res } = job.data;
    controller.sum(req, res, done);
});

/* Queue.process(async (job, data) => {
    console.log("***** EXECUTANDO FILA ****")
    const { test } = job.data;
    // done();
    console.log(test);
});
 */
exports.router = router;