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

    handleClick: function () {
      
    },

    render: function () {
      return (
        <td>
          {/*<div>{this.props.children}</div>*/}
          <input ref="input" 
                 onChange={this.props.onChange}
                 value={this.props.children}></input>
        </td>
      );
    }
  });

  return CustomCell;
});