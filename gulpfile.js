import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as sassPkg from 'sass'
import gulpPlumber from 'gulp-plumber'

const { src, dest, watch } = gulp
const sass = gulpSass(sassPkg)

const scss = (done) => {
  src('src/scss/app.scss')
    .pipe(gulpPlumber())
    .pipe(sass())
    .pipe(dest('dist/css'))
  done()
}

const dev = () => {
  watch('src/scss/**/*.scss', scss)
}

export {
  scss,
  dev
}

