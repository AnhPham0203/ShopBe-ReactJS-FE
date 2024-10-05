import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppProvider ";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CommentBox = ({ comments, product }) => {
  const { user } = useContext(AppContext);

  const [comment, setComments] = useState(comments); // Lưu trữ bình luận
  const [newComment, setNewComment] = useState(""); // Nội dung bình luận mới

  const navigate = useNavigate();

  // Hàm thêm bình luận mới
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      const newEntry = {
        comment: newComment,
        timestamp: new Date().toLocaleString(),
        pid: product.id,
        userEmail: user.email,
      };

      try {
        await axios.post("http://localhost:8080/api/comment/save", newEntry);

        // setComments([...comment, newEntry]);
        setComments((prevComments) => [...prevComments, newEntry]);

        setNewComment(""); // Reset nội dung sau khi gửi
      } catch (error) {
        console.error("Lỗi khi gửi bình luận:", error);
        alert("Có lỗi xảy ra khi gửi bình luận. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-gray-800">Hệ thống bình luận</h3>
      <div className="mt-6">
        {user !== null ? (
          <p className="text-gray-500 mb-2">
            Bình luận dưới tên của bạn <strong>({user.name})</strong>
          </p>
        ) : (
          <p className="text-orange-500 mb-2 ">
            Vui lòng đăng nhập để bình luận về sản phẩm!
          </p>
        )}
        <textarea
          placeholder="Viết bình luận của bạn"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md text-lg mb-4"
        />
        <button
          onClick={() => {
            if (user) {
              handleAddComment();
            } else {
              navigate("/login");
            }
          }}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300 text-lg"
        >
          Gửi bình luận
        </button>
      </div>

      {/* Hiển thị bình luận */}
      {comment.length > 0 ? (
        <div className="mt-5">
          {comment.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-300 mb-4 pb-4"
            >
              <p>
                <strong className="text-gray-800">
                  {comment.user?.name || "Unknown User"}
                </strong>{" "}
                <em className="text-gray-500">{comment.timestamp}</em>
              </p>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 ">
          Chưa có bình luận nào, hãy là người đầu tiên bình luận về sản phẩm
          này.
        </p>
      )}
    </div>
  );
};

export default CommentBox;
