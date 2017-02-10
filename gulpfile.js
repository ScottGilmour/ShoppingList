gulp.task('serve', function() {
    browserSync.init({
        port: 3001,
        proxy: {
            target: "localhost:3000",
            ws: true
        }
    });
});
