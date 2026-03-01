import React, { useState, useCallback } from 'react';

// 定义用户类型
interface User {
  id: string;
  username: string;
  email: string;
}

// 定义令牌响应类型
interface TokenResponse {
  accessToken: string;
  expireIn: number;
}

// 定义登录凭证类型
interface LoginCredentials {
  username: string;
  password: string;
}

// 主应用组件
const App: React.FC = () => {
  // 状态管理
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. 登录功能
  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // 发送登录请求
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('登录失败');
      }

      // 从响应体获取 accessToken
      const data: TokenResponse & { user: User } = await response.json();
      
      // 保存 accessToken 到内存
      setAccessToken(data.accessToken);
      setUser(data.user);
      setIsAuthenticated(true);
      
      // refreshToken 会自动保存到 HttpOnly Cookie 中，无需手动处理
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. 刷新令牌功能
  const refreshToken = useCallback(async () => {
    try {
      // 发送刷新令牌请求，refreshToken 会自动从 Cookie 中携带
      const response = await fetch('/api/refresh_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 403) {
        // 长期令牌过期，需要重新登录
        throw new Error('长期令牌过期，请重新登录');
      }

      if (!response.ok) {
        throw new Error('刷新令牌失败');
      }

      // 获取新的 accessToken
      const data: TokenResponse = await response.json();
      setAccessToken(data.accessToken);
      
      return data.accessToken;
    } catch (err) {
      // 刷新失败，清除认证状态
      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  }, []);

  // 3. 封装 API 请求，自动处理令牌刷新
  const apiRequest = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    let currentAccessToken = accessToken;
    
    // 如果没有访问令牌，抛出错误
    if (!currentAccessToken) {
      throw new Error('未认证');
    }

    try {
      // 发送 API 请求，手动携带 accessToken
      const response = await fetch(endpoint, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentAccessToken}`,
          ...options.headers,
        },
      });

      // 处理 401 错误（短期令牌过期）
      if (response.status === 401) {
        // 尝试刷新令牌
        const newAccessToken = await refreshToken();
        // 使用新令牌重试请求
        return fetch(endpoint, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newAccessToken}`,
            ...options.headers,
          },
        });
      }

      // 处理 403 错误（长期令牌过期）
      if (response.status === 403) {
        // 清除认证状态，需要重新登录
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
        throw new Error('长期令牌过期，请重新登录');
      }

      return response;
    } catch (err) {
      throw err;
    }
  }, [accessToken, refreshToken]);

  // 4. 登出功能
  const logout = useCallback(() => {
    // 清除内存中的 accessToken
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // 调用登出 API，服务器会清除 Cookie 中的 refreshToken
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err => {
      console.error('登出失败:', err);
    });
  }, []);

  // 5. 测试 API 请求
  const testApiRequest = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest('/api/userinfo');
      if (!response.ok) {
        throw new Error('API 请求失败');
      }
      
      const data = await response.json();
      console.log('API 请求成功:', data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'API 请求失败');
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}>
      <h1>Token 登录管理</h1>
      
      {isAuthenticated ? (
        <div>
          <h2>欢迎, {user?.username}!</h2>
          <p>邮箱: {user?.email}</p>
          <p>用户ID: {user?.id}</p>
          
          <div style={{ margin: '1rem 0' }}>
            <button 
              onClick={testApiRequest} 
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                marginRight: '0.5rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {loading ? '请求中...' : '测试 API 请求'}
            </button>
            
            <button 
              onClick={logout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              登出
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>登录</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              login({
                username: (form.elements.namedItem('username') as HTMLInputElement).value,
                password: (form.elements.namedItem('password') as HTMLInputElement).value,
              });
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label htmlFor="username">用户名:</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.25rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
            
            <div>
              <label htmlFor="password">密码:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.25rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
