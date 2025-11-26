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

siniestroSchema.virtual('usuario', {
  ref: 'Usuario',          // nombre del modelo
  localField: 'rut',       // campo en Denuncio
  foreignField: 'rut',     // campo en Usuario
  justOne: true,           // un solo usuario por rut
});

// Para que los virtuals aparezcan en JSON
siniestroSchema.set('toJSON', { virtuals: true });
siniestroSchema.set('toObject', { virtuals: true });


module.exports = model('Siniestro', siniestroSchema);
