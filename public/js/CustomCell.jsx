define([
	'react',
  'app/words'
], function (
  React,
  Words
) {
  var CustomCell = React.createClass({
  	getDefaultProps: function () {
      return {
        children: '',
        onChange: function () {}
      };
    },

    render: function () {
      return (
        <td>
          <input onChange={this.props.onChange} value={this.props.children}></input>
        </td>
      );
    }
  });

  return CustomCell;
});