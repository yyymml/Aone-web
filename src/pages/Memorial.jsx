import { useState, useEffect } from 'react'
import './Memorial.css'

const candles = [
  { id: 1, x: 15, y: 55 },
  { id: 2, x: 28, y: 48 },
  { id: 3, x: 42, y: 52 },
  { id: 4, x: 58, y: 52 },
  { id: 5, x: 72, y: 48 },
  { id: 6, x: 85, y: 55 },
  { id: 7, x: 20, y: 68 },
  { id: 8, x: 35, y: 65 },
  { id: 9, x: 50, y: 60 },
  { id: 10, x: 65, y: 65 },
  { id: 11, x: 80, y: 68 },
]

const flowers = [
  { id: 'rose', icon: '🌹', label: '玫瑰', color: '#e74c3c' },
  { id: 'lily', icon: '🪷', label: '莲花', color: '#f5c6cb' },
  { id: 'daisy', icon: '🌼', label: '雏菊', color: '#f9e79f' },
  { id: 'tulip', icon: '🌷', label: '郁金香', color: '#fadbd8' },
  { id: 'chrysanthemum', icon: '🏵️', label: '菊花', color: '#f0b27a' },
  { id: 'sunflower', icon: '🌻', label: '向日葵', color: '#f4d03f' },
  { id: 'cherry', icon: '🌸', label: '樱花', color: '#f5b7b1' },
  { id: 'lavender', icon: '💐', label: '薰衣草', color: '#d7bde2' },
]

const initialMessages = [
  { id: 1, name: '小陈', content: '爷爷，愿您在那边一切安好。', time: '2小时前', flowers: ['🌹'] },
  { id: 2, name: '阿琳', content: '咪咪，妈妈想你。窗台上的阳光还和以前一样暖。', time: '5小时前', flowers: ['🌼', '🌸'] },
  { id: 3, name: '匿名', content: '给所有离开了的人，点一盏灯。', time: '1天前', flowers: ['🪷'] },
]

export default function Memorial() {
  const [litCandles, setLitCandles] = useState([1, 3, 5, 7, 9])
  const [placedFlowers, setPlacedFlowers] = useState([
    { id: 'f1', type: '🌹', x: 38, y: 72 },
    { id: 'f2', type: '🌼', x: 55, y: 74 },
    { id: 'f3', type: '🪷', x: 48, y: 68 },
  ])
  const [selectedFlower, setSelectedFlower] = useState(flowers[0])
  const [showFlowerPicker, setShowFlowerPicker] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [newName, setNewName] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const pts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 3,
    }))
    setParticles(pts)
  }, [])

  const toggleCandle = (id) => {
    setLitCandles(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const handleMemorialClick = (e) => {
    if (!showFlowerPicker) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    if (y > 90 || y < 10) return
    setPlacedFlowers(prev => [
      ...prev,
      { id: `f${Date.now()}`, type: selectedFlower.icon, x, y }
    ])
    setShowFlowerPicker(false)
  }

  const submitMessage = () => {
    if (!newMessage.trim()) return
    setMessages(prev => [{
      id: Date.now(),
      name: newName.trim() || '匿名',
      content: newMessage.trim(),
      time: '刚刚',
      flowers: [selectedFlower.icon],
    }, ...prev])
    setNewName('')
    setNewMessage('')
  }

  const clearAll = () => {
    setPlacedFlowers([])
    setLitCandles([])
  }

  return (
    <div className="page-container memorial-page">
      <div className="memorial-bg">
        {particles.map(p => (
          <div
            key={p.id}
            className="memorial-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="page-header memorial-header">
        <h1>🕯️ 云祭扫 · 线上追思</h1>
        <p>跨越时空的思念，在这里安放</p>
      </div>

      <div className="container memorial-layout">
        <div className="memorial-main">
          <div className="memorial-shrine">
            <div className="shrine-top">
              <span className="shrine-arch"></span>
              <h3 className="shrine-title">追思堂</h3>
            </div>
            <div
              className={`shrine-stage ${showFlowerPicker ? 'picking' : ''}`}
              onClick={handleMemorialClick}
            >
              {candles.map(c => {
                const lit = litCandles.includes(c.id)
                return (
                  <button
                    key={c.id}
                    className={`memorial-candle ${lit ? 'lit' : ''}`}
                    style={{ left: `${c.x}%`, bottom: `${c.y - 35}%` }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCandle(c.id)
                    }}
                    title={lit ? '熄灭蜡烛' : '点亮蜡烛'}
                  >
                    <span className="candle-body"></span>
                    <span className="candle-flame">
                      <span className="flame-inner"></span>
                      <span className="flame-outer"></span>
                    </span>
                    <span className="candle-glow"></span>
                  </button>
                )
              })}
              {placedFlowers.map(f => (
                <span
                  key={f.id}
                  className="placed-flower"
                  style={{ left: `${f.x}%`, bottom: `${100 - f.y}%` }}
                >
                  {f.type}
                </span>
              ))}
            </div>
            <div className="shrine-actions">
              <button
                className={`shrine-btn ${showFlowerPicker ? 'active' : ''}`}
                onClick={() => setShowFlowerPicker(!showFlowerPicker)}
              >
                🌸 {showFlowerPicker ? '取消献花' : '献一束花'}
              </button>
              <button className="shrine-btn" onClick={clearAll}>
                🧹 清理祭台
              </button>
            </div>
          </div>

          {showFlowerPicker && (
            <div className="flower-picker card">
              <h4>选择鲜花</h4>
              <div className="flower-options">
                {flowers.map(f => (
                  <button
                    key={f.id}
                    className={`flower-option ${selectedFlower.id === f.id ? 'active' : ''}`}
                    onClick={() => setSelectedFlower(f)}
                  >
                    <span className="flower-emoji">{f.icon}</span>
                    <span className="flower-label">{f.label}</span>
                  </button>
                ))}
              </div>
              <p className="flower-hint">选择花朵后，点击祭台上方区域即可放置</p>
            </div>
          )}
        </div>

        <div className="memorial-sidebar">
          <div className="message-wall card">
            <h3>💬 追思留言</h3>
            <div className="message-list">
              {messages.map(msg => (
                <div key={msg.id} className="message-item">
                  <div className="message-hd">
                    <span className="message-name">{msg.name}</span>
                    <span className="message-time">{msg.time}</span>
                  </div>
                  <p className="message-content">{msg.content}</p>
                  {msg.flowers.length > 0 && (
                    <span className="message-flowers">{msg.flowers.join(' ')}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="message-form">
              <input
                type="text"
                className="text-input"
                placeholder="你的名字（选填）"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                maxLength={12}
              />
              <textarea
                className="text-input message-textarea"
                placeholder="写下你想说的话..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                rows={2}
                maxLength={200}
              />
              <button className="btn-primary full-width" onClick={submitMessage}>
                留下思念
              </button>
            </div>
          </div>

          <div className="memorial-info card">
            <h4>📿 线上祭扫须知</h4>
            <ul>
              <li>尊重逝者，保持庄重与善意</li>
              <li>每次点亮的蜡烛代表一份思念</li>
              <li>献花位置将保留在祭台上</li>
              <li>留言内容请注意文明用语</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}