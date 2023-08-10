


exports.Product={
  category: (parent,args,context) => {
    const categories=context.categories
    return categories.find((category) => category.id === parent.categoryId);
  },
  reviews:({id},arg,{reviews})=>{
    return reviews.filter(review =>  review.productId ===  id);
  }
};