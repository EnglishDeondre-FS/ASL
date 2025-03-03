const { DataTypes, Model } = require('sequelize');
const sequelize = require('./connection');

class Planet extends Model { };
class Star extends Model { };
class Galaxy extends Model { };

Star.init({
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Size: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true
  }
 },
{sequelize, modelName: 'star'}
);

Planet.init({
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Size: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true
  }
 },
{sequelize, modelName: 'planet'}
);

Galaxy.init({
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Size: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true
  }
 },
{sequelize, modelName: 'galaxy'}
);

Galaxy.hasMany(Star);
Star.belongsTo(Galaxy);

Star.hasMany(Planet);
Planet.belongsToMany(Star, { through: 'StarPlanets' });

module.exports = { Planet, Star, Galaxy };
