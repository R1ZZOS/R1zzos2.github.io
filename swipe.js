let touchstartX = 0;
let touchendX = 0;
const swipeArea = document.getElementById('swipeArea');
swipeArea.addEventListener('touchstart', e => touchstartX = e.changedTouches[0].screenX);
swipeArea.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  if (touchendX < touchstartX - 50) cambiarMes(1);
  if (touchendX > touchstartX + 50) cambiarMes(-1);
});