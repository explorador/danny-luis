//https://nvbn.github.io/2015/06/19/jekyll-browsersync/

var gulp	= require('gulp');
var shell	= require('gulp-shell');
var bs		= require('browser-sync').create();

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
// gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
	// Listen to change events on HTML and reload
	bs.watch("_site/**/*.html").on("change", bs.reload);

	// Provide a callback to capture ALL events to CSS
	// files - then filter for 'change' and reload all
	// css files on the page.
	bs.watch("_site/assets/*.css", function (event, file) {
	    if (event === "change") {
	        bs.reload("*.css");
	    }
	});

	// Now init the Browsersync server
	bs.init({
	    server: "_site/"
	});
});

gulp.task('default', ['build', 'serve']);
