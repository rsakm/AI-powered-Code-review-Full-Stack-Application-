import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import { Moon, Sun, Code, FileText, AlertCircle, Check, Loader2, Zap, Settings } from "lucide-react"
import LanguageSelector from './LanguageSelector'

function App() {
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState('')
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    prism.highlightAll()
    
    // Apply theme to document body
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme'
  }, [isDarkTheme])

  async function reviewCode() {
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')
    setReview('')
    
    try {
      const response = await fetch('https://code-review-backend-ir8t.onrender.com/ai/get-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })
      
      if (!response.ok) {
        throw new Error('Failed to get review')
      }
      
      const data = await response.text()
      setReview(data)
      setSuccessMessage('Code review completed successfully!')
    } catch (error) {
      console.error('Error reviewing code:', error)
      setErrorMessage('Failed to get code review. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }
  
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
  }
  
  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  return (
    <div className={`app-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <header className="app-header">
        <div className="logo">
          <Code size={28} />
          <h1>CodeReviewPro</h1>
          <div className="badge">
            <Zap size={12} />
            <span>Pro</span>
          </div>
        </div>
        <div className="actions">
          <LanguageSelector onLanguageChange={handleLanguageChange} />
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="settings-toggle"
            onClick={toggleSettings}
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>
      
      {showSettings && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Settings</h3>
            <button className="close-button" onClick={toggleSettings}>×</button>
          </div>
          <div className="settings-content">
            <div className="settings-group">
              <label>Theme</label>
              <div className="theme-options">
                <button 
                  className={`theme-option ${!isDarkTheme ? 'active' : ''}`}
                  onClick={() => setIsDarkTheme(false)}
                >
                  <Sun size={16} /> Light
                </button>
                <button 
                  className={`theme-option ${isDarkTheme ? 'active' : ''}`}
                  onClick={() => setIsDarkTheme(true)}
                >
                  <Moon size={16} /> Dark
                </button>
              </div>
            </div>
            <div className="settings-group">
              <label>Language</label>
              <select 
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="language-select"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="typescript">TypeScript</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
              </select>
            </div>
          </div>
        </div>
      )}

      
      <main>
        <div className="left panel">
          <div className="panel-header">
            <h2><FileText size={18} /> Code Editor</h2>
            <div className="panel-actions">
              <span className="language-indicator">{selectedLanguage}</span>
            </div>
          </div>
          <div className="code-container">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages[selectedLanguage] || prism.languages.javascript, selectedLanguage || "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div className="panel-footer">
            <button
              onClick={reviewCode}
              className="review-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="spin" size={16} /> Analyzing...
                </>
              ) : (
                "Review Code"
              )}
            </button>
          </div>
        </div>
        
        <div className="right panel">
          <div className="panel-header">
            <h2><FileText size={18} /> Review Results</h2>
            {isLoading && <span className="status-badge loading">Analyzing</span>}
            {!isLoading && review && <span className="status-badge complete">Completed</span>}
          </div>
          <div className="review-container">
            {errorMessage && (
              <div className="message error">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}
            {successMessage && !isLoading && (
              <div className="message success">
                <Check size={16} />
                {successMessage}
              </div>
            )}
            {isLoading ? (
              <div className="loading-container">
                <Loader2 className="spin" size={48} />
                <p>Analyzing your code...</p>
                <span className="loading-subtitle">Powered by Gemini AI</span>
              </div>
            ) : review ? (
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {review}
              </Markdown>
            ) : (
              <div className="empty-state">
                <FileText size={48} />
                <h3>No review yet</h3>
                <p>Submit your code to receive a detailed professional review</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <p>© {new Date().getFullYear()} CodeReviewPro • Powered by Gemini AI</p>
          </div>
          <div className="footer-right">
            <a href="https://rajshree.online" target='_blank' className="footer-link">About</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Help</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App