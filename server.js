const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');


const compiler = Webpack(webpackConfig);

const devServerOptions = {
    ...webpackConfig.devServer, open: true
};

const server = new WebpackDevServer(devServerOptions, compiler);

const logInternalIPs = async () => {
    const localIPv4 = await WebpackDevServer.internalIP('v4');
    const localIPv6 = await WebpackDevServer.internalIP('v6');

    console.log('Local IPv4 address:', localIPv4);
    console.log('Local IPv6 address:', localIPv6);
};

const runServer = async () => {
    console.log('Starting server...');
    await server.start();
};

// const stopServer = async () => {
//     console.log('Stopping server...');
//     await server.stop();
// };

logInternalIPs();
runServer();

// setTimeout(stopServer, 5000);