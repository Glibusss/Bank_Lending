'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

//Learn more

const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionOne = document.querySelector('#section--1');

//Smooth page navigation

document.querySelector('.nav__links').addEventListener('click', function(e)
{
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
  const href = e.target.getAttribute('href');

  const sectionCoords = document.querySelector(href).getBoundingClientRect();

  window.scrollTo({
    left:sectionCoords.left+window.pageXOffset,
    top:sectionCoords.top+window.pageYOffset,
    behavior:'smooth'
  });
  }
});

//Вкладки

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function(e)
{
const clickedBut = e.target.closest('.operations__tab');

if(!clickedBut)
return;

tabs.forEach(tab=>tab.classList.remove('operations__tab--active'));
clickedBut.classList.add('operations__tab--active');

tabContents.forEach(content=>content.classList.remove('operations__content--active'));

document.querySelector(`.operations__content--${clickedBut.dataset.tab}`).classList.add('operations__content--active');
});

//Потускнение на навбаре

const nav = document.querySelector('nav');

function navLinksHoverAnimation(e, opacity)
{
  if(e.target.classList.contains('nav__link'))
  {
    const linkOver = e.target;
    const siblingLinks = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(link=>{
      if(link!==linkOver)
      link.style.opacity = this;
    })

    logo.style.opacity=this;
    logoText.style.opacity=this;
  }

}

nav.addEventListener('mouseover',navLinksHoverAnimation.bind(0.4));

nav.addEventListener('mouseout',navLinksHoverAnimation.bind(1));

//sticky navigation(without observer)
/*
const sectionOneCoords = sectionOne.getBoundingClientRect();

window.addEventListener('scroll',function(e)
{

if(window.scrollY>sectionOneCoords.top)
  nav.classList.add('sticky');
else
  nav.classList.remove('sticky');

})*/

//sticky nav (with observer)

const header = document.querySelector('.header');

function getStickyNav(entries)
{
  const entry = entries[0];

  if(!entry.isIntersecting)
  nav.classList.add('sticky');
  else
  nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(
getStickyNav,
{
root: null,
threshold:0,
rootMargin:`-${nav.getBoundingClientRect().height}px`
}
);

headerObserver.observe(header);

//section appearance

const allSections = document.querySelectorAll('.section');

function appearanceSecrion(entries,observer)
{
  const entry = entries[0];
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

}

const sectionObserver = new IntersectionObserver(appearanceSecrion,{
root:null,
threshold:0.2,

});

allSections.forEach(function(sect){
  sectionObserver.observe(sect);
  sect.classList.add('section--hidden');
});

//lazy loading

const lazyImg = document.querySelectorAll('img[data-src]');

function loadImages(entries,observer)
{
  const entry = entries[0];

  if(!entry.isIntersecting)return;

  entry.target.src = entry.target.dataset.src;

  

  entry.target.addEventListener('load',function()
  {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold:0.7,
  rootMargin:'300px'
});

lazyImg.forEach(img=>lazyImagesObserver.observe(img));

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(function(btn)
{
  btn.addEventListener('click',openModalWindow);
})

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

//Learn more

btnScrollTo.addEventListener('click',function(e){

  const sectionOneCoords = sectionOne.getBoundingClientRect();
  
  
  window.scrollTo({
    left:sectionOneCoords.left+window.pageXOffset,
    top:sectionOneCoords.top+window.pageYOffset,
    behavior:'smooth'
  });
  
  
  })

  //slider

  const slides = document.querySelectorAll('.slide');
  const btnRightSlide = document.querySelector('.slider__btn--right');
  const btnLeftSlide = document.querySelector('.slider__btn--left');

  let i = 0;

  function showSlider(i)
  {

    slides.forEach(function(slide){

      slide.classList.add('hidden');
      slides[i%slides.length].classList.remove('hidden');
  
    });

  }

  showSlider(i);

  btnRightSlide.addEventListener('click', function()
  {
    ++i;
    showSlider(i);

  }
  )

  btnLeftSlide.addEventListener('click', function()
  {
    --i;

    if(i<0)
    i=slides.length-1;

    showSlider(i);

  }
  )

  

  