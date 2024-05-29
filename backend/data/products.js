
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
    fullName: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    isAdmin: true,
    avatarUrl: {
      public_id: "",
      secure_url:"",
    },

    address: {
      street: "",
      city: "City",
      state: "State",
      country: "Country",
    },
    phoneNumber: "1234567890",
  },
  {
    fullName: "user",
    email: "user@gmail.com",
    password: "user123",
    isAdmin: false,
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

module.exports = {
  categories,
  users,
};
