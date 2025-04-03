import Ajv from "ajv"; // Importamos la librería AJV
// No necesitamos la importación de `Schema`

// Definimos el esquema para validar los registros del JSON
const schema = {
  type: 'object',
  properties: {
    Data_Referencia: { type: 'string', format: 'date' },
    Codi_Districte: { type: 'number' },
    Nom_Districte: { type: 'string' },
    Codi_Barri: { type: 'number' },
    Nom_Barri: { type: 'string' },
    AEB: { type: 'number' },
    Seccio_Censal: { type: 'number' },
    Valor: { type: 'string' }, // Suponemos que es un valor en formato string
    SEXE: { type: 'number', enum: [1, 2] } // 1 = hombre, 2 = mujer
  },
  required: ['Data_Referencia', 'Codi_Districte', 'Nom_Districte', 'Codi_Barri', 'Nom_Barri', 'AEB', 'Seccio_Censal', 'Valor', 'SEXE'],
  additionalProperties: false
};

// Crear una instancia de AJV (Another JSON Validator)
const ajv = new Ajv();
const validate = ajv.compile(schema);

// Exportar la función de validación
export { validate };
