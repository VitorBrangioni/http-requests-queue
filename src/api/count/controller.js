const { Count } = require('./../../config/models');

exports.sum = async (req, res, done) => {
    let { sum } = req.body;

    const myCount = await Count.findOne({ where: { id: 1 } });
    sum = myCount.sum + sum;

    Count.update({ sum }, { where: { id: 1 } })
        .then(
        rows => {
            console.log("new sum = ", sum)
            res.status(200).json({ sum })
            done(); 
        },
        err => {
            console.log(err)
            res.status(500).json(err);
            done(); 
        },
    )
}