// STRETCH
const cars = [
    {
        vin: '12345678901234567',
        make: 'toyota',
        model: 'tacoma',
        mileage: 10000,
        title: 'clean',
        transmission: 'automatic'
    }
]

exports.seed = async function(knex) {
    await knex('cars').truncate();
    await knex('cars').insert(cars);
}