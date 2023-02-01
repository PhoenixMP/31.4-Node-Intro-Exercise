const fs = require('fs');
const process = require('process');
const axios = require('axios')



function cat(path, write) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log(`There was an erro: ${err}`);
            process.exit(1);

        }
        if (write) {
            writing(data, write)

        } else {
            console.log(data);
        }
    });
}

async function webCat(path, write) {
    try {
        let resp = await axios.get(path);
        if (write) {
            writing(resp.data, write)

        } else {
            console.log(resp.data.slice(0, 20), '...')
        }
    }
    catch (err) {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
    }
}


function writing(content, write) {

    try {
        fs.writeFileSync(write, content);
        console.log('Successfully wrote to file!');
    } catch (error) {
        console.error(`File write failed: ${error}`)
        process.exit(1);
    }
}


if (process.argv[2] === '--out') {


    if (process.argv[4].includes('http')) {
        webCat(process.argv[4], process.argv[3]);

    } else {
        cat(process.argv[4], process.argv[3]);
    }

} else {
    if (process.argv[2].includes('http')) {
        webCat(process.argv[2]);

    } else {
        cat(process.argv[2]);
    }
}
