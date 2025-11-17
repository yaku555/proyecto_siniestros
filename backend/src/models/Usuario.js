const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        apellido: {
            type: String,
            required: true,
        },
        rut: {
            type: String,
            required: true,
            unique: true,
        },
        telefono: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        comuna: {
            type: String,
            required: true,
        },
        tipo_usuario: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
        
    }
);

module.exports = model('Usuario', userSchema);
