const { MongoClient } = require('mongodb');

class ToolsRepository {
  client = new MongoClient('mongodb://localhost:27017/vuttr');

  async create(tool) {
    try {
      await this.client.connect();

      const result = await this.client.db('vuttr').collection('vuttr').insertOne(tool);

      return result.insertedId;
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    try {
      await this.client.connect();

      const cursor = this.client.db('vuttr').collection('vuttr').find({});

      const fullList = await cursor.toArray();

      return fullList;
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id) {
    try {
      await this.client.connect();

      const cursor = this.client.db('vuttr').collection('vuttr').find({ id });

      const result = await cursor.toArray();

      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async updateById(id, updatedTool) {
    try {
      await this.client.connect();

      const result = await this.client.db('vuttr')
        .collection('vuttr')
        .updateOne({ id }, { $set: updatedTool });

      return result.modifiedCount;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      await this.client.connect();

      const result = await this.client.db('vuttr').collection('vuttr').deleteOne({ id });

      return result.deletedCount;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  ToolsRepository,
};
