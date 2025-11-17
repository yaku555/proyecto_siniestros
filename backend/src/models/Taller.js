const { Schema, model } = require('mongoose');

const tallerSchema = new Schema(
    {
        idTaller: {
            type: String,
            required: true,
            unique: true,
        },
        telefonoTaller: {
            type: Number,
            required: true,
        },
        direccionTaller: {
            type: String,
            required: true,
        },
        comunaTaller: {
            type: String,
            required: true,
        },
        jefeTaller: {
            type: String,
            required: true,
        },
        

    },
    {
        timestamps: false,
        versionKey: false,

    }
);

module.exports = model('Taller', tallerSchema);
