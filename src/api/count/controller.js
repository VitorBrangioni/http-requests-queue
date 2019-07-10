const { Count } = require('./../../config/models');
const Bull = require('bull');
const Queue = new Bull('Queue', { redis: { port: 6379, host: 'queuebull_redis_1' } });

exports.sum = async (req, res) => {
    let { sum } = req.body;
    const myCount = await Count.findOne({ where: { id: 1 } });
    sum = myCount.sum + sum;

    return Count.update({ sum }, { where: { id: 1 } })
        .then( 
        rows => {
            console.log(`${myCount.sum} + 1 = ${sum}`)
            return res.sendStatus(200);
        },
        err => res.sendStatus(500)
        )
}