const mix = require("laravel-mix");

mix
    .js("./src/js/index.js", "./dist/app.js")
    .sass("./src/scss/main.scss", "./dist/app.css")
    .react();