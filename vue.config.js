module.exports = {
  transpileDependencies: [
    'feathers-vuex',
    'vuetify',
  ],
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('eslint')
  //     .use('eslint-loader')
  //     .loader('eslint-loader')
  //     .tap((options) => {
  //       /* eslint-disable no-param-reassign */
  //       options.envs = ['node', 'es2020'];
  //       options.parserOptions = options.parserOptions || {};
  //       options.parserOptions.parser = 'babel-eslint';
  //       return options;
  //       /* eslint-enable no-param-reassign */
  //     });
  // },
};
