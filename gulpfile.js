import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as sassPkg from 'sass'

const { src, dest, watch } = gulp
const sass = gulpSass(sassPkg)

const scss = (done) => {
  src('src/scss/app.scss')
    .pipe(sass())
    .pipe(dest('dist/css'))
  done()
}

const dev = () => {
  watch('src/scss/app.scss', scss)
}

export {
  scss,
  dev
}

