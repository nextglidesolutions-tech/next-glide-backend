const mongoose = require('mongoose');

const formFieldSchema = new mongoose.Schema({
    id: { type: String, required: true }, // unique id for the field (e.g., 'field_123')
    label: { type: String, required: true },
    type: { type: String, required: true }, // text, textarea, number, url, select
    placeholder: { type: String },
    required: { type: Boolean, default: false },
    options: [{ type: String }] // For select inputs
});

const formSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, unique: true },
    fields: [formFieldSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', formSchema);
