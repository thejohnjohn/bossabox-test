const { ToolsRepository } = require('./tools.repository');

class ToolsService {
  toolsRepository = new ToolsRepository();

  insertTool(tool) {
    return this.toolsRepository.create(tool);
  }
  
  getAllTools() {
    return this.toolsRepository.findAll();
  }

  getToolById(id) {
    return this.toolsRepository.findOne(id);
  }

  updateToolById(id) {
    return this.toolsRepository.updateById(id);
  }

  deleteToolById(id) {
    console.log(`Bateu no serviceId: ${id}`);
    return this.toolsRepository.deleteById(id);
  }
}

module.exports = {
  ToolsService
};
