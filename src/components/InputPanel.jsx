/**
 * InputPanel Component (AI-Generated via Prompt)
 * 
 * Implements the 7 user control cards ("bubble cards") inside a responsive CSS grid
 * as specified in the Group Project 2 — Milestone 2 specification:
 * 1. Room Dimensions: Numeric inputs for Length, Width, and Ceiling Height in cm.
 * 2. Front Channels: Presence toggle (Yes/No).
 * 3. Center Channel: Presence toggle (Yes/No).
 * 4. Subwoofers: Channel count selection (0, 1, 2, or 4 units).
 * 5. Side Surrounds: Presence toggle and conditional ear-level vs high wall-mount selector.
 * 6. Rear Surrounds: Presence toggle and conditional ear-level vs high wall-mount selector.
 * 7. Ceiling Heights: Presence toggle, quantity (2 or 4), and mounting type (flush or upward-firing).
 */
function InputPanel({ room, onRoomChange, settings, onSettingsChange }) {
  /**
   * Validates and updates numeric room dimension fields.
   * Ensures inputs are parsed to valid base-10 integers and must be positive numbers.
   */
  function handleDimension(field, value) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      onRoomChange({
        ...room,
        [field]: num
      });
    }
  }

  /**
   * Immutably updates application settings state.
   */
  function handleSetting(field, value) {
    onSettingsChange({
      ...settings,
      [field]: value
    });
  }

  return (
    <div className="input-panel">
      <h2>Room & Speaker Settings</h2>
      
      {/* Responsive CSS Grid Container */}
      <div className="bubble-grid">

        {/* ====================================================================
            Bubble Card 1: Physical Room Dimensions (cm)
            ==================================================================== */}
        <div className="bubble-card">
          <div className="bubble-header">
            <h3>1. Room Dimensions</h3>
            <span className="unit-badge">Centimeters (cm)</span>
          </div>
          <div className="field-group">
            <label>Length (cm):</label>
            <input
              type="number"
              min="200"
              max="2000"
              step="10"
              value={room.length}
              onChange={(e) => handleDimension("length", e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Width (cm):</label>
            <input
              type="number"
              min="200"
              max="2000"
              step="10"
              value={room.width}
              onChange={(e) => handleDimension("width", e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Height (cm):</label>
            <input
              type="number"
              min="180"
              max="800"
              step="5"
              value={room.height}
              onChange={(e) => handleDimension("height", e.target.value)}
            />
          </div>
        </div>

        {/* ====================================================================
            Bubble Card 2: Front Soundstage Channels (Left & Right)
            ==================================================================== */}
        <div className="bubble-card">
          <div className="bubble-header">
            <h3>2. Front Channels</h3>
          </div>
          <div className="field-group">
            <label>Include Front Left & Right:</label>
            <select
              value={settings.frontChannels ? "yes" : "no"}
              onChange={(e) => handleSetting("frontChannels", e.target.value === "yes")}
            >
              <option value="yes">Yes (Included)</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* ====================================================================
            Bubble Card 3: Dedicated Center Dialogue Channel
            ==================================================================== */}
        <div className="bubble-card">
          <div className="bubble-header">
            <h3>3. Center Channel</h3>
          </div>
          <div className="field-group">
            <label>Include Center Channel:</label>
            <select
              value={settings.centerChannel ? "yes" : "no"}
              onChange={(e) => handleSetting("centerChannel", e.target.value === "yes")}
            >
              <option value="yes">Yes (Included)</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* ====================================================================
            Bubble Card 4: Low-Frequency Effects (LFE Subwoofers)
            ==================================================================== */}
        <div className="bubble-card">
          <div className="bubble-header">
            <h3>4. Subwoofer (Bass)</h3>
          </div>
          <div className="field-group">
            <label>Number of Subwoofers:</label>
            <select
              value={settings.subwooferCount}
              onChange={(e) => handleSetting("subwooferCount", parseInt(e.target.value, 10))}
            >
              <option value="0">0 (None)</option>
              <option value="1">1 Subwoofer</option>
              <option value="2">2 Subwoofers</option>
              <option value="4">4 Subwoofers</option>
            </select>
          </div>
        </div>

        {/* ====================================================================
            Bubble Card 5: Side Surround Channels & Mounting Architecture
            ==================================================================== */}
        <div className="bubble-card">
          <div className="bubble-header">
            <h3>5. Side Speakers</h3>
          </div>
          <div className="field-group">
            <label>Include Side Surrounds:</label>
            <select
              value={settings.sideSpeakers ? "yes" : "no"}
              onChange={(e) => handleSetting("sideSpeakers", e.target.value === "yes")}
            >
              <option value="yes">Yes (Included)</option>
              <option value="no">No</option>
            </select>
          </div>
          {/* Conditional Mounting Selector: Only visible when side surrounds are active */}
          {settings.sideSpeakers && (
            <div className="field-group">
              <label>Mounting Location:</label>
              <select
                value={settings.sideMount}
                onChange={(e) => handleSetting("sideMount", e.target.value)}
              >
                <option value="ear">At Ear Level (Stands)</option>
                <option value="wall">Mounted on the Wall</option>
              </select>
            </div>
          )}
        </div>

        {/* ====================================================================
            Bubble Card 6: Rear Surround Channels & Mounting Architecture
            ==================================================================== */}
        <div className="bubble-card">
          <div className="bubble-header">
            <h3>6. Rear Speakers</h3>
          </div>
          <div className="field-group">
            <label>Include Rear Surrounds:</label>
            <select
              value={settings.rearSpeakers ? "yes" : "no"}
              onChange={(e) => handleSetting("rearSpeakers", e.target.value === "yes")}
            >
              <option value="yes">Yes (Included)</option>
              <option value="no">No</option>
            </select>
          </div>
          {/* Conditional Mounting Selector: Only visible when rear surrounds are active */}
          {settings.rearSpeakers && (
            <div className="field-group">
              <label>Mounting Location:</label>
              <select
                value={settings.rearMount}
                onChange={(e) => handleSetting("rearMount", e.target.value)}
              >
                <option value="ear">At Ear Level (Stands)</option>
                <option value="wall">Mounted on the Wall</option>
              </select>
            </div>
          )}
        </div>

        {/* ====================================================================
            Bubble Card 7: Overhead Height Channels (Dolby Atmos)
            ==================================================================== */}
        <div className="bubble-card">
          <div className="bubble-header">
            <h3>7. Ceiling Speakers (Dolby Atmos)</h3>
          </div>
          <div className="field-group">
            <label>Include Ceiling Speakers:</label>
            <select
              value={settings.ceilingSpeakers ? "yes" : "no"}
              onChange={(e) => handleSetting("ceilingSpeakers", e.target.value === "yes")}
            >
              <option value="yes">Yes (Included)</option>
              <option value="no">No</option>
            </select>
          </div>
          {/* Conditional Quantity & Mounting Selectors */}
          {settings.ceilingSpeakers && (
            <>
              <div className="field-group">
                <label>Speaker Quantity:</label>
                <select
                  value={settings.ceilingCount}
                  onChange={(e) => handleSetting("ceilingCount", parseInt(e.target.value, 10))}
                >
                  <option value="2">2 Speakers (Front Heights)</option>
                  <option value="4">4 Speakers (Front & Rear Heights)</option>
                </select>
              </div>
              <div className="field-group">
                <label>Mounting Type:</label>
                <select
                  value={settings.ceilingType}
                  onChange={(e) => handleSetting("ceilingType", e.target.value)}
                >
                  <option value="ceiling">Ceiling Mounted</option>
                  <option value="upward">Upward Firing</option>
                </select>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// Export component to global window object
window.InputPanel = InputPanel;
