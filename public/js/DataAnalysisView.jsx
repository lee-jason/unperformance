define([
  'react',
  'reactdom',
  'underscore',
  'app/DataAnalysis'
], function (
  React,
  ReactDOM,
  _,
  DataAnalysis
) {
  var DataAnalysisView = React.createClass({
    getDefaultProps: function () {
      return {data: []};
    },

    componentDidMount: function () {
      this.initDataAnalysisModule();
    },

    componentDidUpdate: function (prevProps, prevState) {
      if (!_.isEqual(prevProps.data, this.props.data)) {
        this.initDataAnalysisModule();
      }
    },

    initDataAnalysisModule: function () {
      var dataAnalysis = new DataAnalysis({
        model: this.props.data
      });
      dataAnalysis.render();
      $(this.refs.container).html(dataAnalysis.el);
    },

    render: function () {
      return (
      	<div ref="container" />
      );
    }
  });


  return DataAnalysisView;
});