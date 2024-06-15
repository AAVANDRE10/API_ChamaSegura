const bcrypt = require('bcryptjs');
const authenticateUtil = require('../../utils/authenticate.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

        res.status(401).json({ msg: "Invalid email/password" });

    } catch (error) {
        console.error(`Error while trying to sign in: ${ error }`);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password, type, nif } = req.body;

        const existingUser = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                type: type,
                nif: nif,
            },
        });

        const accessToken = authenticateUtil.generateAccessToken({ id: newUser.id, name: newUser.name });
        res.status(201).json({ name: newUser.name, token: accessToken });

    } catch (error) {
        console.error(`Error while trying to sign up: ${ error }`);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await prisma.users.findUnique({
            where: { id: id }
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        console.error(`Error while trying to get user: ${error}`);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { name, email, nif } = req.body;

        if (email) {
            const existingEmailUser = await prisma.users.findUnique({
                where: { email: email },
            });

            if (existingEmailUser && existingEmailUser.id !== userId) {
                return res.status(400).json({ msg: "Email already in use by another user" });
            }
        }

        if (nif) {
            const existingNifUser = await prisma.users.findUnique({
                where: { nif: nif },
            });

            if (existingNifUser && existingNifUser.id !== userId) {;
                return res.status(400).json({ msg: "NIF already in use by another user" });
            }
        }

        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: {
                name: name,
                email: email,
                nif: nif,
            },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(`Error while trying to update user: ${error}`);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { oldPassword, newPassword } = req.body;

        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ msg: "Invalid old password" });
        }

        const hashedNewPassword = bcrypt.hashSync(newPassword, 8);

        await prisma.users.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        res.status(200).json({ msg: "Password updated successfully" });
    } catch (error) {
        console.error(`Error while trying to change password: ${error}`);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}