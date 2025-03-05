const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Please add the Contact Name"]
    },
    email: {
        type: String,
        required: [true, "Please add the Email address"]
    },
    phone: {
        type: String,
        required: [true, "Please add the Contact Phone number"],
    }
}, {
    timestamps: true
});

// Ensure a user cannot have duplicate contacts with the same email
contactSchema.index({ email: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model('Contact', contactSchema);
