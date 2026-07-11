import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const features = [
    {
      icon: '🏮',
      title: '纸扎定制',
      desc: '在线设计独一无二的纸扎作品，3D预览效果，匹配匠人手工制作。',
      link: '/paper-craft',
      color: '#c4a882'
    },
    {
      icon: '👘',
      title: '寿衣试穿',
      desc: '输入身型参数，生成虚拟人像，在线试穿各式寿衣，找到最合适的那件。',
      link: '/shroud',
      color: '#a89279'
    },
    {
      icon: '🕯️',
      title: '云祭扫',
      desc: '线上追思悼念，点一盏烛光、献一束鲜花，跨越时空寄托思念。',
      link: '/memorial',
      color: '#b8956e'
    },
    {
      icon: '🌟',
      title: '毛星驿站',
      desc: '宠物殡葬一站式服务，遗体接送、火化、纪念品，送毛孩子温柔回家。',
      link: '/pet-services',
      color: '#d4956a'
    },
    {
      icon: '🌍',
      title: '毛孩子星球',
      desc: '数字生命体概念，3D互动形象、智能对话、记忆档案，让爱永不消逝。',
      link: '/digital-life',
      color: '#9b7e62'
    },
    {
      icon: '🛍️',
      title: '精选商品',
      desc: '汇聚优质匠人作品，从传统到现代，每一件都承载着匠心与温度。',
      link: '/products',
      color: '#8b7355'
    },
    {
      icon: '💬',
      title: '生命社区',
      desc: '探讨生死话题，分享感悟与故事，在温情的社区中找到共鸣与力量。',
      link: '/community',
      color: '#7a9a7e'
    },
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">生命终点的设计者</span>
            <h1 className="hero-title">
              让每一场告别<br />都有温度与尊严
            </h1>
            <p className="hero-desc">
              安往用设计思维和数字化手段，为人们提供有温度、有尊严、有个人风格的
              身后事服务。从纸扎定制到生命纪念，我们陪伴每一个需要告别的时刻。
            </p>
            <div className="hero-actions">
              <Link to="/paper-craft" className="btn-primary">
                开始定制
              </Link>
              <Link to="/community" className="btn-outline">
                了解更多
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-float-card card-1">🕊️</div>
            <div className="hero-float-card card-2">🏮</div>
            <div className="hero-float-card card-3">🌸</div>
            <div className="hero-circle"></div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">我们的服务</h2>
            <p className="section-subtitle">从设计到纪念，全链路温暖陪伴</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="feature-card card">
                <div className="feature-icon" style={{ background: `${feature.color}15`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
                <span className="feature-link" style={{ color: feature.color }}>
                  探索更多 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="value-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">为什么选择安往</h2>
            <p className="section-subtitle">重新定义身后事服务体验</p>
          </div>
          <div className="value-grid">
            <div className="value-item">
              <span className="value-num">01</span>
              <h4>个性化定制</h4>
              <p>告别千篇一律，每一件作品都是对生命独特性的尊重与纪念。</p>
            </div>
            <div className="value-item">
              <span className="value-num">02</span>
              <h4>透明有保障</h4>
              <p>打破行业信息壁垒，价格透明，匠人资质审核，品质可追溯。</p>
            </div>
            <div className="value-item">
              <span className="value-num">03</span>
              <h4>温情不煽情</h4>
              <p>克制而真诚的设计语言，尊重每一种情感表达，不消费悲伤。</p>
            </div>
            <div className="value-item">
              <span className="value-num">04</span>
              <h4>文明与环保</h4>
              <p>倡导文明祭祀，推广环保材料与绿色殡葬理念，守护绿水青山。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>趁活着，设计一场体面的告别</h2>
            <p>生前规划不是晦气，而是对生命的负责与热爱。</p>
            <Link to="/paper-craft" className="btn-primary">开始第一次设计</Link>
          </div>
        </div>
      </section>
    </div>
  )
}