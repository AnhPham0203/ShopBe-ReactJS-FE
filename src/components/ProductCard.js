import React, { useContext } from "react";
import { AppContext, AppProvider } from "../Context/AppProvider ";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(AppContext);

  // const addToCart = (product) => {
  //   setProduct(product);
  // };

  return (
    // <div className="border rounded-lg p-4 flex flex-col justify-between h-full">
    //   <Link to={`/product/${product.id}`}>
    //     <div className="flex-grow">
    //       <img
    //         src={product.image}
    //         alt={product.name}
    //         className="w-full h-62 object-cover mb-4"
    //       />
    //       <h2 className="text-lg font-bold">{product.name}</h2>
    //       <p className="text-gray-600">{product.title}</p>
    //       <p className="font-bold mt-2">${product.price}</p>
    //     </div>

    //     <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
    //       View Detail
    //     </button>
    //   </Link>
    // </div>
    <div className="border rounded-lg p-4 flex flex-col justify-between h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ">
      <Link to={`/product/${product.id}`}>
        <div className="flex-grow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-62 object-cover mb-4 rounded-md"
          />
          <h2 className="text-xl font-bold text-gray-800 hover:text-orange-500 transition-colors duration-300 ">
            {product.name}
          </h2>
          <p className="text-gray-600">{product.title}</p>
          <p className="font-bold text-orange-600 mt-2">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
