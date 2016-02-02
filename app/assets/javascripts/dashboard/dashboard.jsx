"use strict";
$(function() {
  var ele = $('#dashboard');
  console.log(ele)
  if (ele.length > 0) {
    React.render(React.createElement(EC.Dashboard), ele[0]);
  }
});

EC.Dashboard = React.createClass({
  getInitialState: function() {
    return ({
      classrooms: null,
      hasPremium: null,
      performance: null
    });
  },

  componentWillMount: function() {
    this.classRoomRequest = $.get('classroom_mini', function(result) {
      this.setState({classrooms: result.classes});
    }.bind(this));
    this.premiumRequest = $.get('premium', function(result) {
      this.setState({hasPremium: result.hasPremium});
    }.bind(this));
    this.performanceQuery = $.get('dashboard_query', function(result) {
      this.setState({performance: result});
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.classRoomRequest.abort();
    this.premiumRequest.abort();
  },

  hasClasses: function() {
    if (this.state.classrooms === null)
      return <EC.AddClassMini/>;
    else {
      return (<EC.MyClasses classList={this.state.classrooms}/>);
    }
  },

  render: function() {
    return (
      <div>
        {this.hasClasses()}
      </div>
    );
  }
});
