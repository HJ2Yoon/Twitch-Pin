export class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const alertException = (window: Window, error: string) => {
  switch (error) {
    case 'Err: noUser': {
      window.alert('Error: 찾으시는 유저를 서버에서 찾을수 없습니다.');
      break;
    }
    case 'Err: sameUser': {
      window.alert('Error: 찾으시는 유저는 이미 있는 유저입니다.');
      break;
    }
  }
};
