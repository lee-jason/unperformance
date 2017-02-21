define(['react'], function (React) {
	/*
    Issues: animationLoop timer loop doesn't get cleared when timer unmounts 
   */
  var Clock = React.createClass({
    getInitialState: function () {
      return {time: 'initialized time'};
    },

    componentDidMount: function () {
      this.startTimer();
    },

    componentWillUnmount: function () {
    	this.stopTimer();
    },

    generateTime: function (date) {
      return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    },

    startTimer: function () {
      var animationLoop = function () {
        this.setState({time: this.generateTime(new Date())});
        this.requestId = window.requestAnimationFrame(animationLoop);
      }.bind(this);

      this.requestId = window.requestAnimationFrame(animationLoop);
    },

    stopTimer: function () {
      window.cancelAnimationFrame(this.requestId);
    },

    render: function () {
      return (
        <div className="clock">
          {this.state.time}
        </div>
      );
    }
  });

  return Clock;
});