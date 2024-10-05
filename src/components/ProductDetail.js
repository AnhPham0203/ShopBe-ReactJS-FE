import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppProvider ";
import CommentSection from "./CommentBox";
import CommentBox from "./CommentBox";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);

  const { addToCart, showMessage, message, user } = useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();
  // console.log("LOcation====", location.pathname);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     if (!product || product.id !== id) {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8080/api/product/${id}`
  //         );
  //         setProduct(response.data); // Cập nhật danh sách sản phẩm
  //       } catch (error) {
  //         console.error("Error fetching products:", error);
  //         // setLoading(false); // Tắt trạng thái đang tải nếu có lỗi
  //       }
  //     }
  //   };
  //   fetchProducts(); // Gọi hàm lấy dữ liệu
  // }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi 2 API cùng lúc
        const [productResponse, commentsResponse] = await axios.all([
          axios.get(`http://localhost:8080/api/product/${id}`),
          axios.get(`http://localhost:8080/api/comment/getComment/${id}`),
        ]);
        console.log("ProductDetial==", commentsResponse.data);

        // Cập nhật state với dữ liệu từ cả hai API
        setProduct(productResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Chỉ chạy khi id thay đổi

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="container mx-auto px-8 py-8">
    //   {/* Hiển thị thông báo nếu có message */}
    //   {showMessage && (
    //     <div className="fixed top-13 right-5 bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition-transform transform-gpu animate-slide-in">
    //       {message}
    //     </div>
    //   )}
    //   <div className="flex space-x-3">
    //     <img
    //       src={product.image}
    //       alt={product.name}
    //       className="w-1/3 h-auto object-cover rounded-lg"
    //     />

    //     <div className="flex flex-col justify-between w-2/3">
    //       <div>
    //         <h1 className="text-xl font-bold mb-2">{product.title}</h1>

    //         <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
    //         <p className="text-xl font-bold">${product.price}</p>
    //       </div>
    //       <button
    //         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-1/2"
    //         onClick={() => addToCart(product)}
    //       >
    //         Add to Cart
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto px-8 py-8">
      {/* Hiển thị thông báo nếu có message */}
      {showMessage && (
        <div className="fixed top-16 right-5 bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition-transform transform-gpu animate-slide-in">
          {message}
        </div>
      )}

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        {/* Hình ảnh sản phẩm */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/6 h-auto object-cover rounded-lg shadow-md"
        />

        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
            <p className="text-xl font-bold text-orange-600">
              ${product.price}
            </p>
          </div>

          <button
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition duration-300 w-1/4"
            onClick={() => {
              if (user) {
                addToCart(product, user.email);
              } else {
                navigate("/login", { state: { from: location.pathname } });
              }
            }}
          >
            Thêm vào Giỏ Hàng
          </button>
        </div>
      </div>
      <div className="w-1/2">
        {" "}
        <CommentBox comments={comments} product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
