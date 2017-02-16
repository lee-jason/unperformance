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
  console.log('this is apps thing');
  ReactDOM.render(React.createElement(Graph), $('#main-content')[0]);
});