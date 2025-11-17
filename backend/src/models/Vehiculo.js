const { Schema, model } = require('mongoose');

const vehiculoSchema = new Schema(
    {
        poliza: {
            type: String,
            required: true,
            unique: true,
        },
        patente: {
            type: String,
            required: true,
        },
        marca: {
            type: String,
            required: true,
        },
        modelo: {
            type: String,
            required: true,
        },
        anio: {
            type: Number,
            required: true,
        },


    },
    {
        timestamps: false,
        versionKey: false,

    }
);

module.exports = model('Vehiculo', vehiculoSchema);
