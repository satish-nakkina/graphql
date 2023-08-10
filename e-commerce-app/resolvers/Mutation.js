
const {v4: uuid}=require("uuid")

exports.Mutation={
  addCategory:(parent,{input},{categories})=>{
     const newCategory={
       id:uuid(),
       name:input.name
     }
     categories.push(newCategory)

     return newCategory
  },

  addProduct:(parent,{input},{products})=>{
    const{
      name,
      image,
      price,
      onSale,
      quantity,
      categoryId,
      description
    }=input

    const newProduct={
      id:uuid(),
      name,
      image,
      price,
      onSale,
      quantity,
      categoryId,
      description
    }
    products.push(newProduct);

    return newProduct;
  },
  deleteCategory:(parent,{id},{categories})=>{
    categories= categories.filter((category)=> category.id !==id);
    return true;
  },

  updateCategory:(parent,{id,input},{categories})=>{
    const index=categories.findIndex(category => category.id === id);

    categories[index]={
      ...categories[index],
      ...input
    }

    return categories[index];
  }
}