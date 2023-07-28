const env = require('./environment');
const fs = require('fs');
const path =require('path')

// //the function is taking app why ecause we are sending the fucntion  to the locals of the app
// module.exports = (app) => {
//     //definign the global function
//     app.locals.assetPath = function(filePath){
//         if(env.name == "developement"){
//             return filePath;
//         }
//         //acessing the keys in the rev.manifest.json
//         return '/'+ JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json'))[filePath]);
//     }
// }
module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        console.log('File path:', filePath); // Debugging
        if(env.name == "development"){
            return filePath;
        }
        try {
            const revManifestPath = path.join(__dirname, '../public/assets/rev-manifest.json');
            const revManifest = fs.readFileSync(revManifestPath, 'utf8');
            console.log('Rev manifest:', revManifest); // Debugging
            const revData = JSON.parse(revManifest);
            console.log('Rev data:', revData); // Debugging
            return '/' + revData[filePath];
        } catch (err) {
            console.error('Error parsing rev-manifest.json:', err); // Debugging
            return filePath;
        }
    }
};

