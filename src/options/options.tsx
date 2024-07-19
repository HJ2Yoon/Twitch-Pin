import ReactDOM from 'react-dom';

export default function App() {
  return <div>This is option page</div>;
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
