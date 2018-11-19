var paths = {
        stylesheets: {
            sass: 'styles/sass/*.scss',
            css: 'styles/css/'
        },

        scripts: {
            uncompressed: 'scripts/uncompressed/*.js',
            compressed: 'scripts/compressed/'
        }
    },
    gulp = require( 'gulp' ),
    uglify = require( 'gulp-uglify' ),
    sass = require( 'gulp-sass' ),
    livereload = require( 'gulp-livereload' ),
    prefix = require( 'gulp-autoprefixer' );

function errorLog ( error ) {
    console.error.bind( error );
    this.emit( 'end' );
}

// Scripts Task
// Uglifies
gulp.task( 'scripts', function () {
    // minifying my javascript
    gulp.src( paths.scripts.uncompressed )
        .pipe( uglify() )
        .on( 'error', errorLog )
        .pipe( gulp.dest( paths.scripts.compressed ) );
});

// Styles Task
gulp.task( 'styles', function () {
    gulp.src( paths.stylesheets.sass )
        .pipe( sass({outputStyle: 'compressed'})
        .on('error', sass.logError) )
        .on( 'error', errorLog )
        .pipe( prefix( 'last 2 versions' ) )
        .pipe( gulp.dest( paths.stylesheets.css ) )
        .pipe( livereload({ start: true }) );
});

// Watch Task
gulp.task( 'watch', function () {
    var server = livereload({ start: true });

    gulp.watch( paths.scripts.uncompressed, [ 'scripts' ] );
    gulp.watch( paths.stylesheets.sass, [ 'styles' ] );
});

// gulp.task( 'default', [ 'scripts', 'styles', 'image', 'watch' ]);
gulp.task( 'default', [ 'scripts', 'styles', 'watch' ]);