require([
  'jquery',
  'react',
  'reactdom',
  'jsx!app/graph'
], function (
  $,
  React,
  ReactDOM,
  Graph
) {
  window.React = React;
  window.ReactDOM = ReactDOM;
  ReactDOM.render(React.createElement(Graph), $('#main-content')[0]);
});