const { Sequelize } = require('sequelize');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'mydatabase2',
  dialect: 'postgres'
};

const globalOptions = {
  define: {
    timestamps: true, 
    underscored: true 
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
