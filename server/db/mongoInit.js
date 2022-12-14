const { MongoClient } = require("mongodb");
const dotenv = require('dotenv').config();
const init = async () => {
  const uri = 'mongodb+srv://Masterminds:mastermindDB@cluster0.w1gphwe.mongodb.net/?retryWrites=true&w=majority';
  const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });



  //let dbName = process.env.NODE_ENV == "test" ? "quiz_dbtest" : "quiz_db";
  let dbName = "QuizDB";
  try {
    let client = await mongoClient.connect();
    return client.db(dbName);
  } catch (error) {
    console.log(error);
  }
};

module.exports = init;