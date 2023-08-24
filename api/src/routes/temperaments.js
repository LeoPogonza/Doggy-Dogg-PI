const { Router } = require('express');
const axios = require('axios');
const { Temperament } = require('../db.js');
const { API, API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const temperamentos = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const formateo = temperamentos.map((t) => t.temperament);
    const uniendo = formateo
      .filter((r) => r != null)
      .join()
      .split(', ')
      .join()
      .split(',');

    let resultado = uniendo.reduce((a, e) => {
      if (!a.find((d) => d == e)) a.push(e);
      return a;
    }, []);

    resultado = resultado.map((t) => {
      return { name: t };
    });

    const allTemps = await Temperament.findAll();

    if (allTemps.length === 0) {
      await Temperament.bulkCreate(resultado);
    }
    const temper = await Temperament.findAll();

    res.send(temper);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
