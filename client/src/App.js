import './App.css';

import fileName from './11_ethics.pdf';
import PdfViewer from './pdf-viewer/pdf-viewer';

function App() {
  return (
    <div className="App">
      <PdfViewer file={fileName} />
    </div>
  );
}

export default App;
