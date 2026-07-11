import { useState } from 'react'
import './PaperCraft.css'

const templates = [
  { id: 'house', name: '传统宅院', icon: '🏠', baseColor: '#c4956a', shape: 'house' },
  { id: 'car', name: '豪华轿车', icon: '🚗', baseColor: '#4a4a4a', shape: 'car' },
  { id: 'phone', name: '智能手机', icon: '📱', baseColor: '#2c2c2c', shape: 'phone' },
  { id: 'pet_house', name: '宠物小屋', icon: '🐾', baseColor: '#d4956a', shape: 'pet_house' },
  { id: 'teaset', name: '茶具套装', icon: '🍵', baseColor: '#8b6f5a', shape: 'teaset' },
  { id: 'clothes', name: '服饰套装', icon: '👘', baseColor: '#4a6fa5', shape: 'clothes' },
]

const colors = [
  '#c4956a', '#d4a574', '#e8c9a0', '#8b7355', '#6b5a45',
  '#4a6fa5', '#5a8a7a', '#7a9a7e', '#4a4a4a', '#2c2c2c',
  '#c44a4a', '#a55a5a', '#8b5a8b', '#5a5a8b',
]

const decorations = [
  { id: 'flower', label: '花卉纹', icon: '🌸' },
  { id: 'cloud', label: '祥云纹', icon: '☁️' },
  { id: 'wave', label: '水波纹', icon: '〰️' },
  { id: 'geom', label: '几何纹', icon: '🔷' },
  { id: 'plain', label: '素面无纹', icon: '◻️' },
]

export default function PaperCraft() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [color, setColor] = useState(templates[0].baseColor)
  const [decoration, setDecoration] = useState('plain')
  const [text, setText] = useState('')
  const [size, setSize] = useState(50)
  const [rotation, setRotation] = useState(0)

  const rotateLeft = () => setRotation(r => r - 30)
  const rotateRight = () => setRotation(r => r + 30)

  const handleOrder = () => {
    alert('感谢您的设计！\n\n您的定制纸扎「' + (text || selectedTemplate.name) + '」已提交，匠人将在3个工作日内与您确认细节。\n\n（此为Demo演示）')
  }

  const renderShape = () => {
    switch(selectedTemplate.shape) {
      case 'car':
        return (
          <div className="shape-car">
            <div className="car-body" style={{ background: color }}>
              <div className="car-roof" style={{ background: color, filter: 'brightness(0.85)' }}></div>
              <div className="car-window" style={{ background: 'rgba(255,255,255,0.3)' }}></div>
              <div className="car-wheel front"></div>
              <div className="car-wheel rear"></div>
            </div>
            {decoration === 'flower' && <span className="deco deco-car">🌸</span>}
            {decoration === 'cloud' && <span className="deco deco-car">☁️</span>}
            {decoration === 'geom' && <span className="deco deco-car">🔷</span>}
          </div>
        )
      case 'phone':
        return (
          <div className="shape-phone" style={{ background: color }}>
            <div className="phone-screen" style={{ background: 'rgba(255,255,255,0.15)' }}></div>
            <div className="phone-btn"></div>
            {decoration === 'wave' && <span className="deco deco-phone">〰️</span>}
            {decoration === 'geom' && <span className="deco deco-phone">🔷</span>}
          </div>
        )
      case 'pet_house':
        return (
          <div className="shape-pet-house">
            <div className="pet-roof" style={{ borderBottomColor: color }}></div>
            <div className="pet-body" style={{ background: color }}>
              <div className="pet-door" style={{ background: 'rgba(0,0,0,0.2)' }}></div>
            </div>
            {decoration === 'flower' && <span className="deco deco-pet">🌸</span>}
          </div>
        )
      case 'teaset':
        return (
          <div className="shape-teaset">
            <div className="teapot" style={{ background: color }}></div>
            <div className="teacup cup1" style={{ background: color }}></div>
            <div className="teacup cup2" style={{ background: color }}></div>
            {decoration === 'cloud' && <span className="deco deco-tea">☁️</span>}
          </div>
        )
      case 'clothes':
        return (
          <div className="shape-clothes">
            <div className="cloth-top" style={{ background: color }}></div>
            <div className="cloth-bottom" style={{ background: color, filter: 'brightness(0.9)' }}></div>
            {decoration === 'flower' && <span className="deco deco-cloth">🌸</span>}
            {decoration === 'geom' && <span className="deco deco-cloth">🔷</span>}
          </div>
        )
      case 'house':
      default:
        return (
          <div className="shape-house">
            <div className="house-roof" style={{ borderBottomColor: color, filter: 'brightness(0.8)' }}></div>
            <div className="house-body" style={{ background: color }}>
              <div className="house-door" style={{ background: 'rgba(0,0,0,0.2)' }}></div>
              <div className="house-window" style={{ background: 'rgba(255,255,255,0.3)' }}></div>
            </div>
            {decoration === 'flower' && <span className="deco deco-house">🌸</span>}
            {decoration === 'cloud' && <span className="deco deco-house">☁️</span>}
            {decoration === 'wave' && <span className="deco deco-house">〰️</span>}
          </div>
        )
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>纸扎定制中心</h1>
        <p>选择模板，调整颜色与装饰，设计独一无二的纸扎作品</p>
      </div>

      <div className="container craft-layout">
        <div className="craft-preview-panel">
          <div className="preview-stage">
            <div
              className="preview-model"
              style={{
                transform: `rotateY(${rotation}deg) scale(${size / 50})`,
              }}
            >
              {renderShape()}
              {text && <div className="preview-text">{text}</div>}
            </div>
          </div>
          <div className="preview-controls">
            <button onClick={rotateLeft} className="rotate-btn" title="左转">↺</button>
            <span className="preview-label">3D预览</span>
            <button onClick={rotateRight} className="rotate-btn" title="右转">↻</button>
          </div>
        </div>

        <div className="craft-panel">
          <div className="panel-section">
            <h3>选择模板</h3>
            <div className="template-grid">
              {templates.map(t => (
                <button
                  key={t.id}
                  className={`template-btn ${selectedTemplate.id === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTemplate(t)
                    setColor(t.baseColor)
                  }}
                >
                  <span className="template-icon">{t.icon}</span>
                  <span className="template-name">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-section">
            <h3>颜色选择</h3>
            <div className="color-grid">
              {colors.map(c => (
                <button
                  key={c}
                  className={`color-btn ${color === c ? 'active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div className="panel-section">
            <h3>装饰纹样</h3>
            <div className="deco-grid">
              {decorations.map(d => (
                <button
                  key={d.id}
                  className={`deco-btn ${decoration === d.id ? 'active' : ''}`}
                  onClick={() => setDecoration(d.id)}
                >
                  <span>{d.icon}</span>
                  <span>{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-section">
            <h3>尺寸调节</h3>
            <div className="size-control">
              <span className="size-label">小</span>
              <input
                type="range"
                min="30"
                max="80"
                value={size}
                onChange={e => setSize(Number(e.target.value))}
                className="size-slider"
              />
              <span className="size-label">大</span>
            </div>
          </div>

          <div className="panel-section">
            <h3>添加文字</h3>
            <input
              type="text"
              className="text-input"
              placeholder="输入祝福语或名字..."
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={20}
            />
          </div>

          <button className="btn-primary order-btn" onClick={handleOrder}>
            提交定制订单
          </button>
        </div>
      </div>
    </div>
  )
}