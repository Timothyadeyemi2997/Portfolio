const contactService = require(
  "../services/contact.service"
);

class ContactController {
  async create(req, res, next) {
    try {
      const contact =
        await contactService.createContact(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Message sent successfully",
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const contacts =
        await contactService.getContacts();

      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const contact =
        await contactService.getContact(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  async markRead(req, res, next) {
    try {
      const contact =
        await contactService.markAsRead(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await contactService.deleteContact(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Message deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();