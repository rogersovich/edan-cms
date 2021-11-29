module.exports = {

  transpileDependencies: ['vuetify'],
  devServer: {
    port: 8888, // CHANGE YOUR PORT HERE!
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Edan CMS',
    },
  },
}
