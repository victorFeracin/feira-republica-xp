const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Clients, Address } = require("../models/");


const ClientsController = {

    async createClient(req, res) {
        try {

            const { name, email, password, img } = req.body;

            const newPass = bcrypt.hashSync(password, 10);

            const newUser = await Clients.create({
                name,
                email,
                password: newPass,
                img,
                data_status: 1
            });

            return res.status(201).json(newUser);

        } catch (error) {
            res.status(400).json("Erro ao criar Cliente");
        }
    },

    async listClientPerId(req, res) {
        try {
            const { id_client } = req.params;

            const clientPerId = await Clients.findOne({
                where: {
                    id_client
                },
                include: { model: Address },
                attributes: { exclude: "password" }
            });


            if (!clientPerId) {
                return res.status(200).json("Nenhum Cliente cadastrado com essas informações!");
            }

            return res.status(200).json(clientPerId);

        } catch (error) {
            console.log(error);

            return res.status(400).json("Ocorreu um erro ao listar o Cliente desejado");
        }
    },

    async listAllClients(req, res) {
        try {

            const allClients = await Clients.findAll({
                include: { model: Address },
                attributes: { exclude: "password" }

            });

            if (!allClients) {
                return res.status(200).json("Nenhum Cliente cadastrado!");
            }

            return res.status(200).json(allClients);

        } catch (error) {
            console.log(error);

            return res.status(400).json("Ocorreu um erro ao listar os usuarios");
        }
    },

    async updateClient(req, res) {

        try {
            const { id_client } = req.params;
            const clientToUpdate = await Clients.findOne({
                where: {
                    id_client,
                    data_status: 1
                }
            });

            if (clientToUpdate == null) {
                return res.status(400).json({ message: "Cliente não encontrado" })
            }

            const query = {};

            if (req.body.password != null) {
                const newpassword = bcrypt.hashSync(req.body.password, 10);
                query.password = newpassword;
            }

            if (req.body.name != null) {
                query.name = req.body.name;
            }

            if (req.body.email != null) {
                query.email = req.body.email;
            }

            if (req.body.img != null) {
                query.img = req.body.img;
            }

            const updatedClient = await Clients.update(
                query,
                {
                    where: {
                        id_client,
                        data_status: 1
                    }
                }
            );

            return res.status(200).json({ ...clientToUpdate, ...query });

        } catch (error) {
            console.log(error);
            res.status(400).json("Não foi possivel atualizar os dados do Cliente");
        }
    },

    async deleteClient(req, res) {
        try {
            const { id_client } = req.params;
            const deleteClientPerId = await Clients.count({
                where: {
                    id_client,
                    data_status: 1
                }
            });

            if (deleteClientPerId != 1) {
                return res.status(404).json("Cliente não encontrado!");
            }

            await Clients.update(
                { data_status: 0 },
                {
                    where: {
                        id_client
                    }
                }
            );

            return res.status(204).json(deleteClientPerId);




        } catch (error) {
            return res.status(500).json("Erro ao tentar deletar Cliente!");
        }
    },

    async loginClient(req, res) {

        try {
            const { email, password } = req.body;
            const login = await Clients.findOne({
                where: {
                    email,
                    data_status: 1
                },
                include: { model: Address },

            })


            if (!login) {
                return res.status(401).json("Email ou Senha invalido, verique e tente novamente");
            }

            if (!bcrypt.compareSync(password, login.password)) {
                return res.status(401).json("Email ou Senha invalido, verique e tente novamente");
            }

            const { id_client, name, address_clients } = login


            return res.json({
                token: jwt.sign({ id_client, name, email, address_clients }, process.env.SECRET_KEY, {
                    expiresIn: process.env.EXPIRES_SECRET_KEY
                })
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

}

module.exports = ClientsController