const db = require('../data/dbConfig')

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes').where({ id }).first();
}

function findSteps(id) {
    return db('steps as st')
        .where({ 'st.scheme_id': id })
        .join('schemes as s', 'st.scheme_id', 's.id')
        .select('st.id', 's.scheme_name', 'st.step_number', 'st.instructions')
}

function add(scheme) {
    return db('schemes').insert(scheme)
        .then((ids) => {
            return findById(ids[0])
        })
}

function update(updates, id) {
    return db('schemes').where({ id }).first().update(updates)
        .then(() =>  {
            return findById(id)
        })
}

function remove(id) {

    return findById(id)
        .then(scheme => {
           return db('schemes').where({ id }).delete()
                .then(() => {
                        return scheme
                })
        })
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}