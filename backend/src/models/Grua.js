const { Schema, model } = require('mongoose');

const gruaSchema = new Schema(
    {
        idGrua: {
            type: String,
            required: true,
            unique: true,
        },
        telefonoGrua: {
            type: Number,
            required: true,
        },
        rutGrua: {
            type: String,
            required: true,
            unique: true,
        },
        idTaller: {
            type: String,
            required: true,
        },
        comunaGrua: {
            type: String,
            required: true,
        },
        

    },
    {
        timestamps: false,
        versionKey: false,

    }
);

module.exports = model('Grua', gruaSchema);
