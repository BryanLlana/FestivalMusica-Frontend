import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as sassPkg from 'sass'
import gulpPlumber from 'gulp-plumber'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcss from 'gulp-postcss'
import sourcemaps from 'gulp-sourcemaps'

import gulpImageMin from 'gulp-imagemin'
import gulpCache from 'gulp-cache'
import gulpWebp from 'gulp-webp'
import gulpAvif from 'gulp-avif'

const { src, dest, watch, parallel } = gulp
const sass = gulpSass(sassPkg)

const scss = done => {
  src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(gulpPlumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
  done()
}

const imagenes = done => {
  src('src/img/**/*.{png,jpg}')
    .pipe(gulpCache(gulpImageMin({
      optimizationLevel: 3
    })))
    .pipe(dest('dist/img'))
  done()
}

const webp = done => {
  src('src/img/**/*.{png,jpg}')
    .pipe(gulpWebp({
      quality: 50
    }))
    .pipe(dest('dist/img'))
  done()
}

const avif = done => {
  src('src/img/**/*.{png,jpg}')
    .pipe(gulpAvif({
      quality: 50
    }))
    .pipe(dest('dist/img'))
  done()
}

const javascript = done => {
  src('src/js/**/*.js')
    .pipe(dest('dist/js'))

  done()
}

const dev = done => {
  watch('src/scss/**/*.scss', scss)
  watch('src/js/**/*.js', javascript)

  done()
}

const devParallel = parallel(imagenes, webp, avif, dev)

export {
  scss,
  webp,
  imagenes,
  avif,
  javascript,
  dev,
  devParallel
}

