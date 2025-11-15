require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

const getContactsCollection = () => client.db(process.env.DB_NAME || "sample_analytics").collection("customers");

module.exports = { client, getContactsCollection };
