const { Router } = require('express');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { formateoDb, formateoApi } = require('../controllers/controllers');
const { Op } = require('sequelize');
const { API, API_KEY } = process.env;

const router = Router();

// Ruta para obtener todos los perros
router.get('/', async (req, res, next) => {
  try {
    // Obtener datos de la API y la base de datos
    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dogDb = await Dog.findAll({ include: Temperament });

    // Formatear y validar datos de la base de datos
    const validandoDogsDb = await formateoDb(dogDb);
    // Formatear y validar datos de la API
    const validandoDogsApi = await formateoApi(dogApi);

    // Combinar datos de la API y la base de datos
    const allDog = await validandoDogsApi.concat(validandoDogsDb);

    // Enviar la respuesta con todos los perros formateados y validados
    res.json(allDog);
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware
  }
});

// Ruta para buscar perros por nombre
router.get('/search', async (req, res, next) => {
  const { name } = req.query;
  try {
    // Obtener datos de la API y la base de datos
    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dogDb = await Dog.findAll({
      where: { name: { [Op.iLike]: `${name}%` } },
      include: Temperament,
    });

    // Formatear y validar datos de la base de datos
    const validandoDogsDb = await formateoDb(dogDb);
    // Formatear y validar datos de la API
    const validandoDogsApi = await formateoApi(dogApi);

    // Combinar datos de la API y la base de datos
    const allDog = await validandoDogsApi.concat(validandoDogsDb);

    if (!name) {
      res.send(allDog);
    } else {
      // Filtrar perros por nombre y enviar la respuesta
      const dog = await allDog.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );

      return res.status(200).send(dog);
    }
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware
  }
});

// Ruta para obtener detalles de un perro por ID
router.get('/:idRaza', async (req, res, next) => {
  const { idRaza } = req.params;
  if (!idRaza) {
    return res.status(400).send({ msg: 'Falta enviar datos obligatorios' });
  }
  try {
    // Obtener datos de la API y la base de datos
    const dogApi = (await axios.get(`${API}?api_key=${API_KEY}`)).data;
    const dogDb = await Dog.findAll({ include: Temperament });

    // Formatear y validar datos de la base de datos
    const validandoDogsDb = await formateoDb(dogDb);
    // Formatear y validar datos de la API
    const validandoDogsApi = await formateoApi(dogApi);

    // Combinar datos de la API y la base de datos
    const allDog = await validandoDogsDb.concat(validandoDogsApi);

    // Filtrar perro por ID y enviar la respuesta
    const dog = allDog.filter((d) => d.id == idRaza);

    return res.status(200).send(dog);
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware
  }
});

// Ruta para crear un nuevo perro
router.post('/', async (req, res) => {
  // Extraer los campos necesarios del cuerpo de la solicitud
  const { name, height_min, height_max, weight_min, weight_max, temperament } =
    req.body;

  // Verificar si faltan campos obligatorios
  if (!name || !height_min || !height_max || !weight_min || !weight_max) {
    return res.status(400).send({ msg: 'Falta enviar datos obligatorios' });
  }

  try {
    // Crear un nuevo perro en la base de datos usando los datos proporcionados
    const dog = await Dog.create(req.body);

    // Buscar el temperamento en la base de datos
    let tempDb = await Temperament.findAll({
      where: { id: temperament },
    });

    // Asociar el temperamento al perro creado
    await dog.addTemperament(temperament);

    // Enviar una respuesta exitosa
    return res.status(201).send({ msg: 'Perro creado correctamente' });
  } catch (error) {
    console.log(error); // Registrar cualquier error en la consola
    // Enviar una respuesta de error si ocurre un problema
    return res.status(500).send({ msg: 'Error al crear el perro' });
  }
});

module.exports = router;
