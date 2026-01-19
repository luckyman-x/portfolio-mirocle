import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'; // 👈 add this line

createRoot(document.getElementById("root")!).render(<App />);
