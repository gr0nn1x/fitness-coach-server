"use strict";
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            types: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            types: Sequelize.STRING,
            allowNull: false,
        },
        verified: {
            types: Sequelize.BOOLEAN,
            defaultValue: 0,
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
