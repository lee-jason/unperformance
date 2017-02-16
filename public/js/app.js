require([
  'jquery',
  'react',
  'reactdom',
  'app/constants',
  'jsx!app/graph'
], function (
  $,
  React,
  ReactDOM,
  Constants,
  Graph
) {
  console.log(Constants);
  console.log('this is apps thing');
  ReactDOM.render(React.createElement(Graph), $('#main-content')[0]);
});