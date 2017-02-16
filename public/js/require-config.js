requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../js',
        jquery: 'jquery',
        react: 'react-with-addons',
        reactdom: 'react-dom',
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