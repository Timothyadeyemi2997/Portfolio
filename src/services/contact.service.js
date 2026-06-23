const Contact = require("../models/Contact");
const { sendEmail } = require("../config/mail");
const contactRepository = require("../repositories/contact.repository");

class ContactService {
async createContact (data) {
  const contact = await contactRepository.create(data);

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `Message from my Portfolio Contact: ${data.subject}`,
    html: `
      <h2>New Contact Message</h2>

      <p><strong>Name:</strong> ${data.name}</p>

      <p><strong>Email:</strong> ${data.email}</p>

      <p><strong>Subject:</strong> ${data.subject}</p>

      <p><strong>Message:</strong></p>

      <p>${data.message}</p>
    `,
  });

  return contact;
}

async getContacts() {
  return await contactRepository.findAll();
}

async getContact(id) {
  const contact = await contactRepository.findById(id);

  if (!contact) {
    throw new Error(
      "Contact message not found"
    );
  }

  return contact;
}

async markAsRead(id) {
  const contact = 
  await contactRepository.update(id, {
    status: "read",
  });

  if (!contact) {
    throw new Error(
      "Contact message not found"
    );
  }
  return contact;
}

  async deleteContact(id) {
    const contact =
      await contactRepository.delete(id);

    if (!contact) {
      throw new Error(
        "Contact message not found"
      );
    }

    return contact;
  }
}

module.exports = new ContactService();