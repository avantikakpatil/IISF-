import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const Report = () => {
  const [reportData, setReportData] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  // Fetch or generate report data on component mount
  useEffect(() => {
    const fetchReportData = async () => {
      // Replace with your actual data fetching logic (e.g., API call)
      const sampleReportData = {
        title: 'Sample Report',
        content: 'This is a sample report content.',
      };
      setReportData(sampleReportData);
    };

    fetchReportData();
  }, []);

  const handleGenerateReport = () => {
    if (!reportData) {
      console.warn('Report data is not yet available. Please wait for data to be fetched.');
      return;
    }

    const doc = new jsPDF();
    doc.text(reportData.title, 10, 10);
    doc.text(reportData.content, 10, 20);
    setPdfDoc(doc);
  };

  const handleDownloadReport = () => {
    if (pdfDoc) {
      pdfDoc.save('report.pdf');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {pdfDoc && (
        <div style={{ position: 'relative', width: '800px', height: '600px' }}>
          <h2>Generated Report</h2>
          <iframe
            src={pdfDoc.output('datauristring')}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: reportData ? '#4CAF50' : '#ddd',
            color: 'white',
            marginRight: '10px',
            marginTop: '10px',
          }}
          disabled={!reportData}
          onClick={handleGenerateReport}
        >
          View Report
        </button>
        <button
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#2196F3',
            color: 'white',
            marginTop: '10px',
          }}
          onClick={handleDownloadReport}
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Report;