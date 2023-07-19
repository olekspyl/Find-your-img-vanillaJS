import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  galleryEl: document.querySelector('.gallery'),
};
// let result;

// refs.galleryEl.addEventListener('click', onGalleryClick);

function createMarkup(info) {
  // const idItems = info.map(info => info.id);

  const markup = info.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      id,
    }) => {
      return `<li class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" class="gallery__image"  loading="lazy" data-id="${id}"/>
  </a>
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </li>`;
    }
  );

  refs.galleryEl.insertAdjacentHTML('beforeend', markup.join(''));

  const lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}

export { createMarkup };
