import path from 'path';
import fs from 'fs';

export default async (req, res) => {
  const { categoryName, subCategoryName, fileName } = req.query;

  const imagePath = path.join(
    process.cwd(),
    'server/images/pdflabels',
    categoryName,
    subCategoryName,
    fileName
  );

  try {
    const imageBuffer = fs.readFileSync(imagePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).send(imageBuffer);
  } catch (error) {
    res.status(404).end();
  }
};

