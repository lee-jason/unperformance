define([
  'jquery',
  'react',
  'underscore',
  'app/words',
  'jsx!app/DataAnalysisView',
  'jsx!app/clock',
  'jsx!app/CustomCell'
], function (
  $,
  React,
  _,
  Words,
  DataAnalysisView,
  Clock,
  CustomCell
) {
  var Graph = React.createClass({

    getDefaultProps: function () {
      return {
        minCols: 5,
        minRows: 50,
        maxCols: 5,
        maxRows: 100
      };
    },

    getInitialState: function () {
      return {
        data: [],
        showClock: true,
        tableHistory: []
      };
    },

    componentDidMount: function () {
      this.regenerateData();
    },

    handleCellChange: function (row, col, event) {
      var dataClone = $.extend(true, [], this.state.data);
      dataClone[row][col] = event.target.value;
      this.setState({data: dataClone});
    },

    generateCell: function (childValue, row, col) {
      return (
        <CustomCell key={"cell:"+row.toString()+col.toString()}
                    onChange={_.partial(this.handleCellChange, row, col)}>
          {childValue}
        </CustomCell>
      );
    },

    generateRows: function (colCount, rowCount) {
      var rows = [];
      for (var i = 0; i < this.state.data.length; i++) {
        var cell = [];
        for (var j = 0; j < this.state.data[i].length; j++) {
          cell.push(this.generateCell(this.state.data[i][j], i, j));
        }
        rows.push(<tr key={"row:"+i}>{cell}</tr>);
      }
      return (
        <tbody>
          {rows}
        </tbody>
      );
    },

    renderTable: function () {
      return (
        <table key={new Date()}>
          {this.generateRows()}
        </table>
      );
    },

    regenerateData: function () {
      var colCount = Math.floor(Math.random() * this.props.maxCols) + this.props.minCols;
      var rowCount = Math.floor(Math.random() * this.props.maxRows) + this.props.minRows;
      var data = [];
      for (var i = 0; i < rowCount; i++) {
        var rowContent = [];
        for (var j = 0; j < colCount; j++) {
          rowContent.push(Words.getWord(5));
        }
        data.push(rowContent);
      }
      var cloneTableHistory = _.clone(this.state.tableHistory);
      cloneTableHistory.push($('table'));
      this.setState({
        data: data, 
        tableHistory: cloneTableHistory});
    },

    toggleClock: function () {
      this.setState({showClock: !this.state.showClock});
    },

    render: function () {
      return (
      	<div>
          {this.state.showClock ? <Clock /> : null}
          <span>Times regenerated: {this.state.tableHistory.length}</span>
          <button onClick={this.regenerateData}>Regenerate Data</button>
          <button onClick={this.toggleClock}>Toggle clock</button>
          <DataAnalysisView data={this.state.data} />
          {this.renderTable()}
	      </div>
      );
    }
  });

  return Graph;
});