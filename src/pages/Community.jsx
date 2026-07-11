import { useState } from 'react'
import { articles, articleCategories } from '../data/community'
import './Community.css'

export default function Community() {
  const [activeCategory, setActiveCategory] = useState('全部')

  const filteredArticles = activeCategory === '全部'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>生命社区</h1>
        <p>探讨生死话题，分享感悟与故事，在温情中找到共鸣与力量</p>
      </div>

      <div className="container">
        <div className="community-intro card">
          <div className="intro-content">
            <span className="intro-icon">🕊️</span>
            <div className="intro-text">
              <h3>尊重 · 温情 · 理性</h3>
              <p>
                这里是一个关于生命与告别的交流空间。我们讨论殡葬文化、生前规划、宠物善后、
                法律知识等话题。请保持尊重与善意，严禁恶搞、猎奇和封建迷信内容。
              </p>
            </div>
          </div>
        </div>

        <div className="category-filter">
          {articleCategories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="articles-grid">
          {filteredArticles.map(article => (
            <div key={article.id} className="article-card card">
              <div className="article-image">
                <span className="article-emoji">{article.image}</span>
                <span className="article-category-tag">{article.category}</span>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span className="article-author">{article.author}</span>
                  <span className="article-sep">·</span>
                  <span className="article-date">{article.date}</span>
                  <span className="article-sep">·</span>
                  <span className="article-readtime">{article.readTime}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <button className="article-read-btn">阅读全文 →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="community-notice card">
          <div className="notice-content">
            <span className="notice-icon">💡</span>
            <div className="notice-text">
              <h4>社区公约</h4>
              <ul>
                <li>尊重每一位用户的生命经历与情感表达</li>
                <li>禁止发布猎奇、恶搞或封建迷信相关内容</li>
                <li>鼓励理性探讨，拒绝情绪煽动</li>
                <li>如遇心理困扰，请及时寻求专业帮助</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}