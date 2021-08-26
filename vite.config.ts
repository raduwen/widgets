import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import mpa from 'vite-plugin-mpa';

var plugins = [tsconfigPaths()];

if (process.env.NODE_ENV !== "production") {
  plugins.push(reactRefresh());
  plugins.push(mpa({
      scanDir: '.'
    })
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        preview: 'preview/index.html',
        admin: 'admin/index.html'
      }
    }
  },
  plugins,
});
