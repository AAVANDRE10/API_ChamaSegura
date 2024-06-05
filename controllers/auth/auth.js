const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');
const uploadLink = require('../../utils/upload');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware de upload para a rota de registro
const upload = uploadLink.single('photo');

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (passwordIsValid) {
                const accessToken = authenticateUtil.generateAccessToken({ id: user.id, name: user.name });
                res.status(200).json({ name: user.name, token: accessToken });
                return;
            }
        }

        res.status(401).json({ msg: "invalid_login" });

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

// Endpoint de registro de usuário com upload de imagem
exports.signup = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        try {
            const { name, username, email, password, type } = req.body;

            const existingUser = await prisma.users.findUnique({
                where: {
                    email: email,
                },
            });

            if (existingUser) {
                return res.status(400).json({ msg: "User already exists" });
            }

            const hashedPassword = bcrypt.hashSync(password, 8);

            // URL da imagem salva localmente
            const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

            const newUser = await prisma.users.create({
                data: {
                    name: name,
                    username: username,
                    email: email,
                    password: hashedPassword,
                    photo: photoUrl,
                    type: type,
                },
            });

            const accessToken = authenticateUtil.generateAccessToken({ id: newUser.id, name: newUser.name });
            res.status(201).json({ name: newUser.name, token: accessToken });

        } catch (error) {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
}