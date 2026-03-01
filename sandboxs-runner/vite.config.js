import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { globSync } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 自动扫描 sandboxs 目录下的所有文件夹，为每个文件夹生成一个入口
function getExampleEntries() {
  const sandboxsDir = path.resolve(__dirname, 'sandboxs');
  const folders = globSync('sandboxs/*/index.html');

  const entries = {
    main: path.resolve(__dirname, 'index.html'),
  };

  folders.forEach(file => {
    const folderName = path.basename(path.dirname(file));
    entries[folderName] = path.resolve(__dirname, file);
  });

  return entries;
}

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: getExampleEntries(),
    },
    outDir: 'dist',
  },
  server: {
    port: 8030,
    open: '/',
    middlewareMode: false,
    fs: {
      strict: false,
    },
  },
  appType: 'mpa',
  plugins: [
    react(),
    vue(),
    {
      name: 'sandboxs-auto-entry',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url, 'http://localhost');
          const pathname = url.pathname;

          // 支持两种 URL 风格：`/name/...` 和 `/sandboxs/name/...`
          const match = pathname.match(/^\/(?:sandboxs\/)?([^\/\?\.]+)(\/.*)?$/);
          if (match && match[1] !== '' && match[1] !== 'index' && !match[1].startsWith('@')) {
            const folderName = match[1];
            const restPath = match[2] || '';
            const hasSandboxPrefix = pathname.startsWith('/sandboxs/');
            const folderPath = path.join(__dirname, 'sandboxs', folderName);

            // 让 /<name> 以目录形式访问，保证相对资源路径（./index.js 等）正确解析
            if (restPath === '' && !pathname.endsWith('/')) {
              const prefix = hasSandboxPrefix ? '/sandboxs' : '';
              res.statusCode = 302;
              res.setHeader('Location', `${prefix}/${folderName}/${url.search}`);
              res.end();
              return;
            }

            // 让 /<name>/* 的资源请求也能命中 sandboxs/<name>/*
            if (restPath && restPath !== '/') {
              // 检查是否为入口文件或其他资源
              const fileName = path.basename(restPath);
              const localFilePath = path.join(folderPath, restPath.slice(1));

              // 如果是 __entry.* 文件（动态生成）或文件实际存在，都重写路径
              if (fileName.startsWith('__entry.') || fs.existsSync(localFilePath)) {
                // 将资源请求重写到 sandboxs 下的实际文件位置
                req.url = `/sandboxs/${folderName}${restPath}${url.search}`;
              }
              next();
              return;
            }

            // 处理 /<name>/ 主页请求：检查是否存在 index.tsx
            const tsxPath = path.join(folderPath, 'index.tsx');
            const jsxPath = path.join(folderPath, 'index.jsx');
            const vuePath = path.join(folderPath, 'index.vue');
            const htmlPath = path.join(folderPath, 'index.html');

            if (fs.existsSync(tsxPath)) {
              // 创建临时入口文件，使用 JSX 语法
              const entryContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './index.tsx';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`;

              const entryPath = path.join(folderPath, '__entry.tsx');
              fs.writeFileSync(entryPath, entryContent);

              // 动态生成 HTML - 使用相对路径，让浏览器基于当前 URL 解析
              const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${folderName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./__entry.tsx"></script>
  </body>
</html>`;
              try {
                const transformedHtml = await server.transformIndexHtml(`/sandboxs/${folderName}/index.html`, html);
                res.setHeader('Content-Type', 'text/html');
                res.end(transformedHtml);
              } catch (e) {
                return next(e);
              }
              return;
            } else if (fs.existsSync(jsxPath)) {
              // 创建临时入口文件，使用 JSX 语法
              const entryContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './index.jsx';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`;

              const entryPath = path.join(folderPath, '__entry.jsx');
              fs.writeFileSync(entryPath, entryContent);

              // 动态生成 HTML - 使用相对路径
              const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${folderName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./__entry.jsx"></script>
  </body>
</html>`;
              try {
                const transformedHtml = await server.transformIndexHtml(`/sandboxs/${folderName}/index.html`, html);
                res.setHeader('Content-Type', 'text/html');
                res.end(transformedHtml);
              } catch (e) {
                return next(e);
              }
              return;
            } else if (fs.existsSync(vuePath)) {
              // 创建临时入口文件，使用 Vue 语法
              const entryContent = `import { createApp } from 'vue';
import App from './index.vue';

createApp(App).mount('#root');`;

              const entryPath = path.join(folderPath, '__entry.ts');
              fs.writeFileSync(entryPath, entryContent);

              // 动态生成 HTML - 使用相对路径
              const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${folderName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./__entry.ts"></script>
  </body>
</html>`;
              try {
                const transformedHtml = await server.transformIndexHtml(`/sandboxs/${folderName}/index.html`, html);
                res.setHeader('Content-Type', 'text/html');
                res.end(transformedHtml);
              } catch (e) {
                return next(e);
              }
              return;
            } else if (fs.existsSync(htmlPath)) {
              // 如果有 index.html，使用它
              req.url = `/sandboxs/${folderName}/index.html${url.search}`;
            }
          }
          next();
        });
      },
    },
  ],
});
