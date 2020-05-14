import React from 'react';
import ReactDOM from 'react-dom';
import AnalyticsDashboard from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AnalyticsDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
