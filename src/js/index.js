import react from "react";
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElem = document.querySelector('#root');

if (rootElem) {
    const root = createRoot(rootElem);
    root.render(<App/>);
}