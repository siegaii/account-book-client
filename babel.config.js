module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // element 样式
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
};
