import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import GlobalThemeProvider from '../styles/GlobalThemeProvider';
import { alertException } from '../utils/errors';

export default function App() {
  const [text, setText] = useState('Server pending');

  const formSubmit = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const input = document.getElementById('msg') as HTMLInputElement;
      const inputData: string = input.value + '';
      chrome.runtime.sendMessage({ event: 'formEnter', input: inputData });
    }
  };

  useEffect(() => {
    chrome.runtime.connect({ name: 'popup' });

    chrome.runtime.onMessage.addListener(function ({ event, data }) {
      switch (event) {
        case 'sendMessage': {
          // Redux로 상태관리에 도전 해보자!
          break;
        }
        case 'closeTab': {
          window.alert('Error: Same ip connected!');
          window.close();
          break;
        }
        case 'error': {
          alertException(window, data);
          break;
        }
      }
    });
  }, []);

  return (
    <GlobalThemeProvider>
      <img src="icon.png" />
      <input type="text" id="msg" onKeyUp={e => formSubmit(e)} />
      <p>{text}</p>
    </GlobalThemeProvider>
  );
}

const root = document.createElement('div') as HTMLElement;
root.className = 'root';
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<App />);
