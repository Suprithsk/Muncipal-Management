const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaSchema = new Schema({
    name: { type: String, required: true },
    city_id: { type: Schema.Types.ObjectId, ref: 'City', required: true },
});

module.exports = mongoose.model('Area', areaSchema);