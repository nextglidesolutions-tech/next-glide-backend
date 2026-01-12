const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    formData: { type: Map, of: String }, // Stores dynamic field values (e.g., name: "John", resume: "http...")
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, default: 'New' }, // New, Reviewed, Interviewed, Rejected, Hired
    email: { type: String, required: true }, // Extracted from formData for easy emailing
    name: { type: String, required: true }  // Extracted from formData for personalization
});

module.exports = mongoose.model('Application', applicationSchema);
