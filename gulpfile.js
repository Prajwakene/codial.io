const gulp =require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

//gulp takaes th etask
gulp.task ('css', function(){
    console.log("minifying css...");
    // ** means any file and any folder inside it 
    gulp.src('./assets/sass/**/*.scss')
    //pasing over 
    .pipe(sass())
    .pipe(cssnano())
    //puting them in folder
    .pipe(gulp.dest('./assets.css'));

    //changing th enaming conventiom
    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    //storing a manifest
    .pipe(rev.manifest({
        //current working directory
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'))
})
