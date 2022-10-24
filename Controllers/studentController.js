const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()
const URL = process.env.DB_URL
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const createStudents = async (req, res) => {
    try {
        const data = req.body
        const connection = await MongoClient.connect(URL)
        const db = connection.db("Student-and-Mentor")
        const result = await db.collection("students").insertMany(data);
        connection.close()
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}

const getAllStudents = async (req, res) => {
    try {
        const connection = await MongoClient.connect(URL)
        const db = connection.db("Student-and-Mentor")
        const students = await db.collection("students").find().toArray()
        connection.close()
        res.send(students)
    } catch (error) {
        console.log(error);
    }
}

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params
        const connection = await MongoClient.connect(URL)
        const db = connection.db("Student-and-Mentor")
        const student = await db.collection("students").findOne({ _id: ObjectId(id) });
        connection.close()
        student
            ? res.send(student)
            : res.status(404).send({ message: 'Not such student found ' })
    } catch (error) {
        console.log(error);
    }
}

const editStudentById = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const connection = await MongoClient.connect(URL)
        const db = connection.db("Student-and-Mentor")
        const student = await db.collection("students").updateOne({ _id: ObjectId(id) }, { $set: updateData });
        connection.close()
        res.send(student)
    } catch (error) {
        console.log(error);
    }
}

const deleteStudentById = async (req, res) => {
    try {
        const { id } = req.params
        const connection = await MongoClient.connect(URL)
        const db = connection.db("Student-and-Mentor")
        const student = await db.collection("students").deleteOne({ _id: ObjectId(id) });
        connection.close()
        res.send(student)
    } catch (error) {
        console.log(error);
    }
}

const deleteAllStudent = async () => {
    try {
        const connection = await MongoClient.connect(URL)
        const db = connection.db("Student-and-Mentor")
        const student = await db.collection("students").deleteMany({});
        connection.close()
        res.send(student)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createStudents, getAllStudents, getStudentById, editStudentById, deleteStudentById, deleteAllStudent }