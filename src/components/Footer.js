import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-bold text-orange-500 mb-4">
            Về chúng tôi
          </h3>
          <p className="text-gray-300">
            ShopBee là nền tảng mua sắm trực tuyến hàng đầu, cung cấp đa dạng
            sản phẩm với giá cả hợp lý và dịch vụ chăm sóc khách hàng tận tâm.
          </p>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-bold text-orange-500 mb-4">
            Hỗ trợ khách hàng
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to={"#"} className="text-gray-300 hover:text-white">
                Trung tâm trợ giúp
              </Link>
            </li>
            <li>
              <Link to={"#"} className="text-gray-300 hover:text-white">
                Vận chuyển và giao hàng
              </Link>
            </li>
            <li>
              <Link to={"#"} className="text-gray-300 hover:text-white">
                Chính sách đổi trả
              </Link>
            </li>
            <li>
              <Link to={"#"} className="text-gray-300 hover:text-white">
                Phương thức thanh toán
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-orange-500 mb-4">
            Liên hệ với chúng tôi
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>Email: support@ecommerce.com</li>
            <li>Hotline: (714) 894-5811</li>
            <li>Địa chỉ: 14882 Moran Street - Westminster, CA 92683</li>
          </ul>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold text-orange-500 mb-4">
            Đăng ký nhận tin
          </h3>
          <p className="text-gray-300 mb-4">
            Nhận thông tin mới nhất về sản phẩm và ưu đãi từ ShopBee.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-2 rounded-l-full text-black focus:outline-none"
            />
            <button className="bg-orange-500 px-4 py-2 rounded-r-full hover:bg-orange-600">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        <p>&copy; 2024 ShopBee. Tất cả các quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;
