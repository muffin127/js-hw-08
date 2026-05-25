const galleryElem = document.querySelector('.js-gallery');

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
let modal = null;
let currentIndex = 0;

// GALLERY RENDER

function imageTemplate({ preview, original, description }, index) {
  return `
    <a href="${original}" class="image-link">
      <img
        class="image-item"
        src="${preview}"
        data-source="${original}"
        data-index="${index}"
        alt="${description}"
      />
    </a>
  `;
}

function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}

galleryElem.innerHTML = imagesTemplate(images);

// CLICK TO VIEW THE GALLERY

galleryElem.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  const img = event.target;
  if (img.nodeName !== 'IMG') return;

  currentIndex = Number(img.dataset.index);

  openModal();
}

// OPEN MODAL

function openModal() {
  const { original } = images[currentIndex];

  modal = basicLightbox.create(`
    <div class="modal">
      <img src="${original}" width="900">
    </div>
  `);

  modal.show();

  document.addEventListener('keydown', onKeyPress);
}

// CLOSE WITH ESC + ← →

function onKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
    return;
  }

  if (event.key === 'ArrowRight') {
    nextImage();
  }

  if (event.key === 'ArrowLeft') {
    prevImage();
  }
}

// NEXT / PREV

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateModal();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModal();
}

// UPDATE MODAL

function updateModal() {
  const { original } = images[currentIndex];

  modal.close();

  modal = basicLightbox.create(`
    <div class="modal">
      <img src="${original}" width="900">
    </div>
  `);

  modal.show();
}

// CLOSE MODAL

function closeModal() {
  modal.close();
  document.removeEventListener('keydown', onKeyPress);
}
