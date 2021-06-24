const contentClassName = 'vjs-logo-content';
const hideClassName = 'vjs-logo-hide';

export const getContent = (player) => {
  return player.contentEl().getElementsByClassName(contentClassName)[0];
};

export const getImage = (content) => {
  return content.getElementsByTagName('img')[0];
};

export const getAnchor = (content) => {
  return content.getElementsByTagName('a')[0];
};

export const isTop = (content) => {
  return content.style.top !== '' && content.style.bottom === '';
};

export const isBottom = (content) => {
  return content.style.top === '' && content.style.bottom !== '';
};

export const isLeft = (content) => {
  return content.style.left !== '' && content.style.right === '';
};

export const isRight = (content) => {
  return content.style.left === '' && content.style.right !== '';
};

export const isShown = (content) => {
  return !content.classList.contains(hideClassName);
};
