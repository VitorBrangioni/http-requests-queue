module.exports = (Sequelize, DataTypes) => {

    const Count = Sequelize.define("Count", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sum: DataTypes.INTEGER,
    }, {
            timestamps: false,
            tableName: 'count',
            underscored: true
        });
    return Count;
};