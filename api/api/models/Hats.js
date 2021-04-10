/**
 * Hats.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'hats',
  primaryKey: 'id',
  autocreatedAt : true,
  autoupdatedAt : true,

  attributes: {

    id : { 
      type : 'number', 
      unique : true, 
      autoIncrement : true
    },

    name: {
      type: 'string',
      unique: true
    }

  },

};

