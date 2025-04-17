const models = require("../database/models");

// Crear usuario
const createUser = async (req, res) => {
	console.log('creating user');
	try {
		const user = await models.User.create(req.body);
		return res.status(201).json({ user });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
	console.log('getting users');
	try {
		const users = await models.User.findAll({ include: [] });
		return res.status(200).json({ users });
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
	console.log('getting user by ID');
	try {
		const user = await models.User.findOne({ where: { id: req.params.id } });
		if (user) {
			return res.status(200).json({ user });
		} else {
			return res.status(404).json({ error: `User with ID ${req.params.id} not found` });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// Actualizar usuario
const updateUser = async (req, res) => {
	console.log('updating user...');
	try {
		const user = await models.User.findOne({ where: { id: req.params.id } });
		if (user) {
			const { name, email, age, comments } = req.body;
			Object.assign(user, { name, email, age, comments });
			await user.save();
			return res.status(200).json({ updated: user });
		} else {
			return res.status(404).json({ error: `User with ID ${req.params.id} not found` });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// Eliminar usuario
const deleteUser = async (req, res) => {
	console.log('deleting user...');
	try {
		const user = await models.User.findOne({ where: { id: req.params.id } });
		if (user) {
			await user.destroy();
			return res.status(200).json({ deleted: req.params.id });
		} else {
			return res.status(404).json({ error: `User with ID ${req.params.id} not found` });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser
};

