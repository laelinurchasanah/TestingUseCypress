const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Handle JavaScript and TypeScript files
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match TypeScript files
        use: 'ts-loader', // Use ts-loader to transpile TypeScript
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/, // Match JavaScript/JSX files
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile JSX/JS files
          options: {
            presets: [
              '@babel/preset-env', // Supports modern JavaScript features
              '@babel/preset-react', // Supports React JSX syntax
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Handle CSS imports
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
