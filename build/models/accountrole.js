"use strict";
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("accountrole", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        },
    }, {
        timestamps: true,
    });
};
