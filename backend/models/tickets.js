const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    problem_id: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'completed'], default: 'pending' },
});

module.exports = mongoose.model('Ticket', ticketSchema);