import { AimOutlined, FacebookOutlined, InstagramOutlined, PhoneOutlined, SendOutlined, TwitterOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './Footer.css';
import logo from '../../assets/images/HEALTH1.png';
import { useNavigate } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-top-content">
            <div className="footer-top-img">
<img 
    src={logo} 
    alt="Logo" 
  />            </div>
            <div className="footer-top-subbox">
              <div className="footer-top-subs">
                <h2 className="footer-top-subs-title">Về chúng tôi</h2>
                <p className="footer-top-subs-text">
                Hệ thống Nhà thuốc HEALTH IS GOLD là một trong những chuỗi bán lẻ dược phẩm uy tín tại Việt Nam. Chúng tôi chuyên cung cấp đa dạng các loại thuốc kê đơn, không kê đơn, các sản phẩm thực phẩm chức năng, trang thiết bị y tế, dược mỹ phẩm,...                </p>
              </div>
              <form className="form-ground">
                
              <button
  className="form-ground-btn"
  onClick={() => window.open('https://maps.app.goo.gl/7kSjJyGmz1snkZCK9', '_blank')}
>
  <span>ĐỊA CHỈ</span>
  <i className="fa-solid fa-arrow-right"></i>
</button>

              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="widget-area">
        <div className="container" id="footerpromax">
          <div className="widget-row">
            <div className="widget-row-col-1">
              <h3 className="widget-title">Liên hệ với chúng tôi qua mạng xã hội</h3>
              
              <div className="widget-social">
                <div className="widget-social-item" onClick={() => window.open('https://www.facebook.com/jack.phuongtuan1204', '_blank')}
                >
                    <FacebookOutlined style={{ fontSize: '24px'}} onClick={() => window.open('https://www.facebook.com/jack.phuongtuan1204', '_blank')}/>
                </div>
                <div className="widget-social-item"onClick={() => window.open('https://x.com/phuongtuan_j97', '_blank')}
                >
                    <TwitterOutlined style={{ fontSize: '24px'}}/>
                  
                </div>
                <div className="widget-social-item"onClick={() => window.open('https://www.instagram.com/iamjack1997/', '_blank')}
                >
<InstagramOutlined style={{ fontSize: '24px'}} />
                  
                </div>
              </div>
            </div>
            <div className="widget-row-col">
              <h3 className="widget-title">Liên kết</h3>
              <ul className="widget-contact">
                {/* THÊM LINK */}
                  <li className="widget-contact-item" id="tracuu"onClick={() => (window.location.href = 'http://localhost:3000/:type?page=1')} style={{ cursor: 'pointer' }} >
Tra cứu             </li>
              </ul>
            </div>
           
            <div className="widget-row-col-1">
              <h3 className="widget-title">Liên hệ</h3>
              <div className="contact">
                <div className="contact-item">
                  <div className="contact-item-icon">
                  <AimOutlined style={{ fontSize: '24px'}}/>
                  </div>
                  <div className="contact-content">
                    <span>227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh, Việt Nam</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                  <PhoneOutlined style={{ fontSize: '24px'}}/>
                  </div>
                  <div className="contact-content contact-item-phone">
                    <span>0123 456 789</span>
                    <br />
                    <span>082 717 1456</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                  <SendOutlined style={{ fontSize: '24px'}}/>
                  </div>
                  <div className="contact-content conatct-item-email">
                    <span>abc@domain.com</span>
                    <br />
                    <span>infoabc@domain.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </footer>
 );
};

export default FooterComponent;
