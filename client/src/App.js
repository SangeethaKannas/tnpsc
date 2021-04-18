import './App.css';

import fileName from './07_01_2021_G1P-GS.pdf';
import PdfViewer from './pdf-viewer/pdf-viewer';

function App() {
  return (
    <div className="App">
      <PdfViewer file={fileName} />
    </div>
  );
}

export default App;
