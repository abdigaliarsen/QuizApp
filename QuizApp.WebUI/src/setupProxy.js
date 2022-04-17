const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/users",
    "/api/quizzes",
    "/api/questions",
    "/api/answers",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7049',
        secure: false
    });

    app.use(appProxy);
};
