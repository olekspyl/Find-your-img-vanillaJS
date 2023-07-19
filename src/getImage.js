import { createMarkup } from './createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const refs = {
  loadBtn: document.querySelector('.load-more'),
};

const API_KEY = '38311066-df12cc60e023e61528f3463e4';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getImage(query, page = 1) {
  try {
    let limit = 39;
    const response = await axios.get(
      `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limit}`
    );

    if (page === 1 && response.data.hits.length !== 0) {
      Notify.success(`Hooray! We found ${response.data.total} images.`);
    }

    if (!response.data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const totalPages = Math.ceil(response.data.total / limit);
    if (totalPages !== page) {
      refs.loadBtn.hidden = false;
    } else if (totalPages === page) {
      refs.loadBtn.hidden = true;
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    return createMarkup(response.data.hits);
  } catch (error) {
    console.error(error);
  }
}

export { getImage };
