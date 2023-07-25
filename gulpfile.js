const gulp =require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del').default;

//gulp takaes the task for css
gulp.task ('css', function(done){
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
    .pipe(gulp.dest('./public/assets'));
    done();
});

//gulp takaes the task for js
gulp.task ('js', function(done){
    console.log("minifying js...");
    // ** means any file and any folder inside it 
    gulp.src('./assets/**/*.js')
    //pasing over 
    .pipe(uglify())
    .pipe(rev())
    //puting them in folder
    .pipe(gulp.dest('./assets/assets'))
    //storing a manifest
    .pipe(rev.manifest({
        //current working directory
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//gulp takaes the task for images
gulp.task ('imgges', function(done){
    console.log("compressing images...");
    // ** means any file and any folder inside it 
    //rejex ..we define a patterns which matches  a string
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    //pasing over 
    .pipe(imagemin())
    .pipe(rev())
    //puting them in folder
    .pipe(gulp.dest('./assets/assets'))
    //storing a manifest
    .pipe(rev.manifest({
        //current working directory
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


//empty the public/assets directory ....since we are building th eproject we need to clear the previos build ..and need to build from scratch
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css','js', 'images'), function(done){
    console.log('Building assets');
    //callback
    done();
});