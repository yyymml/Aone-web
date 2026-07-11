import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>🕊️</span>
            <span className="footer-name">安往</span>
          </Link>
          <p className="footer-desc">生命终点的设计者</p>
          <p className="footer-tagline">用设计思维和数字化手段，让告别变得有温度、有尊严、有个人风格。</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>服务导航</h4>
            <Link to="/paper-craft">纸扎定制</Link>
            <Link to="/products">精选商品</Link>
            <Link to="/shroud">寿衣试穿</Link>
            <Link to="/pet-services">毛星驿站</Link>
            <Link to="/digital-life">毛孩子星球</Link>
            <Link to="/memorial">云祭扫</Link>
          </div>
          <div className="footer-col">
            <h4>关于我们</h4>
            <Link to="/community">生命社区</Link>
            <a href="#about">关于Aone</a>
            <a href="#contact">联系我们</a>
          </div>
          <div className="footer-col">
            <h4>法律信息</h4>
            <a href="#privacy">隐私政策</a>
            <a href="#terms">用户协议</a>
            <a href="#compliance">合规声明</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 安往 Aone. 保留所有权利。</p>
          <p className="footer-disclaimer">本平台严格遵守《殡葬管理条例》，倡导文明、环保、有温度的告别方式。</p>
        </div>
      </div>
    </footer>
  )
}