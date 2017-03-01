define(['react'], function (React) {

  var Clock = React.createClass({
    getInitialState: function () {
      return {time: 'initialized time'};
    },

    componentDidMount: function () {
      this.startTimer();
    },

    componentWillUnmount: function () {
      this.unmounted = true;
    },

    generateTime: function (date) {
      return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    },

    startTimer: function () {
      var animationLoop = function () {
        if (this && !this.unmounted) {
          this.setState({time: this.generateTime(new Date())});
        }
        window.requestAnimationFrame(animationLoop);
      }.bind(this);

      window.requestAnimationFrame(animationLoop);
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