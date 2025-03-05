const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
// get all contacts
// GET /api/contacts
// access private 
const getContacts = asyncHandler(async (req, res) => {
    const contacts  = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

// get single contact
// GET /api/contacts/:id
// access private 
const getContact = asyncHandler(async (req, res) => {
    const contact  = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized to read this contact');
  }
    res.status(200).json(contact);
  });

// create contact
// POST /api/contacts/
// access private 
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('all fields are mandatory');
    }
    const contactAvailable = await Contact.findOne({ email, user_id: req.user.id });
    console.log("Contact available:", contactAvailable?.user_id, "Current User:", req.user.id);
    if (contactAvailable && contactAvailable.user_id.toString() === req.user.id) {
      console.log("Contact already exists for this user");
      res.status(400);
      throw new Error("Contact already exists");
    }
    console.log("Creating new contact...");
    const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
    console.log("Created contact:", contact);
    res.status(201).json(contact);
  });


// update contact
// PUT /api/contacts/:id
// access private 
const updateContact = asyncHandler(async (req, res) => {
    const contact  = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to update this contact');
    }
    const updatedContact = await Contact.findByIdAndUpdate
    (req.params.id, req.body, {new: true, runValidators: true});
    res.status(200).json(updatedContact);
  });


// delete a contact
// DELETE /api/contacts/:id
// access private 
const deleteContact = asyncHandler(async (req, res) => {
    const contact  = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Not authorized to delete this contact');
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
  });


module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};