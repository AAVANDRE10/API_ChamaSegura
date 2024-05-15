const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
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


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
            },
        });

        const accessToken = authenticateUtil.generateAccessToken({ id: newUser.id, name: newUser.name });
        res.status(201).json({ name: newUser.name, token: accessToken });

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}