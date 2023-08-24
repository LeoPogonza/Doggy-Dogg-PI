const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { formateoDb, formateoApi } = require('../controllers/controllers');
const { Op } = require('sequelize');
const { API, API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dogDb = await Dog.findAll({ include: Temperament });

    const validandoDogsDb = await formateoDb(dogDb);
    const validandoDogsApi = await formateoApi(dogApi);

    const allDog = await validandoDogsApi.concat(validandoDogsDb);

    res.json(allDog);
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  const { name } = req.query;
  try {
    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dogDb = await Dog.findAll({
      where: { name: { [Op.iLike]: `${name}%` } },
      include: Temperament,
    });

    const validandoDogsDb = await formateoDb(dogDb);
    const validandoDogsApi = await formateoApi(dogApi);

    const allDog = await validandoDogsApi.concat(validandoDogsDb);

    if (!name) {
      res.send(allDog);
    } else {
      const dog = await allDog.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );

      return res.status(200).send(dog);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:idRaza', async (req, res, next) => {
  const { idRaza } = req.params;
  if (!idRaza) {
    return res.status(400).send({ msg: 'Falta enviar datos obligatorios' });
  }
  try {
    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dogDb = await Dog.findAll({ include: Temperament });

    const validandoDogsDb = await formateoDb(dogDb);
    const validandoDogsApi = await formateoApi(dogApi);

    const allDog = await validandoDogsDb.concat(validandoDogsApi);

    const dog = allDog.filter((d) => d.id == idRaza);

    return res.status(200).send(dog);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const { name, height_min, height_max, weight_min, weight_max, temperament } =
    req.body;
  if (!name || !height_min || !height_max || !weight_min || !weight_max) {
    return res.status(400).send({ msg: 'Falta enviar datos obligatorios' });
  }
  try {
    const dog = await Dog.create(req.body);

    let tempDb = await Temperament.findAll({
      where: { id: temperament },
    });

    await dog.addTemperament(temperament);

    return res.status(201).send({ msg: 'Perro creado correctamente' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
