const { Router } = require('express');
const axios = require('axios');
const { Temperament } = require('../db.js');
const { API, API_KEY } = process.env;

const router = Router();

// Ruta para obtener todos los temperamentos disponibles
router.get('/', async (req, res, next) => {
  try {
    // Obtener datos de temperamentos desde la API
    const temperamentos = (await axios.get(`${API}?api_key=${API_KEY}`)).data;

    // Mapear y extraer los valores de temperamento de los datos obtenidos
    const formateo = temperamentos.map((t) => t.temperament);

    // Filtrar y dividir los valores de temperamento
    const uniendo = formateo
      .filter((r) => r != null)
      .join()
      .split(', ')
      .join()
      .split(',');

    // Reducir los valores a una lista única de temperamentos
    let resultado = uniendo.reduce((a, e) => {
      if (!a.find((d) => d == e)) a.push(e);
      return a;
    }, []);

    // Formatear los temperamentos en objetos con propiedad "name"
    resultado = resultado.map((t) => {
      return { name: t };
    });

    // Buscar todos los temperamentos en la base de datos
    const allTemps = await Temperament.findAll();

    // Si no hay temperamentos en la base de datos, crearlos
    if (allTemps.length === 0) {
      await Temperament.bulkCreate(resultado);
    }

    // Buscar y enviar todos los temperamentos
    const temper = await Temperament.findAll();
    res.send(temper);
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware
  }
});

module.exports = router;
