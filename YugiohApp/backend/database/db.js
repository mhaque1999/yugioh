const { Sequelize } = require('sequelize');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'mydatabase',
  dialect: 'postgres'
};

const globalOptions = {
  define: {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    underscored: true // Uses underscored naming convention for columns
  }
};

const sequelize = new Sequelize(dbConfig.database, undefined, undefined, {
  host: dbConfig.host,
  synchronize: true,
  logging: console.log,
  dialect: dbConfig.dialect,
  ...globalOptions
});

module.exports =  sequelize ;
