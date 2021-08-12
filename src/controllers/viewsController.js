const Sermon = require('../models/sermon');
const Event = require('../models/events');
const News = require('../models/news');
const Members = require('../models/members');
const Department = require('../models/department');
const Gallery = require('../models/gallery');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

function getMonthName(month) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month];
}

exports.getSermons = catchAsync(async (req, res, next) => {
  let sermonsCount = await Sermon.countDocuments();
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }
  let monthName = 'All';
  if (req.query.month <= 11) {
    monthName = getMonthName(Number(req.query.month));
    let countSermon = await Sermon.aggregate([
      {
        $match: { month: { $eq: Number(req.query.month) } },
      },
      {
        $group: {
          _id: null,
          sumNum: { $sum: 1 },
        },
      },
    ]);
    if (countSermon.length > 0) {
      sermonsCount = countSermon[0].sumNum;
    } else {
      sermonsCount = 0;
    }
  }

  const features = new APIFeatures(Sermon.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const sermons = await features.query;

  res.status(200).render('sermon', {
    title: 'Sermons',
    sermons,
    sermonsCount,
    monthName,
    page,
  });
});

exports.readSermon = catchAsync(async (req, res, next) => {
  const sermon = await Sermon.findOne({
    _id: req.params.id,
  });

  res.render('readSermon', {
    sermon,
  });
});

exports.readNews = catchAsync(async (req, res, next) => {
  const news = await News.findOne({
    _id: req.params.id,
  });

  res.render('readNews', {
    news,
  });
});

exports.readEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({
    _id: req.params.id,
  });

  res.render('readEvent', {
    event,
  });
});

exports.departments = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Gallery.find(), {
    department: 'general',
  })
    .filter()
    .sort();

  const images = await features.query;

  res.status(200).render('department', {
    images,
  });
});

exports.viewDepartment = catchAsync(async (req, res, next) => {
  const featuresDept = new APIFeatures(Department.find(), {
    name: req.params.id,
  })
    .filter()
    .sort();

  const department = await featuresDept.query;
  const featuresImg = new APIFeatures(Gallery.find(), {
    department: req.params.id,
  })
    .filter()
    .sort();

  const images = await featuresImg.query;

  if (department.length === 0 || images.length < 10) {
    return res.redirect('/departments');
  }

  res.status(200).render('viewDepartment', {
    department,
    images,
  });
});

exports.loginPage = (req, res) => {
  res.render('login');
};
exports.tithesPage = (req, res) => {
  res.render('tithes');
};
exports.adminPage = (req, res) => {
  res.render('admin');
};

exports.getNews = catchAsync(async (req, res, next) => {
  let newsCount = await News.countDocuments();
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }

  let monthName = 'All';
  if (req.query.month <= 11) {
    monthName = getMonthName(Number(req.query.month));
    let countNews = await News.aggregate([
      {
        $match: { month: { $eq: Number(req.query.month) } },
      },
      {
        $group: {
          _id: null,
          sumNum: { $sum: 1 },
        },
      },
    ]);
    if (countNews.length > 0) {
      newsCount = countNews[0].sumNum;
    } else {
      newsCount = 0;
    }
  }

  const features = new APIFeatures(News.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const news = await features.query;

  res.status(200).render('news', {
    title: 'News',
    news,
    newsCount,
    monthName,
    page,
  });
});
exports.getEvents = catchAsync(async (req, res, next) => {
  let eventsCount = await Event.countDocuments();
  let page = 1;
  if (req.query.page) {
    page = req.query.page;
  }

  let monthName = 'All';
  if (req.query.month <= 11) {
    monthName = getMonthName(Number(req.query.month));
    let countEvents = await Event.aggregate([
      {
        $match: { month: { $eq: Number(req.query.month) } },
      },
      {
        $group: {
          _id: null,
          sumNum: { $sum: 1 },
        },
      },
    ]);
    if (countEvents.length > 0) {
      eventsCount = countEvents[0].sumNum;
    } else {
      eventsCount = 0;
    }
  }

  const features = new APIFeatures(Event.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const events = await features.query;

  res.status(200).render('event', {
    title: 'Events',
    events,
    eventsCount,
    monthName,
    page,
  });
});

exports.index = catchAsync(async (req, res, next) => {
  let dispMembers;
  const featuresImg = new APIFeatures(Gallery.find(), {
    department: 'general',
  })
    .filter()
    .sort();

  let images = await featuresImg.query;
  if (images.length < 10) {
    images = [
      'gallery-1.jpg',
      'gallery-2.jpg',
      'gallery-3.jpg',
      'gallery-4.jpg',
      'gallery-5.jpg',
      'gallery-6.jpg',
      'gallery-7.jpg',
      'gallery-8.jpg',
      'gallery-9.jpg',
      'gallery-10.jpg',
    ];
  }
  const featuresMember = new APIFeatures(Members.find(), {
    department: 'general',
  })
    .filter()
    .sort();

  const members = await featuresMember.query;

  if (members.length >= 3) {
    const disp = [...members];
    const dispSet = new Set();

    while (dispSet.size < 3) {
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * disp.length);
        dispSet.add(disp[random]);
      }
    }
    dispMembers = Array.from(dispSet);

    return res.status(200).render('index', {
      images,
      dispMembers,
    });
  }
  dispMembers = [
    {
      member_name: 'Anonymous 1',
      member_opinion:
        'This church has been a blessing to everyone in my family.',
      photo: '/testimonial-1',
    },
    {
      member_name: 'Anonymous 2',
      member_opinion:
        'This church has been a blessing to everyone in my family.',
      photo: '/testimonial-2',
    },
    {
      member_name: 'Anonymous 3',
      member_opinion:
        'This church has been a blessing to everyone in my family.',
      photo: '/testimonial-3',
    },
  ];
  res.status(200).render('index', {
    images,
    dispMembers,
  });
});
