/**
 * Header Component (AI-Generated via Prompt)
 * 
 * Displays the application banner, branding title, functional subtitle,
 * and the live layout notation badge (e.g., 5.1, 7.1, or 5.1.2) which dynamically
 * updates whenever speaker settings change.
 */
function Header({ layoutNotation }) {
  return (
    <header className="page-header">
      {/* Branding and Descriptive Information */}
      <div className="header-content">
        <h1>Spatial Audio Layout Configurator</h1>
        <p>Calculate speaker placements and angles for your home theater</p>
      </div>

      {/* Dynamic Layout Notation Indicator Badge */}
      <div className="layout-badge">
        <span>Current Layout</span>
        <h2>{layoutNotation}</h2>
      </div>
    </header>
  );
}

// Export component to global window object
window.Header = Header;
