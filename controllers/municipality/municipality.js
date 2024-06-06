const fs = require('fs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Return all municipalities
exports.getAll = async (req, res) => {
    try {
        const municipalities = await prisma.municipalities.findMany();
        return res.json(municipalities);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Return municipality by its id (municipality number)
exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.number);
        const municipality = await prisma.municipalities.findUnique({
            where: { id }
        });
        if (!municipality) return res.status(404).json({ error: 'Municipality not found' });
        return res.json(municipality);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Create a new municipality
exports.create = async (req, res) => {
    try {
        const { taxNumber, address, responsible, state, userId } = req.body;
        const newMunicipality = await prisma.municipalities.create({
            data: {
                taxNumber,
                address,
                responsible,
                state,
                userId
            }
        });
        return res.status(201).json(newMunicipality);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update a municipality
exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.number);
        const { taxNumber, address, responsible, state, userId } = req.body;
        const updatedMunicipality = await prisma.municipalities.update({
            where: { id },
            data: {
                taxNumber,
                address,
                responsible,
                state,
                userId
            }
        });
        return res.json(updatedMunicipality);
    } catch (error) {
        console.error('Error updating municipality:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a municipality by its id (municipality number)
exports.delete = async (req, res) => {
    try {
        const id = parseInt(req.params.number);
        await prisma.municipalities.delete({
            where: { id }
        });
        return res.send("ok");
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}