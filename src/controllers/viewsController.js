const Sermon = require('../models/sermon');
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

  res.status(200).render('sermon2', {
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
  console.log(sermon);

  res.render('readSermon', {
    sermon,
  });
});

exports.indexPage = catchAsync(async (req, res, next) => {
  const members = await Members.find();

  // const members = [];
  // console.log(members.length);
  if (members.length !== 0) {
    const disp = [...members];
    const dispSet = new Set();

    while (dispSet.size < 3) {
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * disp.length);
        dispSet.add(disp[random]);
      }
    }
    const dispMembers = Array.from(dispSet);
    // console.log(dispMembers);

    res.status(200).render('index', {
      message: 'message test',
      dispMembers,
    });
  }
  const dispMembers = [
    {
      member_name: 'Beatrice Sang',
      member_opinion:
        'This church has been a blessing to everyone in my family.',
      photo: '/testimonial-1',
    },
    {
      member_name: 'Humphrey Kibet',
      member_opinion:
        'This church has been a blessing to everyone in my family.',
      photo: '/testimonial-2',
    },
    {
      member_name: 'Brian Kiprotich',
      member_opinion:
        'This church has been a blessing to everyone in my family.',
      photo: '/testimonial-3',
    },
  ];
  res.status(200).render('index', {
    message: 'message test',
    dispMembers,
  });
});

exports.gallery = catchAsync(async (req, res, next) => {
  const images = await Gallery.find();
  const dispImg = [];
  const image = [];

  //pushing each image array into dispImg
  for (img of images) {
    dispImg.push();
  }
  console.log(dispImg);
  // Adding each image name into the image array
  dispImg.map((arr) => {
    for (img of arr) {
      image.push(img);
    }
  });

  console.log(image);
  console.log(image.length);
  if (image.length >= 10) {
    const disp = [...image];
    const dispSet = new Set();

    while (dispSet.size < 10) {
      for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * disp.length);
        dispSet.add(disp[random]);
      }
    }
    const dispImages = Array.from(dispSet);

    res.locals.images = dispImages;
    next();
  }
  const dispImages = [
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

  res.locals.images = dispImages;
  next();
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
    return res.status(200).render('department', {
      department,
    });
  }

  res.status(200).render('viewDepartment', {
    department,
    images,
  });
});

exports.tithesPage = (req, res) => {
  res.render('tithes');
};
exports.loginPage = (req, res) => {
  res.render('login');
};
exports.adminPage = (req, res) => {
  res.render('admin');
};
