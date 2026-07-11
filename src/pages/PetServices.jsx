import { useState } from 'react'
import './PetServices.css'

const services = [
  {
    id: 1,
    icon: '🚑',
    title: '遗体接送',
    desc: '24小时专业宠物遗体接送服务，覆盖全国主要城市，全程冷链运输，确保尊严与卫生。',
    features: ['24小时响应', '全程冷链', '上门接收', '专业防护'],
    price: '¥300起',
  },
  {
    id: 2,
    icon: '🔥',
    title: '单独火化',
    desc: '为爱宠提供单独火化服务，确保骨灰纯净完整，告别集体处理的方式，给毛孩子最后的尊重。',
    features: ['单独火化', '骨灰完整归还', '可旁观告别', '专业火化炉'],
    price: '¥800起',
  },
  {
    id: 3,
    icon: '💎',
    title: '骨灰纪念品',
    desc: '将爱宠骨灰制成晶石、纪念摆件或饰品，让思念化为永恒的陪伴，时刻在身边。',
    features: ['骨灰晶石', '纪念摆件', '定制饰品', '多种颜色可选'],
    price: '¥500起',
  },
  {
    id: 4,
    icon: '🌳',
    title: '宠物树葬',
    desc: '在专属宠物陵园种下一棵树，让爱宠回归自然。每棵树都是对生命的致敬与延续。',
    features: ['生态环保', '专属树木', '铭牌纪念', '定期维护'],
    price: '¥1200起',
  },
  {
    id: 5,
    icon: '🏠',
    title: '纸扎宠物用品',
    desc: '为爱宠定制纸扎玩具、小屋、零食等，让它们在另一个世界也能快乐生活。',
    features: ['3D在线定制', '匠人手作', '宠物专属', '个性化设计'],
    price: '¥180起',
    link: '/paper-craft',
  },
  {
    id: 6,
    icon: '📿',
    title: '纪念页面',
    desc: '上传爱宠照片，AI自动生成专属纪念页面，可分享至朋友圈，让更多人为它送上祝福。',
    features: ['AI生成影集', '云端永久保存', '留言追思', '一键分享'],
    price: '免费体验',
  },
]

const stories = [
  {
    name: '球球',
    type: '🐕 金毛',
    years: '2012 - 2026',
    quote: '谢谢你陪我走过14年，你是我最好的朋友。',
    owner: '小陈',
  },
  {
    name: '咪咪',
    type: '🐈 橘猫',
    years: '2015 - 2025',
    quote: '你走的那天，窗台还留着你的小脚印。',
    owner: '阿琳',
  },
  {
    name: '豆豆',
    type: '🐰 垂耳兔',
    years: '2021 - 2026',
    quote: '虽然只有短短5年，但你教会了我什么是无条件的爱。',
    owner: '木子',
  },
]

export default function PetServices() {
  const [selectedStory, setSelectedStory] = useState(null)
  const [memorialName, setMemorialName] = useState('')
  const [memorialMessage, setMemorialMessage] = useState('')

  const handleMemorialSubmit = () => {
    const name = memorialName || '我的毛孩子'
    alert(`「${name}」的纪念页面已生成！\n\n你的留言：${memorialMessage || '感谢你来到我的生命中'}\n\n（此为Demo演示，完整版支持上传照片生成AI纪念影集）`)
  }

  return (
    <div className="page-container">
      <div className="page-header pet-header">
        <span className="pet-header-icon">🌟</span>
        <h1>毛星驿站</h1>
        <p className="pet-subtitle">MaoStar Station</p>
        <p className="pet-desc">
          每一个毛孩子都是独一无二的生命。当离别来临，让我们用最温柔的方式，<br />
          送它们回到属于它们的星球。
        </p>
      </div>

      <div className="container">
        <div className="services-grid">
          {services.map(svc => (
            <div key={svc.id} className="service-card card">
              <div className="service-header">
                <span className="service-icon">{svc.icon}</span>
                <div className="service-title-group">
                  <h3>{svc.title}</h3>
                  <span className="service-price">{svc.price}</span>
                </div>
              </div>
              <p className="service-desc">{svc.desc}</p>
              <ul className="service-features">
                {svc.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              {svc.link ? (
                <a href={svc.link} className="btn-primary service-btn">前往定制 →</a>
              ) : (
                <button className="btn-primary service-btn">预约服务</button>
              )}
            </div>
          ))}
        </div>

        <section className="memorial-section">
          <div className="section-header">
            <h2 className="section-title">创建纪念页面</h2>
            <p className="section-subtitle">上传照片，为爱宠生成专属纪念空间</p>
          </div>
          <div className="memorial-card card">
            <div className="memorial-form">
              <div className="memorial-preview">
                <div className="memorial-frame">
                  <span className="memorial-paw">🐾</span>
                  <span className="memorial-star">⭐</span>
                  <span className="memorial-heart">💫</span>
                  <div className="memorial-placeholder">
                    <span>🌈</span>
                    <p>{memorialName || '毛孩子的名字'}</p>
                  </div>
                </div>
              </div>
              <div className="memorial-inputs">
                <div className="input-group">
                  <label>爱宠名字</label>
                  <input
                    type="text"
                    className="text-input"
                    placeholder="输入毛孩子的名字..."
                    value={memorialName}
                    onChange={e => setMemorialName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>想对TA说的话</label>
                  <textarea
                    className="text-input memorial-textarea"
                    placeholder="写下你想说的话..."
                    value={memorialMessage}
                    onChange={e => setMemorialMessage(e.target.value)}
                    rows={3}
                  />
                </div>
                <button className="btn-primary full-width" onClick={handleMemorialSubmit}>
                  生成纪念页面
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="stories-section">
          <div className="section-header">
            <h2 className="section-title">TA们的故事</h2>
            <p className="section-subtitle">每一段相遇，都值得被记住</p>
          </div>
          <div className="stories-grid">
            {stories.map((story, i) => (
              <div
                key={i}
                className={`story-card card ${selectedStory === i ? 'expanded' : ''}`}
                onClick={() => setSelectedStory(selectedStory === i ? null : i)}
              >
                <div className="story-top">
                  <span className="story-type">{story.type}</span>
                  <span className="story-years">{story.years}</span>
                </div>
                <h3 className="story-name">{story.name}</h3>
                {selectedStory === i && (
                  <div className="story-detail">
                    <p className="story-quote">"{story.quote}"</p>
                    <p className="story-owner">—— {story.owner}</p>
                  </div>
                )}
                <span className="story-hint">
                  {selectedStory === i ? '收起' : '点击查看'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="pet-guidance card">
          <div className="guidance-content">
            <span className="guidance-icon">📋</span>
            <div className="guidance-text">
              <h3>宠物善后流程指南</h3>
              <div className="guidance-steps">
                <div className="step">
                  <span className="step-num">01</span>
                  <div>
                    <h4>初步处理</h4>
                    <p>保持遗体清洁，用干净的布包裹，放置于阴凉处。联系专业服务机构。</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">02</span>
                  <div>
                    <h4>选择方式</h4>
                    <p>根据个人意愿和预算，选择火化、树葬或纪念品制作等方式。</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">03</span>
                  <div>
                    <h4>告别仪式</h4>
                    <p>可以和家人一起为爱宠举行小型告别仪式，表达思念与感谢。</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">04</span>
                  <div>
                    <h4>纪念留存</h4>
                    <p>通过纪念品、纪念页面等方式，让爱以另一种形式继续陪伴。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}