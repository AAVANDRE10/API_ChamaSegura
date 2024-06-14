const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updatePhoto = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const file = req.file;

    try {
        console.log(`Received request to update photo for user ID: ${userId}`);
        if (!file) {
            console.error('No file uploaded');
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        console.log(`File uploaded: ${file.originalname}`);
        const existingUser = await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            console.error('User not found');
            return res.status(404).json({ msg: 'User not found' });
        }

        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.originalname}`;
        const finalImagePath = path.join(__dirname, '../../public/uploads', fileName);

        if (!fs.existsSync(finalImagePath)) {
            fs.renameSync(file.path, finalImagePath);
            console.log(`File saved to ${finalImagePath}`);

            const updatedUser = await prisma.users.update({
                where: { id: userId },
                data: { photo: `/uploads/${fileName}` },
            });

            console.log('User photo updated successfully');
            return res.status(200).json(updatedUser);
        } else {
            console.error('File with the same name already exists');
            return res.status(400).json({ msg: 'File with the same name already exists' });
        }
    } catch (error) {
        console.error('Error updating user photo:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};