const { Schema, model } = require('mongoose');

const denuncioSchema = new Schema(
    {
        idDenuncio: {
            type: String,
            required: true,
            unique: true,
        },

        poliza: {
            type: String,
            required: true,
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


denuncioSchema.virtual('usuario', {
  ref: 'Usuario',          // nombre del modelo
  localField: 'rut',       // campo en Denuncio
  foreignField: 'rut',     // campo en Usuario
  justOne: true,           // un solo usuario por rut
});

// Para que los virtuals aparezcan en JSON
denuncioSchema.set('toJSON', { virtuals: true });
denuncioSchema.set('toObject', { virtuals: true });


module.exports = model('Denuncio', denuncioSchema);
