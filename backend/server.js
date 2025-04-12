const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const dummyData = {
	'12345': {
		caseNumber: '12345',
		courtName: 'Supreme Court',
		status: 'Case in Hearing',
		nextStep: 'Await the next scheduled hearing.'
	},
	'67890': {
		caseNumber: '67890',
		courtName: 'District Court',
		status: 'Judgment Pending',
		nextStep: 'Judgment will be announced next month.'
	}
};

app.post('/case-status', (req, res) => {
	const { caseNumber } = req.body;
	const caseData = dummyData[caseNumber];
	if (caseData) {
		res.json(caseData);
	} else {
		res.json({ status: 'Case Not Found', nextStep: 'Please check your details.' });
	}
});

const PORT = 5000;
app.listen(PORT, () => {
	const message = `Server is now up and running on port ${PORT}! Ready to handle justice tracking requests.`;
	console.log(message);
});