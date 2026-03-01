import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// 创建主题切换组件
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'blue'>('light');

  const changeTheme = (newTheme: 'light' | 'dark' | 'blue') => {
    setTheme(newTheme);
    const root = document.documentElement;
    
    // 根据选择的主题更新 CSS 变量
    switch (newTheme) {
      case 'light':
        root.style.setProperty('--primary-color', '#3498db');
        root.style.setProperty('--secondary-color', '#2ecc71');
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--text-color', '#333333');
        root.style.setProperty('--border-color', '#e0e0e0');
        break;
      case 'dark':
        root.style.setProperty('--primary-color', '#9b59b6');
        root.style.setProperty('--secondary-color', '#e74c3c');
        root.style.setProperty('--background-color', '#1a1a1a');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--border-color', '#333333');
        break;
      case 'blue':
        root.style.setProperty('--primary-color', '#1e3a8a');
        root.style.setProperty('--secondary-color', '#3b82f6');
        root.style.setProperty('--background-color', '#eff6ff');
        root.style.setProperty('--text-color', '#1e293b');
        root.style.setProperty('--border-color', '#bfdbfe');
        break;
    }
  };

  return (
    <div className="theme-switcher">
      <h2>主题切换</h2>
      <div className="theme-buttons">
        <button 
          className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
          onClick={() => changeTheme('light')}
        >
          浅色主题
        </button>
        <button 
          className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => changeTheme('dark')}
        >
          深色主题
        </button>
        <button 
          className={`theme-btn ${theme === 'blue' ? 'active' : ''}`}
          onClick={() => changeTheme('blue')}
        >
          蓝色主题
        </button>
      </div>
    </div>
  );
};

// 创建一个使用主题变量的卡片组件
const Card = () => {
  return (
    <div className="card">
      <h3>主题卡片</h3>
      <p>这个卡片使用 CSS 变量来获取主题颜色。</p>
      <div className="card-actions">
        <button className="primary-btn">主要按钮</button>
        <button className="secondary-btn">次要按钮</button>
      </div>
    </div>
  );
};

// 创建一个使用主题变量的表单组件
const Form = () => {
  return (
    <div className="form-container">
      <h3>主题表单</h3>
      <form>
        <div className="form-group">
          <label htmlFor="name">姓名</label>
          <input type="text" id="name" placeholder="请输入姓名" />
        </div>
        <div className="form-group">
          <label htmlFor="email">邮箱</label>
          <input type="email" id="email" placeholder="请输入邮箱" />
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-btn">提交</button>
          <button type="reset" className="secondary-btn">重置</button>
        </div>
      </form>
    </div>
  );
};

// 主应用组件
export default function App() {
  return (
    <div className="app">
      <h1>CSS 变量主题切换示例</h1>
      <ThemeSwitcher />
      <div className="content">
        <Card />
        <Form />
      </div>
    </div>
  );
};

// 添加全局样式
const style = document.createElement('style');
style.textContent = `
  /* 定义默认 CSS 变量 */
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --background-color: #ffffff;
    --text-color: #333333;
    --border-color: #e0e0e0;
    --transition: all 0.3s ease;
  }

  /* 全局样式 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: var(--transition);
    padding: 20px;
  }

  /* 应用容器 */
  .app {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .app h1 {
    margin-bottom: 30px;
    color: var(--primary-color);
  }

  /* 主题切换器 */
  .theme-switcher {
    margin-bottom: 40px;
    padding: 20px;
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .theme-switcher h2 {
    margin-bottom: 20px;
  }

  .theme-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .theme-btn {
    padding: 10px 20px;
    border: 2px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    border-radius: 4px;
    cursor: pointer;
    transition: var(--transition);
    font-size: 14px;
  }

  .theme-btn:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }

  .theme-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  /* 内容区域 */
  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 30px;
  }

  /* 卡片样式 */
  .card {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: var(--transition);
  }

  .card h3 {
    margin-bottom: 15px;
    color: var(--primary-color);
  }

  .card p {
    margin-bottom: 20px;
    line-height: 1.6;
  }

  /* 按钮样式 */
  .primary-btn,
  .secondary-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: var(--transition);
    font-size: 14px;
    font-weight: 500;
  }

  .primary-btn {
    background-color: var(--primary-color);
    color: white;
    margin-right: 10px;
  }

  .primary-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .secondary-btn {
    background-color: var(--secondary-color);
    color: white;
  }

  .secondary-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  /* 卡片操作区 */
  .card-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  /* 表单样式 */
  .form-container {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: var(--transition);
  }

  .form-container h3 {
    margin-bottom: 20px;
    color: var(--primary-color);
  }

  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: var(--transition);
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  .form-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
  }
`;
document.head.appendChild(style);

