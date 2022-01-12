// responsive function for iphone5/se width
export const responsive = () => {
  if(window.innerHeight < window.innerWidth){
    if(window.innerWidth < 576){
      document.querySelector('.container').firstElementChild.classList.add('row-cols-2');
      document.querySelector('.container').firstElementChild.classList.remove('row-cols-1');
  }
  }else {
    document.querySelector('.container').firstElementChild.classList.remove('row-cols-2');
    document.querySelector('.container').firstElementChild.classList.add('row-cols-1');

  }
}
