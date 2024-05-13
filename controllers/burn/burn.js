const fs = require('fs');

//return all students
exports.getAll = async (req, res) => {
    return res.send("ok");
}

//return student by his id (student number)
exports.getById = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    //just return same id
    return res.send(id);
}

//creates student
exports.create = async (req, res) => {
    //get requested student properties
    const {number, name, city, birthday } = req.body;
    //just return same new student
    return res.status(201).send(req.body);
}

//updates student
exports.update = async (req, res) => {
    //get requested student properties
    const {number, name, city, birthday } = req.body;
    //just return same new student
    return res.send(req.body);
}

//delete student by his id (student number)
exports.delete = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    //just return ok
    return res.send("ok");
}