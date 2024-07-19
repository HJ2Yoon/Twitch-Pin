import { CustomError } from './errors';

export const getStream = async (wishList: string) => {
  await fetch(
    `http://ec2-52-78-33-149.ap-northeast-2.compute.amazonaws.com:3000/getStream?list=${wishList}`,
  );
};

export const putStream = async (login: string) => {
  const res = await fetch(
    `http://ec2-52-78-33-149.ap-northeast-2.compute.amazonaws.com:3000/putStream?login=${login}`,
  );
  if (!res.ok) throw new CustomError('Err: noUser');
  return res.json();
};
