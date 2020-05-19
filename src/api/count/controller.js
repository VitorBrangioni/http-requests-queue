const { Count } = require("./../../config/models");

exports.sum = async (req, res) => {
  let { sum } = req.body;

  this._sum(sum)
    .then((_) => res.sendStatus(200))
    .catch((err) => res.sendStatus(500));
};

exports._sum = async (sum) => {
  const myCount = await Count.findOne({ where: { id: 1 } });
  sum = myCount.sum + sum;

  return Count.update({ sum }, { where: { id: 1 } }).then(
    (rows) => {
      console.log(`${myCount.sum} + 1 = ${sum}`);
      return rows;
    },
    (err) => {
      console.log(err);
      throw err;
    }
  );
};
