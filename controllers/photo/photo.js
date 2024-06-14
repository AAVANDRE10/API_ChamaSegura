const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bucket = require('../../utils/firebaseAdmin');

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
            const fileName = `${Date.now()}_${file.originalname}`;
            const fileUpload = bucket.file(`uploads/${fileName}`);
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (error) => {
                console.error('Error uploading file:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            });

            blobStream.on('finish', async () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/uploads/${fileName}`;

                const updatedUser = await prisma.users.update({
                    where: { id: userId },
                    data: { photo: publicUrl },
                });

                return res.status(200).json(updatedUser);
            });

            blobStream.end(file.buffer);
        } else {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
    } catch (error) {
        console.error('Error updating user photo:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};