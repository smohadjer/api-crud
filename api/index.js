import fs from 'fs';
import path from 'path';

export default async (req, res) => {
	const jsonPath = path.join(process.cwd(), 'data', '_quotes.json');
	const jsonFile = fs.readFileSync(jsonPath, 'utf8');
	const json = JSON.parse(jsonFile);
	return res.status(200).json(json);
}
