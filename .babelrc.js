module.exports = (api) => {
    const prodBrowsers = require("./package").browserslist;
    const devBrowsers  = "last 2 Chrome versions";

    return {
        presets: [
            ["@babel/preset-env", {
                targets:     api.env("production") ? prodBrowsers : devBrowsers,
                useBuiltIns: 'entry'
            }],
            "@babel/preset-react"
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread"
        ]
    }
};