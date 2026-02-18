import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import StyleguideLayout from './pages/styleguide/Layout'
import Styleguide from './pages/styleguide/Styleguide'
import ComponentsPreview from './pages/styleguide/ComponentsPreview'
import Updates from './pages/Updates'

// Docs Imports
import DocsLayout from './pages/docs/DocsLayout'
import Introduction from './pages/docs/Introduction'
import Persona from './pages/docs/Persona'
import Marketing from './pages/docs/Marketing'
import Style from './pages/docs/Style'
import Security from './pages/docs/Security'
import Status from './pages/Status'

import Skills from './pages/Skills'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import { CookieConsent } from './components/layout/CookieConsent'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/status" element={<Status />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Documentation Routes */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<Introduction />} />
          <Route path="persona" element={<Persona />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="style" element={<Style />} />
          <Route path="security" element={<Security />} />
        </Route>

        <Route path="/styleguide" element={<StyleguideLayout />}>
          <Route index element={<Styleguide />} />
          <Route path="components/:name" element={<ComponentsPreview />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieConsent />
    </>
  )
}

export default App
