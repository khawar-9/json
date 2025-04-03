import React, { useState } from "react"; // Importa React y useState para manejar el estado del buscador
import "./index.css"; // Importa los estilos CSS
import datosJSON from "./json-schema/data/dades.json"; // Importa los datos principales en formato JSON
import datosExtraJSON from "./json-schema/data/dades2.json"; // Importa datos adicionales en formato JSON

// Definición del tipo de datos principal
interface DatosItem {
  Data_Referencia: string; // Fecha del registro
  Codi_Districte: number; // Código del distrito
  Nom_Districte: string; // Nombre del distrito
  Codi_Barri: number; // Código del barrio
  Nom_Barri: string; // Nombre del barrio
  AEB: number; // Código AEB
  Seccio_Censal: number; // Sección censal
  Valor: string; // Valor asociado
  SEXE: number; // Sexo (1 = Hombre, 2 = Mujer)
}

// Definición del tipo de datos extra
interface DatosExtraItem {
  Nom_Barri: string; // Nombre del barrio
  Edad_Promedio: number; // Edad promedio de los habitantes
  Total_Habitantes: number; // Número total de habitantes
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para manejar el texto de búsqueda

  // Función para filtrar los datos según el texto de búsqueda
  const filteredData = datosJSON.filter((item: DatosItem) =>
    item.Nom_Districte.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Nom_Barri.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para obtener los datos adicionales según el barrio
  const getExtraData = (barrio: string): DatosExtraItem | undefined => {
    return datosExtraJSON.find((item) => item.Nom_Barri === barrio);
  };

  return (
    <div className="container"> {/* Contenedor principal */}
      <h1>📊 Datos de Distritos y Barrios 📊</h1> {/* Título de la página */}

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Buscar por Distrito o Barrio..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Guarda el valor del input en el estado
      />

      <table className="data-table"> {/* Tabla para mostrar los datos */}
        <thead>
          <tr>
            <th>📅 Fecha</th>
            <th>🏙️ Distrito</th>
            <th>🏘️ Barrio</th>
            <th>📊 Valor</th>
            <th>🧑 Sexo</th>
            <th>🎂 Edad Promedio</th>
            <th>👥 Total Habitantes</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => { // Recorre los datos filtrados y los muestra
            const extraData = getExtraData(item.Nom_Barri); // Obtiene los datos extra por barrio
            return (
              <tr key={index}>
                <td>{item.Data_Referencia}</td>
                <td>{item.Nom_Districte}</td>
                <td>{item.Nom_Barri}</td>
                <td>{item.Valor}</td>
                <td>{item.SEXE === 1 ? "Hombre" : "Mujer"}</td>
                {extraData && ( // Si hay datos extra, los añade a la tabla
                  <>
                    <td>{extraData.Edad_Promedio}</td>
                    <td>{extraData.Total_Habitantes}</td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App; // Exporta el componente principal
