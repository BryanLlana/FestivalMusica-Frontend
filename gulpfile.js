import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as sassPkg from 'sass'
import gulpPlumber from 'gulp-plumber'

import gulpImageMin from 'gulp-imagemin'
import gulpCache from 'gulp-cache'
import gulpWebp from 'gulp-webp'
import gulpAvif from 'gulp-avif'

const { src, dest, watch, parallel } = gulp
const sass = gulpSass(sassPkg)

const scss = done => {
  src('src/scss/app.scss')
    .pipe(gulpPlumber())
    .pipe(sass())
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

const dev = () => {
  watch('src/scss/**/*.scss', scss)
}

const devParallel = parallel(imagenes, webp, avif, dev)

export {
  scss,
  webp,
  imagenes,
  avif,
  dev,
  devParallel
}

