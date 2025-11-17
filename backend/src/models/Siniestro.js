const { Schema, model } = require('mongoose');

const siniestroSchema = new Schema(
    {
        idSiniestro: {
            type: String,
            required: true,
            unique: true,
        },
        poliza: {
            type: String,
            required: true,
            unique: true,
        },
        rut: {
            type: String,
            required: true,
        },
        direccionSin: {
            type: String,
            required: true,
        },
        comunaSin: {
            type: String,
            required: true,
        },
        estadoSiniestro: {
            type: String,
            required: true,
        },
        idTaller: {
            type: String,
            required: true,
        },
        idGrua: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
        versionKey: false,

    }
);

module.exports = model('Siniestro', siniestroSchema);
