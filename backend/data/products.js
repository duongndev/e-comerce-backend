const bcrypt = require("bcrypt");
const crypto = require("crypto");

const categories = [
  {
    nameCate: "Shoes",
    imageUrl: {
      public_id: "samples/ecommerce/shoes",
      secure_url:
        "https://res.cloudinary.com/dsukseqnu/image/upload/v1706278076/samples/ecommerce/shoes.png",
    },
  },

  {
    nameCate: "Bags",
    imageUrl: {
      public_id: "samples/ecommerce/accessories-bag",
      secure_url:
        "https://res.cloudinary.com/dsukseqnu/image/upload/v1706278082/samples/ecommerce/accessories-bag.jpg",
    },
  },
];

const users = [
  {
    fullName: "Super Admin",
    email: "superadmin@gmail.com",
    password: "superadmin123",
    role: "superAdmin",
    avatarUrl: {
      public_id: "",
      secure_url: "",
    },
    address: {
      street: "Street",
      city: "City",
      state: "State",
      country: "Country",
    },
    phoneNumber: "1234567890",
  },
  {
    fullName: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
    avatarUrl: {
      public_id: "",
      secure_url: "",
    },

    address: {
      street: "Street",
      city: "City",
      state: "State",
      country: "Country",
    },
    phoneNumber: "1234567890",
  },
  {
    fullName: "Rider",
    email: "rider@gmail.com",
    password: "rider123",
    role: "rider",
    avatarUrl: {
      public_id: "",
      secure_url: "",
    },
    address: {
      street: "Street",
      city: "City",
      state: "State",
      country: "Country",
    },
    phoneNumber: "1234567890",
  },
  {
    fullName: "User",
    email: "user@gmail.com",
    password: "user123",
    role: "user",
    avatarUrl: {
      public_id: "",
      secure_url: "",
    },
    address: {
      street: "",
      city: "City",
      state: "State",
      country: "Country",
    },
    phoneNumber: "1234567890",
  },
];

const products = [
  {
    name_product: "Áo Thun Unisex Cotton Cơ Bản",
    description:
      "Chiếc áo thun unisex này được làm từ 100% cotton' cao cấp, mang đến cảm giác mềm mại và thoáng mát cho làn da. Thiết kế cổ tròn cổ điển kết hợp với đường may chắc chắn, tạo nên sự hoàn hảo cho mọi phong cách thời trang hàng ngày. Với chất liệu cotton dày dặn, áo không chỉ giữ dáng tốt mà còn đảm bảo độ bền sau nhiều lần giặt.",
    price: 199.5,
    imageUrls: [
      {
        public_id: "Ecommerce/Products/u66rpfd6niyffyadvldg",
        secure_url:
          "https://res.cloudinary.com/dsukseqnu/image/upload/v1721809151/Ecommerce/Products/u66rpfd6niyffyadvldg.png",
      },
      {
        public_id: "Ecommerce/Products/l9mk5nl5np3rmsi9p0ka",
        secure_url:
          "https://res.cloudinary.com/dsukseqnu/image/upload/v1721809151/Ecommerce/Products/l9mk5nl5np3rmsi9p0ka.jpg",
      },
      {
        public_id: "Ecommerce/Products/bzg7ozpzljtsahsq0tpt",
        secure_url:
          "https://res.cloudinary.com/dsukseqnu/image/upload/v1721809150/Ecommerce/Products/bzg7ozpzljtsahsq0tpt.jpg",
      },
    ],
    categoryId: "6657fc62e57d483ea8fa8597",
    countInStock: 1000,
    size: ["S", "M", "L", "XL"],
    colors: ["Đen trơn", "Trắng có hình", "Trắng trơn"],
  },
];

const reviews = [
  {
    userId: "66850f674bad17b7afdd65d2",
    productId: "66850f674bad17b7afdd65d2",
    rating: 4.5,
    comment:
      "Ao thật sự rất thoải mái và chất lượng. Mặc vào rất mát và dễ chịu. Mình đã mua 3 chiếc với màu khác nhau để thay đổi hàng ngày.",
  },
];

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

for (const user of users) {
  user.password = hashPassword(user.password);
}

module.exports = {
  categories,
  users,
  products,
};
