const fs = require('fs');

//return all burns
exports.getAll = async (req, res) => {
    try {
        const burns = await prisma.fire.findMany();
        return res.json(burns);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//return burn by his id (burn number)
exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.number);
        const burn = await prisma.fire.findUnique({
            where: { id }
        });
        if (!burn) return res.status(404).json({ error: 'Burn not found' });
        return res.json(burn);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//creates burn
exports.create = async (req, res) => {
    try{
        const { date, reason, latitude, longitude, otherData, userId, fireTypeId } = req.body;
        const newBurn = await prisma.fire.create({
            data: {
                date,
                reason,
                latitude,
                longitude,
                otherData,
                userId,
                fireTypeId
            }
        });
        return res.status(201).json(newBurn);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//updates burn
exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.number);
        const { date, reason, latitude, longitude, otherData, userId, fireTypeId } = req.body;
        const updatedBurn = await prisma.fire.update({
            where: { id },
            data: {
                date,
                reason,
                latitude,
                longitude,
                otherData,
                userId,
                fireTypeId
            }
        });
        return res.json(updatedBurn);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//delete burn by his id (burn number)
exports.delete = async (req, res) => {
    try {
        const id = parseInt(req.params.number);
        await prisma.fire.delete({
            where: { id }
        });
        return res.send("ok");
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}