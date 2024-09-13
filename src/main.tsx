
import React, { Suspense, lazy } from 'react';
import './css/nice.css';
import "./less/app.less"
import 'antd/dist/reset.css';
import "./css/css3-ink-button/css/style.css"
import "./css/css3-3d-svg-button/css/style.less"
const App = lazy(() => import('./views/App').then(module => ({ default: module.App })));
export const Main = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </div>
  );
};