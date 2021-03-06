var routes = require('./routes').routes;

var businessOptions = {
    views: {
        engines: {
            html: require('handlebars')
        },
        basePath: __dirname,
        path: './public/templates',
        compileOptions: {
            pretty: true
        }
    }
};

exports.register = function (plugin, options, next) {
    plugin.dependency('hapi-auth-cookie', function(plugin, next){
        next();
    });

    plugin.auth.strategy('cookie-route', 'cookie', {
        password: 'cpc-cookie-12345',
        cookie: 'cpc-cookie-route',
        redirectTo: false,
        isSecure: false
    });
    plugin.views(businessOptions.views);
    plugin.route(routes);
    next();
};

exports.register.attributes = {
    name: 'rbac-study',
    version: '1.0.0'
};