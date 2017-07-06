var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  entry: [
    "babel-polyfill",
    __dirname + '/src/Checkout.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'Checkout.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: __dirname + '/src',
        use: [
          { loader: 'babel-loader', options: { presets: ['es2015'] } }
        ]
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      comments: false,
      mangle: {
        screw_ie8: true
      }
    })
  ]
};
