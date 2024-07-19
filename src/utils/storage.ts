export const setStorage = (data: { [key: string]: string }) => {
  chrome.storage.sync.set(data, function () {
    console.log('✔ Item saved on storage successfully');
  });
};

export const getStorage = async (key: string): Promise<any> => {
  const result = await chrome.storage.sync.get(key);
  if (!result || result.wishList === '') return Promise.reject();
  return result;
};

export const deleteStorage = (key: string, callback: () => any) => {
  chrome.storage.sync.remove(key, () => {
    console.log('✔ Item delete on storage successfully');
    callback();
  });
};
