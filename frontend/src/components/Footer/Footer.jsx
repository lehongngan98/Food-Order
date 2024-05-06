import { Link } from "react-router-dom"
import {assets} from "../../assets/assets"
import "./Footer.css"
const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <Link to={"/"}><img src={assets.logo} alt="" /></Link>
                 {/* goi thieu ve web site */}
                <p>Website chuyên cung cấp các món ăn ngon nhất, giá rẻ nhất
                    và chất lượng nhất. Đến với chúng tôi, bạn sẽ được thưởng thức
                    những món ăn ngon nhất từ các đầu bếp hàng đầu thế giới.
                </p>    
                <div className="footer-social-icons">
                    <img src={assets.icon_facebook} alt="" />
                    <img src={assets.icon_gmail} alt="" />
                    <img src={assets.icon_zalo} alt="" />
                </div>        
            </div>
            <div className="footer-content-center">
                <h2>CÔNG TY</h2>
                <ul>
                    <li>Trang chủ</li>
                    <li>Thông tin</li>
                    <li>Vận chuyển</li>
                    <li>Chính sách bảo mật</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>THÔNG TIN LIÊN LẠC</h2>
                <ul>
                    <li>+84-332-791-850</li>
                    <li>lehongngan.998@gmail.com</li>                    
                </ul>
            </div>
        </div>  
        <hr />
        <p className="footer-copyright">Copyright 2024 ChefFood.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer