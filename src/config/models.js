const Sequelize = require('sequelize');
const { readdirSync, statSync } = require('fs')
const { join } = require('path')

var log = process.env.SEQUELIZE_LOGGING ? console.log : false;
var options = {
	host: process.env.POSTGRES_HOST,
	dialect: 'postgres',
	logging: log,
	pool: {
		max: 10,
		min: 0,
		idle: 900000,
		acquire: 1000000
    },
    operatorsAliases: false,
	timezone: 'UTC'
};

if (process.env.DATABASE_URL) {
	var sequelize = new Sequelize(process.env.DATABASE_URL, options);
} else {
	var sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, options);
}

var db = {};

const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())

dirs("api").forEach(dir => {
    readdirSync(`${__dirname}/../api/${dir}`)
        .filter(function (file) {
            return (file == "model.js");
        })
        .forEach(function (file) {
            var model = sequelize.import(join(`${__dirname}/../api/${dir}`, file));
            db[model.name] = model;
        });
});

Object.keys(db).forEach(function (modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.Sequelize = sequelize;
module.exports = db;