const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Read the JSON data
const advocateData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/api/advocateData.json'), 'utf8')
);

// JSONBin.io configuration
const jsonBinUrl = 'https://api.jsonbin.io/v3/b';
const apiKey = '$2a$10$FEiZjfqUTcEpqt7vLiPLhuJAVu1CPMjh0nfvK5x/M..BoCKgPq5Oy'; // Replace with your actual API key

async function uploadData() {
  try {
    const response = await axios.post(jsonBinUrl, advocateData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey,
        'X-Bin-Private': false, // Make the bin public
        'X-Bin-Name': 'advocate-data'
      }
    });

    console.log('Data uploaded successfully to JSONBin!');
    console.log('Bin ID:', response.data.metadata.id);
    console.log('Access URL:', `https://api.jsonbin.io/v3/b/${response.data.metadata.id}`);
    
    // Write the bin ID to a configuration file for future reference
    fs.writeFileSync(
      path.join(__dirname, '../src/api/jsonBinConfig.js'),
      `export const JSONBIN_CONFIG = {\n  BIN_ID: "${response.data.metadata.id}",\n  API_KEY: "${apiKey}"\n};\n`
    );
    console.log('Configuration file created with Bin ID');
  } catch (error) {
    console.error('Error uploading data to JSONBin:', error.response ? error.response.data : error.message);
  }
}

uploadData(); 