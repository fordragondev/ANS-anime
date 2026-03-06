const https = require('https');
const fs = require('fs');

const url = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZlNDQ1ODIwYjYxZjQzZDM4NzBhYjM5ZGFlODEwMTE3EgsSBxDglrbWvAkYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTcxOTkwOTMzODk5NTEyNjYwNQ&filename=&opi=89354086';
const file = fs.createWriteStream("stitch.html");

https.get(url, function (response) {
    response.pipe(file);
    file.on("finish", () => {
        file.close();
        console.log("Download Completed");
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
