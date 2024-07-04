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
};
