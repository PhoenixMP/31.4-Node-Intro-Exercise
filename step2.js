const fs = require('fs');
const process = require('process');
const axios = require('axios')


function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log(`There was an erro: ${err}`);
            process.exit(1);

        }
        console.log(data);

    });
}

async function webCat(path) {
    try {
        let resp = await axios.get(path);
        console.log(resp.data.slice(0, 20), '...')
    }
    catch (err) {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
    }
}

if (process.argv[2].includes('http')) {
    webCat(process.argv[2]);

} else {
    cat(process.argv[2]);
}
