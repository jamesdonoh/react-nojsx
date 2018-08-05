/* global React, ReactDOM */
(function() {
  'use strict';
  
  /*
   * Simple app using React without JSX (to avoid compilation step)
   */

  const e = React.createElement; // Shorthand alias

  // Initialise data
  const items = [
    { id: 1, name: 'Wakefield' },
    { id: 2, name: 'Huddersfield' },
    { id: 3, name: 'Peterborough' }
  ];

  /*
   * Declare stateless components as plain functions
   */
  function Title(props) {
    return e('h1', null, props.children);
  }

  function ListItem(props) {
    return e('li', null, props.children);
  }

  function List() {
    return e('ul', null, items.map((item) => e(ListItem, { key: item.id }, item.name)));
  }

  function App() {
    // Use React.Fragment to avoid unneeded wrapper div
    return e(React.Fragment, null, e(Title, null, 'something'), e(List, null), e(TimeStamp, null));
  }

  /*
   * Declare components that need local state or lifecycle hooks as classes
   */
  class TimeStamp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { date: new Date() };
    }

    componentDidMount() {
      // Called after component has been rendered to the DOM for the first time
      this.timerId = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      // Free up resources when component is removed from DOM
      clearInterval(this.timerId);
    }

    tick() {
      this.setState({
        date: new Date()
      });
    }

    render() {
      const formattedTime = this.state.date.toLocaleTimeString();
      return e('p', null, 'It is ', formattedTime, '.');
    }
  }

  // Render application
  const root = document.getElementById('react-root');
  ReactDOM.render(e(App, null), root);
}());