const commonConfig = require('@elbwalker/webpack');

const es5Config = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', // For ES5 conversion
              '@babel/preset-typescript', // For TypeScript
            ],
          },
        },
      },
    ],
  },
};

const nodeConfig = {
  target: 'node',
  entry: './src/modules/node.ts',
  output: {
    filename: 'index.js',
    library: { type: 'commonjs2' },
  },
};

const browserConfig = {
  entry: './src/modules/browser.ts',
  output: {
    filename: 'walker.js',
  },
};

const es5WalkerConfig = {
  entry: './src/modules/walker.es5.ts',
  output: {
    filename: 'walker.es5.js',
    library: {
      type: 'umd',
      name: 'Elbwalker',
      export: 'default',
    },
  },
};

const moduleConfig = {
  entry: './src/modules/node.ts',
  experiments: {
    outputModule: true,
  },
  output: {
    library: {
      type: 'module',
    },
    filename: 'index.mjs',
  },
};

module.exports = [
  { ...commonConfig, ...browserConfig },
  { ...commonConfig, ...es5Config, ...es5WalkerConfig },
  { ...commonConfig, ...nodeConfig },
  { ...commonConfig, ...moduleConfig },
];
