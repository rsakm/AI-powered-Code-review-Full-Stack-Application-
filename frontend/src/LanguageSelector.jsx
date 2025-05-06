import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function LanguageSelector({ onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  
  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'csharp', name: 'C#' },
    { id: 'php', name: 'PHP' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'go', name: 'Go' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'c', name: 'C' },
    { id: 'c++', name: 'C++' },
    {id:'other', name: 'Other'}
  ]
  
  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang.id)
    setIsOpen(false)
    if (onLanguageChange) {
      onLanguageChange(lang.id)
    }
  }
  
  return (
    <div className="language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {languages.find(lang => lang.id === selectedLanguage)?.name || 'Select Language'}
        <ChevronDown size={16} className={isOpen ? 'rotate' : ''} />
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map(lang => (
            <div 
              key={lang.id}
              className={`language-option ${lang.id === selectedLanguage ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect(lang)}
            >
              {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector