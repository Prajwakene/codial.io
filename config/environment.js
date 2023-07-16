// this file will contain the environment like production and developement
// defining two objects developement and production
// 1)
const developement = {
    name: 'developement',
    // we need to getting different password ,different files over here and access it from this part say static files that we put in
    //creating an key asset_path for the static files that we put in the index.js
    asset_path: './assets'
}


// 2)
const production = {
    name: 'production'
}

// 3)
module.exports = developement;