const Contact = require("../models/Contact");

class ContactRepository {
  async create(data) {
    return await Contact.create(data);
  }

  async findAll() {
    return await Contact.find().sort({
      createdAt: -1,
    });
  }

  async findById(id) {
    return await Contact.findById(id);
  }

  async update(id, data) {
    return await Contact.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  async delete(id) {
    return await Contact.findByIdAndDelete(id);
  }
}

module.exports = new ContactRepository();