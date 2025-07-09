const config = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(config[environment]);

const findByEmail = (email) => knex('users').where({ email }).first();
const findById = (id) => knex('users').where({ id }).first();
const findAll = () => knex('users').select('id', 'name', 'email', 'role');
const create = (user) => knex('users').insert(user).returning('*');
const update = (id, user) => knex('users').where({ id }).update(user);
const remove = (id) => knex('users').where({ id }).del();

module.exports = { findByEmail, findById, findAll, create, update, remove };
