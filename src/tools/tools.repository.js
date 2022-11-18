const { MongoClient } = require('mongodb');

client = new MongoClient('mongodb://localhost:27017/vuttr');

class ToolsRepository {
  async create(tool) {
    try {
      await client.connect();
      
      const result = await client.db('vuttr').collection('vuttr').insertOne(tool);
      
      return result.insertedId;

    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async findAll() {
    try {
      await client.connect();
    
      const cursor = client.db('vuttr').collection('vuttr').find({});
    
      let fullList = await cursor.toArray();

      return fullList;

    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async findOne(id) {
    try {
      await client.connect();
    
      const cursor = client.db('vuttr').collection('vuttr').find({ id });
      
      let result = await cursor.toArray();
      
      return result;
    
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async updateById(id, updatedTool) {
    try {
      await client.connect();

      const result = await client.db('vuttr')
      .collection('vuttr')
      .updateOne({ "id": id }, { $set: updatedTool });

      return result.modifiedCount;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async deleteById(id) {
    try {
      await client.connect();

      const result = await client.db('vuttr').collection('vuttr').deleteOne({ id: id });

      return result.deletedCount;

    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}

module.exports = {
  ToolsRepository
};
