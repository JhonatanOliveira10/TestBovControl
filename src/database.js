const mongodb = require("mongodb")

async function connection () {
  try {
    const client = new mongodb.MongoClient("mongodb://localhost:27017", {})
    await client.connect()
    global.connection = client.db("test")
  } catch (error) {
    console.log('ERRO', error)
  }
}

module.exports = {
    connection
}
