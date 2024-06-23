const mongoose = require('mongoose');
const BookSlot = new mongoose.Schema({
    vaccinationCenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VaccinationCenter',
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: true
    },
    vaccineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vaccine',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    }
})
const BookSlotModel = mongoose.model('BookSlot', BookSlot)

module.exports = {BookSlotModel}