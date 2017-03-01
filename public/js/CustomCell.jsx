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
        highlighted: false,
        children: '',
        onChange: function () {}
      };
    },

    render: function () {
      return (
        <td className={this.props.highlighted ? "highlighted" : ''}>
          <div onClick={this.props.onClick}>{this.props.children}</div>
          {/*<input ref="input" 
                 onChange={this.props.onChange}
                 value={this.props.children}></input>*/}
        </td>
      );
    }
  });

  return CustomCell;
});