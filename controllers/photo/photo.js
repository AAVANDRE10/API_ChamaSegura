const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updatePhoto = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const file = req.file;

    try {
        const existingUser = await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (file) {
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.originalname}`;
            const finalImagePath = path.join(__dirname, '../../public/uploads', fileName);

            if (!fs.existsSync(finalImagePath)) {
                fs.renameSync(file.path, finalImagePath);

                const updatedUser = await prisma.users.update({
                    where: { id: userId },
                    data: { photo: `/uploads/${fileName}` },
                });

                return res.status(200).json(updatedUser);
            } else {
                return res.status(400).json({ msg: 'File with the same name already exists' });
            }
        } else {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
    } catch (error) {
        console.error('Error updating user photo:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};