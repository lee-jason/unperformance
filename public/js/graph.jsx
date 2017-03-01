define([
  'jquery',
  'react',
  'underscore',
  'app/words',
  'jsx!app/DataAnalysisView',
  'jsx!app/Clock',
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
        minCols: 8,
        minRows: 100,
        maxCols: 12,
        maxRows: 200
      };
    },

    getInitialState: function () {
      return {
        tableId: 0,
        data: [],
        tableHistory: [],
        highlighting: []
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

    handleCellClick: function (row, col, event) {
      var highlightingClone = $.extend(true, [], this.state.highlighting);
      highlightingClone[row][col] = !highlightingClone[row][col];
      this.setState({highlighting: highlightingClone});
    },

    generateCell: function (childValue, highlighted, row, col) {
      return (
        <CustomCell key={"cell:"+row.toString()+col.toString()}
                    highlighted={highlighted}
                    onClick={_.partial(this.handleCellClick, row, col)}>
          {childValue}
        </CustomCell>
      );
    },

    generateRows: function (colCount, rowCount) {
      var rows = [];
      for (var i = 0; i < this.state.data.length; i++) {
        var cell = [];
        for (var j = 0; j < this.state.data[i].length; j++) {
          cell.push(this.generateCell(this.state.data[i][j], this.state.highlighting[i][j], i, j));
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
        <table ref="table" key={this.state.tableId}>
          {this.generateRows()}
        </table>
      );
    },

    regenerateData: function () {
      var colCount = Math.floor(Math.random() * this.props.maxCols) + this.props.minCols;
      var rowCount = Math.floor(Math.random() * this.props.maxRows) + this.props.minRows;
      var data = [];
      var highlighting = [];
      for (var i = 0; i < rowCount; i++) {
        var rowContent = [];
        var highlightingRow = [];
        for (var j = 0; j < colCount; j++) {
          rowContent.push(Words.getWord(5));
          highlightingRow.push(false);
        }
        data.push(rowContent);
        highlighting.push(highlightingRow);
      }
      var cloneTableHistory = _.clone(this.state.tableHistory);
      cloneTableHistory.push($('table'));
      this.setState({
        tableId: ++this.state.tableId,
        data: data, 
        tableHistory: cloneTableHistory,
        highlighting: highlighting});
    },

    render: function () {
      return (
      	<div>
          <div>
            <p>Can we make typing in these inputs faster?</p>
            <p>Can we make table regeneration faster?</p>
            <p>Are we leaking dom nodes?</p>
            <p>Are we forgetting timers?</p>
            <p>Are we re-rendering react components needlessly?</p>
          </div>
          <Clock key={Math.random()}/>
          <span>Times regenerated: {this.state.tableHistory.length}</span>
          {/*this.state.showAnalysis ? <DataAnalysisView data={this.state.data} /> : null*/}
          <button onClick={this.regenerateData}>Regenerate Data</button>
          {this.renderTable()}
	      </div>
      );
    }
  });

  return Graph;
});