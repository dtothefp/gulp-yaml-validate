import gulp from 'gulp';
import mocha from 'gulp-mocha';
import shell from 'gulp-shell';
import webpack from 'webpack';
import config from './webpack.config';
import {argv} from 'yargs';
import {task} from 'gulp-shell';

const compiler = webpack(config);
const logger = (err, stats) => {
  if(err) throw new Error(err);

  if(!argv.dev) {
    console.log(stats.toString());
  }
};

gulp.task('bundle', () => {
  if(argv.watch) {
    compiler.watch({
        aggregateTimeout: 300,
        poll: true
    }, logger);
  } else {
    compiler.run(logger);
  }
});

gulp.task('test', task([
    'babel-node `which gulp` mochaTest'
  ])
);

gulp.task('mochaTest', ['bundle'], () => {
  return gulp.src('./test/*-spec.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});
