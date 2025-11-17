const { Schema, model } = require('mongoose');

const denuncioSchema = new Schema(
    {
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
        detalles: {
            type: String,
            required: true,
        },
        estadoDenuncio: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,

    }
);

module.exports = model('Denuncio', denuncioSchema);
