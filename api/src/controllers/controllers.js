module.exports = {
  formateoDb: async function (dogDb) {
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

    const validandoDogsDb = dbFormateo.map((d) => {
      if (!d.image) {
        d.image =
          'https://64.media.tumblr.com/7a569a37882be42d88914bcb8083132c/346bf544ef1b324b-12/s500x750/c28bdb969e16bae821881f8aa7f8d65a476193de.gif';
      }
      if (Array.isArray(d.temperament)) {
        d.temperament = d.temperament.map((t) => t.name);
        d.temperament = d.temperament.join(', ');
      }
      return d;
    });
    return validandoDogsDb;
  },

  formateoApi: async function (dogApi) {
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

    const validandoDogsApi = await apiFormateo.map((d) => {
      if (
        !d.weight_min ||
        d.weight_min === 'Na' ||
        d.weight_min === 'NaN' ||
        d.weight_min === 'aN'
      ) {
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

      if (
        !d.weight_max ||
        d.weight_max === 'Na' ||
        d.weight_max === 'NaN' ||
        d.weight_max === 'aN'
      ) {
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

      if (!d.height_max) {
        if (!d.height_min) {
          d.height_max = '42';
        } else {
          d.height_max = (parseInt(d.height_min) + 3).toString();
        }
      }

      if (!d.life_span_max) {
        if (!d.life_span_min) {
          d.life_span_max = '19';
        } else {
          d.life_span_max = (parseInt(d.life_span_min) + 2).toString();
        }
      }

      if (!d.temperament) {
        d.temperament = 'Stubborn, Active, Happy, Dutiful, Confident';
      }

      return d;
    });
    return validandoDogsApi;
  },
};
