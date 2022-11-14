const { MongoClient } = require('mongodb');

client = new MongoClient('mongodb://localhost:27017/vuttr');

class ToolsRepository {
  async create(tool) {
    const result = await client.db('vuttr').collection('vuttr').insertOne(tool);
    console.log(`New listing created with the following id: ${result.insertedId}`);
  }

  async findAll() {
    try {
      await client.connect();
    
      const cursor = client.db('vuttr').collection('vuttr').find({});
    
      console.log((await cursor.toArray()));
    
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(tool) {
    const { toolId } = tool
    console.log(toolId);
    try {
      await client.connect();
    
      const cursor = client.db('vuttr').collection('vuttr').find({ id: toolId });
    
      console.log((await cursor.toArray()));
    
    } catch (error) {
      console.error(error);
    }
  }
}
const toolsRepository = new ToolsRepository();
toolsRepository.create().catch();
toolsRepository.create().catch();
toolsRepository.create().catch();
