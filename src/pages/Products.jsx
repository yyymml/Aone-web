import { useState } from 'react'
import { products, categories } from '../data/products'
import './Products.css'

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('全部')

  const filteredProducts = activeCategory === '全部'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>精选商品</h1>
        <p>汇聚优质匠人作品，每一件都承载着匠心与温度</p>
      </div>

      <div className="container">
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card card">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
                {product.tags.includes('新品') && <span className="product-badge new">新品</span>}
                {product.tags.includes('热门') && <span className="product-badge hot">热门</span>}
              </div>
              <div className="product-info">
                <div className="product-tags">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="product-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-meta">
                  <span className="product-artisan">匠人：{product.artisan}</span>
                  <span className="product-rating">⭐ {product.rating}</span>
                </div>
                <div className="product-footer">
                  <span className="product-price">¥{product.price}</span>
                  <span className="product-sales">已售 {product.sales}</span>
                </div>
                <button className="btn-primary product-btn">查看详情</button>
              </div>
            </div>
          ))}
        </div>

        <div className="custom-banner card">
          <div className="custom-banner-content">
            <span className="custom-icon">✨</span>
            <div className="custom-text">
              <h3>想要独一无二的设计？</h3>
              <p>前往纸扎定制中心，在线设计你的专属作品，匹配匠人手工制作。</p>
            </div>
            <a href="/paper-craft" className="btn-primary">立即定制</a>
          </div>
        </div>
      </div>
    </div>
  )
}