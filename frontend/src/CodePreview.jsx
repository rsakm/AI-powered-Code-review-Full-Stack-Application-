import { useState } from 'react'
import { FileText, PanelLeft, PanelRight, Maximize2, Minimize2 } from 'lucide-react'

function CodePreview({ code, review, isLoading }) {
  const [expandedPanel, setExpandedPanel] = useState(null)

  const togglePanel = (panel) => {
    if (expandedPanel === panel) {
      setExpandedPanel(null)
    } else {
      setExpandedPanel(panel)
    }
  }

  return (
    <div className="preview-container">
      <div 
        className={`preview-panel ${expandedPanel === 'code' ? 'expanded' : expandedPanel === 'review' ? 'collapsed' : ''}`}
      >
        <div className="preview-header">
          <div className="preview-title">
            <FileText size={16} />
            <span>Code</span>
          </div>
          <button 
            className="preview-toggle"
            onClick={() => togglePanel('code')}
            aria-label={expandedPanel === 'code' ? 'Minimize code panel' : 'Maximize code panel'}
          >
            {expandedPanel === 'code' ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
        <div className="preview-content">
          <pre>
            <code className="language-javascript">{code}</code>
          </pre>
        </div>
      </div>
      
      <div 
        className={`preview-panel ${expandedPanel === 'review' ? 'expanded' : expandedPanel === 'code' ? 'collapsed' : ''}`}
      >
        <div className="preview-header">
          <div className="preview-title">
            <FileText size={16} />
            <span>Review</span>
          </div>
          <button 
            className="preview-toggle"
            onClick={() => togglePanel('review')}
            aria-label={expandedPanel === 'review' ? 'Minimize review panel' : 'Maximize review panel'}
          >
            {expandedPanel === 'review' ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
        <div className="preview-content">
          {isLoading ? (
            <div className="preview-loading">Loading review...</div>
          ) : (
            <div className="preview-review">{review}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodePreview