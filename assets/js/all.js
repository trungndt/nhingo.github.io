(function ($) {
  "use strict"; // Start of use strict


  /* ---------------------------------------------
   Scripts initialization
   --------------------------------------------- */

  $(window).load(function () {
    renderWorkFilter();
    renderPortfolio();
    initWorkFilter();
    setupPortfolioDetailsModal();
    // setupSwiper();
  });

})(jQuery); // End of use strict

/* ---------------------------------------------
 Portfolio section
 --------------------------------------------- */

// Projects filtering
const BASE_URL = './assets/images/portfolio/';
let fselector = 0;
let work_grid = $("#work-grid, #isotope");
let $modal = $('#modalPortfolioDetails');
let galleryTop;
let galleryThumbs;

const CATEGORY = {
  WEB: 'Website',
  LANDING: 'Landing',
  ECOM: 'E-Commerce',
  HOSPITALITY: 'Hospitality',
  TRAVEL: 'Travel',
  FASHION: 'Fashion',
  BARISTA: 'Barista',
  ARCHITECTURE: 'Architecture',
  CAREER: 'Career'
}

let data = [{
    id: '01',
    title: 'Gem Center',
    category: ['Website', 'Hospitality'],
    img: '',
    client: '',
    date: '',
    online: ''
  },
  // {
  //   id: '',
  //   title: '',
  //   category: [],
  //   img: '',
  //   client: '',
  //   date: '',
  //   online: ''
  // }
]

let projectsData = [
  // {
  //   id: '',
  //   name: '',
  //   thumbUrl: '',
  //   categories: [],
  //   client: '',
  //   time: '',
  //   tech: [],
  //   online: '',
  //   screnshots: []
  // },
  
  {
    id: '',
    name: 'Zindel Beratung',
    thumbUrl: 'zindel/thumb.jpg',
    categories: ['Business', 'Landing'],
    client: 'Zindel Consultant',
    time: 'Aug, 2019',
    tech: ['WordPress'],
    onlineText: 'Zindel Beratung',
    online: 'http://dev.caophan.com/wf_zindel',
    screnshots: [
      'zindel/01.jpg',
      'zindel/02.jpg',
      'zindel/03.jpg',
    ]
  },
  {
    id: '',
    name: 'Home Credit Career',
    thumbUrl: 'homecredit/thumb.jpg',
    categories: ['Business'],
    client: 'Home Credit',
    time: 'Jan, 2019',
    tech: ['WordPress'],
    onlineText: 'HomeCredit Career',
    online: 'http://dev.caophan.com/wf_homecredit_client',
    screnshots: [
      'homecredit/01.jpg',
      'homecredit/02.jpg',
      'homecredit/03.jpg',
      'homecredit/04.jpg',
      'homecredit/05.jpg',
      'homecredit/06.jpg',
    ]
  },
  {
    id: '',
    name: 'Tan Son Nhat Pavillon',
    thumbUrl: 'pavillon/thumb.jpg',
    categories: ['Hospitality', 'Landing'],
    client: 'Tan Son Nhat Hotel Group',
    time: 'Nov, 2018',
    tech: ['WordPress'],
    online: 'www.tansonnhatpavillon.com',
    screnshots: [
      'pavillon/01.jpg',
      'pavillon/02.jpg',
      'pavillon/03.jpg',
    ]
  },
  {
    id: '',
    name: 'GAC Architecture',
    thumbUrl: 'gac/thumb.jpg',
    categories: ['Architecture'],
    client: 'Green Architecture & Construction',
    time: 'May - Jun, 2018',
    tech: ['Wordpress'],
    online: 'www.gac.com.vn',
    screnshots: [
      'gac/01.jpg',
      'gac/02.jpg',
      'gac/03.jpg',
      'gac/04.jpg',
      'gac/05.jpg'
    ]
  },
  {
    id: '',
    name: 'Luxury Palace',
    thumbUrl: 'luxury/thumb.jpg',
    categories: ['Hospitality'],
    client: 'Vuon Cau Co.,LTD',
    time: 'Jul - Nov, 2018',
    tech: ['Wordpress'],
    online: 'www.luxurypalace.vn',
    screnshots: [
      'luxury/01.jpg',
      'luxury/02.jpg',
      'luxury/03.jpg',
      'luxury/04.jpg',
      'luxury/05.jpg',
      'luxury/06.jpg'
    ]
  },
  {
    id: '',
    name: 'Barista Mart',
    thumbUrl: 'barista/thumb.jpg',
    categories: ['E-Commerce'],
    client: 'Barista Mart',
    time: 'Jun, 2018',
    tech: ['WordPress'],
    screnshots: [
      'barista/01.jpg',
      'barista/02.jpg',
      'barista/03.jpg',
    ]
  },
  {
    id: '',
    name: 'Katus Sture',
    thumbUrl: 'katus/thumb.jpg',
    categories: ['E-Commerce'],
    client: 'Katus Store',
    time: 'Jul, 2017',
    tech: ['WordPress'],
    online: 'www.katusstore.vn',
    screnshots: [
      'katus/01.jpg',
      'katus/02.jpg',
      'katus/03.jpg',
      'katus/04.jpg',
      'katus/05.jpg',
    ]
  },
  {
    id: '',
    name: 'Gody',
    thumbUrl: 'gody/thumb.jpg',
    categories: ['Travelling'],
    client: 'Gody',
    time: 'Mar, 2017',
    tech: ['HTML5', 'CSS3'],
    online: 'www.gody.vn',
    screnshots: [
      'gody/01.jpg',
      'gody/02.jpg',
      'gody/03.jpg',
      'gody/04.jpg',
      'gody/05.jpg',
    ]
  },
  {
    id: '',
    name: 'Phat\'s Dumpling House',
    thumbUrl: 'phats/thumb.jpg',
    categories: ['Hospitality', 'Landing'],
    client: 'Tribe Hospitality',
    time: 'Aug, 2016',
    tech: ['MVC.NET', 'HTML5'],
    online: 'www.phatsdumplinghouse.com',
    screnshots: [
      'phats/01.jpg',
      'phats/02.jpg',
      'phats/03.jpg'
    ]
  },
  {
    id: '',
    name: 'The Racha Room',
    thumbUrl: 'theracha/thumb.jpg',
    categories: ['Hospitality', 'Landing'],
    client: 'Tribe Hospitality',
    time: 'Apr, 2015',
    tech: ['MVC.NET', 'HTML5'],
    online: 'www.theracharoom.com',
    screnshots: [
      'theracha/01.jpg',
      'theracha/02.jpg',
      'theracha/03.jpg',
      'theracha/04.jpg',
      'theracha/05.jpg',
      'theracha/06.jpg'
    ]
  },
  {
    id: '',
    name: 'The Log Restaurant',
    thumbUrl: 'thelog/thumb.jpg',
    categories: ['Hospitality'],
    client: 'PQC Hospitality',
    time: '2014',
    tech: ['MVC.NET', 'HTML5'],
    online: 'www.thelog.com.vn',
    screnshots: [
      'thelog/01.jpg',
      'thelog/02.jpg',
      'thelog/03.jpg',
      'thelog/04.jpg'
    ]
  },
  {
    id: '',
    name: 'GEM Center',
    thumbUrl: 'gem/thumb.jpg',
    categories: ['Hospitality'],
    client: 'PQC Hospitality',
    time: 'Mar, 2014',
    tech: ['MVC.NET', 'HTML5'],
    online: 'www.gemcenter.com.vn',
    screnshots: [
      'gem/01.jpg',
      'gem/02.jpg',
      'gem/03.jpg',
      'gem/04.jpg',
      'gem/05.jpg',
      'gem/06.jpg'
    ]
  },
]

function renderPortfolio() {
  let $grid = $('#work-grid');
  $grid.empty();
  projectsData.forEach(function (e, i) {
    let $tmp = $($('#workItem').html().trim());
    $tmp.find('img').attr('src', BASE_URL + e.thumbUrl);
    $tmp.find('.work-title').html(e.name.toUpperCase());
    $tmp.find('.work-descr').html(e.categories.join(', ').toUpperCase());
    e.categories.forEach(category => {
      $tmp.addClass(category.toLowerCase());
    });
    $tmp.data('json', e);
    $grid.append($tmp);
  })
}

function renderWorkFilter() {
  function removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique).sort();
  }
  let filterItems = removeDups(projectsData.map(function (e) {
    return e.categories
  }).flat());
  filterItems.forEach(function (e) {
    let $item = $('<a/>', {
      'class': 'filter',
      'href': '#' + e.toLowerCase(),
      'data-filter': '.' + e.toLowerCase(),
      'html': e
    });

    $('.works-filter').append($item);
  })
}

function initWorkFilter() {
  (function ($) {
    "use strict";
    let isotope_mode;
    if (work_grid.hasClass("masonry")) {
      isotope_mode = "masonry";
    } else {
      isotope_mode = "fitRows"
    }

    $(".filter").click(function () {
      $(".filter").removeClass("active");
      $(this).addClass("active");
      fselector = $(this).attr('data-filter');

      work_grid.imagesLoaded(function () {
        work_grid.isotope({
          itemSelector: '.mix',
          layoutMode: isotope_mode,
          filter: fselector
        });
      });
      return false;
    });

    if (window.location.hash) {
      $(".filter").each(function () {
        if ($(this).attr("data-filter") == "." + window.location.hash.replace("#", "")) {
          $(this).trigger('click');

          $("html, body").animate({
            scrollTop: $("#portfolio").offset().top
          });

        }
      });
    }

    work_grid.imagesLoaded(function () {
      work_grid.isotope({
        itemSelector: '.mix',
        layoutMode: isotope_mode,
        filter: fselector
      });
    });


  })(jQuery);
}
// {
//   id: '',
//   name: 'The Racha Room',
//   thumbUrl: 'theracha/01.jpg',
//   categories: ['Hospitality', 'Landing'],
//   client: 'Tribe Hospitality',
//   time: 'Apr, 2015',
//   tech: ['MVC.NET'],
//   online: 'www.theracharoom.com',
//   screnshots: [
//     'theracha/01.jpg',
//     'theracha/02.jpg',
//     'theracha/03.jpg',
//     'theracha/04.jpg',
//     'theracha/05.jpg',
//     'theracha/06.jpg'
//   ]
// },
function setupPortfolioDetailsModal(e) {
  $(document).on('click', 'a.work-lightbox-link', function (e) {
    e.preventDefault();
    let $me = $(e.currentTarget);
    let $parent = $me.parent();
    let data = $parent.data('json');
    // Render Details
    $modal.find('.title').html(data.name);
    $modal.find('[data-role="client"]').html(data.client);
    $modal.find('[data-role="time"]').html(data.time);
    $modal.find('[data-role="tech"]').html(data.tech.join(', '));
    let $online = $modal.find('[data-role="online"] a');
    if (data.online !== undefined) {
      $online.closest('tr').show();
      let onlineText = data.onlineText || data.online;
      $online
        .html(onlineText)
        .attr('href', 'http://' + data.online);
    } else {
      $online.closest('tr').hide();
    }
    // Render photos
    let $galleryTop = $('.gallery-top .swiper-wrapper');
    let $galleryThumbs = $('.gallery-thumbs .swiper-wrapper');
    $galleryTop.empty();
    $galleryThumbs.empty();
    data.screnshots.forEach(function (e) {
      let $slide = $($('#tmpSlide').html().trim());
      $slide.find('img').attr('src', BASE_URL + e);
      $galleryTop.append($slide.clone());
      $galleryThumbs.append($slide.clone());
    });

    $modal.modal('show');
  })

  $('#modalPortfolioDetails').on('shown.bs.modal', function () {
    setupSwiper();
    setTimeout(function () {
      $modal.addClass('show-completed');
    }, 250);
  });

  $('#modalPortfolioDetails').on('hidden.bs.modal', function () {
    galleryTop.destroy(true, true);
    galleryThumbs.destroy(true, true);
    $modal.removeClass('show-completed');
  });

};

function setupSwiper() {
  galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 0,
    slidesPerView: 3,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });
}
// $('#modalPortfolioDetails').modal('show');