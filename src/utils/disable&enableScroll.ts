export const disableScroll = function () {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.width = '100%';
  document.body.style.position = 'fixed';
};

export const enableScroll = function () {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = 'auto';
  window.scrollTo(0, parseInt(scrollY) * -1);
};
