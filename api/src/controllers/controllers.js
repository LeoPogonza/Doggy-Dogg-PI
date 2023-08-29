// Exporta un objeto con dos funciones: formateoDb y formateoApi
module.exports = {
  // Función para formatear y validar datos de la base de datos
  formateoDb: async function (dogDb) {
    // Mapeo de objetos en el array dogDb
    const dbFormateo = dogDb.map((dog) => {
      return {
        id: dog.id,
        image: dog.image,
        name: dog.name,
        weight_min: dog.weight_min,
        weight_max: dog.weight_max,
        height_min: dog.height_min,
        height_max: dog.height_max,
        life_span_min: dog.life_span_min,
        life_span_max: dog.life_span_max,
        temperament: dog.temperaments,
        creadoEnDB: dog.creadoEnDB,
      };
    });

    // Validación y ajustes en los objetos formateados
    const validandoDogsDb = dbFormateo.map((d) => {
      // Si no hay imagen, se asigna una URL de imagen predeterminada
      if (!d.image) {
        d.image =
          'https://64.media.tumblr.com/7a569a37882be42d88914bcb8083132c/346bf544ef1b324b-12/s500x750/c28bdb969e16bae821881f8aa7f8d65a476193de.gif';
      }
      // Si temperament es un array, se convierte en una cadena
      if (Array.isArray(d.temperament)) {
        d.temperament = d.temperament.map((t) => t.name);
        d.temperament = d.temperament.join(', ');
      }
      return d;
    });
    return validandoDogsDb; // Devuelve el array formateado y validado
  },

  // Función para formatear y validar datos de la API
  formateoApi: async function (dogApi) {
    // Mapeo de objetos en el array dogApi
    const apiFormateo = dogApi.map((dog) => {
      return {
        id: dog.id,
        image: dog.image.url,
        name: dog.name,
        weight_min: dog.weight.metric.slice(0, 2).trim(),
        weight_max: dog.weight.metric.slice(-2).trim(),
        height_min: dog.height.metric.slice(0, 2).trim(),
        height_max: dog.height.metric.slice(4).trim(),
        life_span_min: dog.life_span.slice(0, 2).trim(),
        life_span_max: dog.life_span.slice(4, -6).trim(),
        temperament: dog.temperament,
      };
    });

    // Validación y ajustes en los objetos formateados de la API
    const validandoDogsApi = await apiFormateo.map((d) => {
      // Validación de peso mínimo y máximo
      if (
        !d.weight_min ||
        d.weight_min === 'Na' ||
        d.weight_min === 'NaN' ||
        d.weight_min === 'aN'
      ) {
        // Si weight_min es inválido o faltante, se establece un valor predeterminado
        if (
          !d.weight_max ||
          d.weight_max === 'Na' ||
          d.weight_max === 'NaN' ||
          d.weight_max === 'aN'
        ) {
          d.weight_min = '8';
        } else {
          d.weight_min = (d.weight_max - 2).toString();
        }
      }

      // Validación de peso máximo
      if (
        !d.weight_max ||
        d.weight_max === 'Na' ||
        d.weight_max === 'NaN' ||
        d.weight_max === 'aN'
      ) {
        // Si weight_max es inválido o faltante, se establece un valor predeterminado
        if (
          !d.weight_min ||
          d.weight_min === 'Na' ||
          d.weight_min === 'NaN' ||
          d.weight_min === 'aN'
        ) {
          d.weight_max = '12';
        } else {
          d.weight_max = (parseInt(d.weight_min) + 7).toString();
        }
      }

      // Validación de altura máxima
      if (!d.height_max) {
        // Si height_max es faltante, se establece un valor predeterminado
        if (!d.height_min) {
          d.height_max = '42';
        } else {
          d.height_max = (parseInt(d.height_min) + 3).toString();
        }
      }

      // Validación de vida útil máxima
      if (!d.life_span_max) {
        // Si life_span_max es faltante, se establece un valor predeterminado
        if (!d.life_span_min) {
          d.life_span_max = '19';
        } else {
          d.life_span_max = (parseInt(d.life_span_min) + 2).toString();
        }
      }

      // Validación de temperamento
      if (!d.temperament) {
        // Si temperament es faltante, se establece un valor predeterminado
        d.temperament = 'Stubborn, Active, Happy, Dutiful, Confident';
      }

      return d;
    });
    return validandoDogsApi; // Devuelve el array formateado y validado de la API
  },
};
