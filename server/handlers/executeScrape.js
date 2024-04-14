const { exec } = require('child_process')
const executeScrapeOnRemax = async () => {
    return new Promise((resolve, reject) => {

        exec('python ./Scripts/main.py', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }

            const outPutProperty = JSON.parse(stdout);



            resolve(outPutProperty);
        });

    })
}

module.exports = {
    executeScrapeOnRemax
}