requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js',
        jquery: 'jquery',
        react: 'react-with-addons',
        reactdom: 'react-dom',
        backbone: 'backbone',
        underscore: 'underscore',
        jsx: "jsx",
        text: "text",
        JSXTransformer: 'JSXTransformer'
    },
    shim: {
        JSXTransformer: {
            exports: "JSXTransformer"
        }
    },
    jsx: {
        fileExtension: ".jsx"
    }
});

requirejs(['app/app']);