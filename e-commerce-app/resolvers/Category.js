// const {products}=require("../db")

exports.Category={
  products: (parent, args, context) => {
    const products=context.products
    return products.filter((product) => product.categoryId === parent.id);
  },
};