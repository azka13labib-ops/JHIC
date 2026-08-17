const fs = require('fs'); 
const https = require('https'); 

const download = (url, path) => { 
  https.get(url, (res) => { 
    if (res.statusCode === 200) { 
      res.pipe(fs.createWriteStream(path)); 
      console.log('Downloaded:', path);
    } else if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) { 
      download(res.headers.location, path); 
    } else { 
      console.log('Failed:', url, res.statusCode); 
    } 
  }).on('error', (err) => {
    console.error('Error downloading', url, err.message);
  }); 
}; 

download('https://logo.clearbit.com/jagoanhosting.com', 'frontend/public/images/sponsors/jagoan-hosting.png'); 
download('https://logo.clearbit.com/kominfo.go.id', 'frontend/public/images/sponsors/komdigi.png'); 
download('https://logo.clearbit.com/ngalup.co', 'frontend/public/images/sponsors/ngalup.png'); 
// Garuda spark and JIHC may not have clearbit logos
download('https://logo.clearbit.com/garudaspark.com', 'frontend/public/images/sponsors/garuda-spark.png'); 
download('https://logo.clearbit.com/jihc.id', 'frontend/public/images/sponsors/jihc.png');
