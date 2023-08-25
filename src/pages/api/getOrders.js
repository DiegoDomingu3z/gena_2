// pages/api/getOrders.js
import path from 'path';
import fs from 'fs';

export default async (req, res) => {
    const { filePath } = req.query;
    console.log('%cgetOrders.js line:7 filePath', 'color: #26bfa5;', filePath);

    if (!filePath) {
        return res.status(400).json({ error: 'Missing filePath parameter' });
    }

    const imagePath = path.join(
        process.cwd(),
        'server/images/prints',
        filePath
    );

    try {
        const imageBuffer = fs.readFileSync(imagePath);
        res.setHeader('Content-Type', 'application/pdf');
        res.status(200).send(imageBuffer);
    } catch (error) {
        res.status(404).end();
    }
};