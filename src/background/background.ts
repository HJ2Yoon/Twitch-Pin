import { putStream } from '../utils/api';
import { setStorage, getStorage } from '../utils/storage';
import { CustomError } from '../utils/errors';

// client wishList will send request
let wishList: string[] = [];

chrome.runtime.onInstalled.addListener(() => {
  console.log('background start');
  // TODO: on installed function
});

chrome.runtime.onConnect.addListener(async function (port) {
  if (port.name === 'popup') {
    console.log('Event: onStart from popup');

    // Client wishList initialize
    await getStorage('wishList')
      .then(res => {
        console.log('Client wishList initialize:', res);
        // App intialize = getStream
        wishList = res.wishList.split(',');
      })
      .catch(() => {
        console.log('Error: Undefined wishlist');
      });
    // Clinet data initialize

    const eventSource = new EventSource(
      `http://ec2-52-78-33-149.ap-northeast-2.compute.amazonaws.com:3000/sse?list=${wishList.join(
        ',',
      )}`,
    );

    eventSource.addEventListener('open', function () {
      console.log('✔Client connected to Server');
    });

    eventSource.addEventListener('error', function () {
      eventSource.close();
      return sendMsg2Pop({ event: 'closeTab' });
    });

    eventSource.addEventListener('message', function (e) {
      const data: { [key: string]: string | number } = JSON.parse(e.data);
      console.log('Get message from server', data);
      sendMsg2Pop({ event: 'sendMessage', data });
    });

    port.onDisconnect.addListener(function () {
      // wishList save on local storage
      setStorage({ wishList: wishList.join(',') });
      return eventSource.close();
    });
  }
});

chrome.runtime.onMessage.addListener(async function ({ event, input }) {
  switch (event) {
    case 'formEnter': {
      console.log('Event: formEnter from popup');
      try {
        if (wishList.includes(input)) throw new CustomError('Err: sameUser');
        const res = await putStream(input);
        console.log(res);
        sendMsg2Pop({ event: 'sendMessage', data: res });
        wishList.push(input);
        console.log('Client wishList update successfully', input);
      } catch (err) {
        // Send error to popup
        if (err instanceof CustomError) {
          sendMsg2Pop({ event: 'error', data: err.message });
        }
      }
      break;
    }
  }
});

const sendMsg2Pop = (data: { [key: string]: any }) => {
  chrome.runtime.sendMessage(data);
};
