const {products}=require("../db")
const {categories}=require("../db")

exports.Query= {
  hello: () => {
    return "world!";
  },
  products: (parent,{filter},{products}) => {
    let filterProducts=products;
    if(filter){
      if(filter.onSale === true){
        filterProducts=filterProducts.filter(product =>{
          return product.onSale
        })
      }
    }
    return filterProducts
  },
  product: (parent, args, {products}) => {
    return products.find((product) => product.id === args.id);
  },
  categories: (parent) => {
    return categories;
  },
  category: (parent, args, {categories}) => {

    return categories.find((category) => category.id === args.id);
  },
};