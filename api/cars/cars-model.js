const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('cars').where('id', id);
}

const create = car => {
  // DO YOUR MAGIC
  return db('cars').insert(car);
}

const updateById = (id, car) => {
  return db('cars').where('id', id).update(car);
}

const deleteById = id => {
  return db('cars').where('id', id).delete();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}