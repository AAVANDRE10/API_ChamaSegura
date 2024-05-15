const fs = require('fs');

//return all burns
exports.getAll = async (req, res) => {
    try {
        const burns = await prisma.burn.findMany();
        return res.json(burns);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

//return burn by his id (burn number)
exports.getById = async (req, res) => {
    try {
        const id = parseInt(req.params.number);
        const burn = await prisma.burn.findUnique({
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
        const { date, reason, latitude, longitude, otherData, userId, burnTypeId } = req.body;
        const newBurn = await prisma.burn.create({
            data: {
                date,
                reason,
                latitude,
                longitude,
                otherData,
                userId,
                burnTypeId
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
        const { date, reason, latitude, longitude, otherData, userId, burnTypeId } = req.body;
        const updatedBurn = await prisma.burn.update({
            where: { id },
            data: {
                date,
                reason,
                latitude,
                longitude,
                otherData,
                userId,
                burnTypeId
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
        await prisma.burn.delete({
            where: { id }
        });
        return res.send("ok");
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}