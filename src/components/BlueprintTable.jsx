/**
 * BlueprintTable Component (AI-Generated via Prompt)
 * 
 * Renders the primary output display: an 8-column reactive installation blueprint table.
 * For each active speaker channel, it invokes window.calculate_speaker_position() to obtain
 * physical coordinates, tape-measure wall distances, mounting height, horizontal toe-in
 * angles, vertical down-tilt angles, and 3D Euclidean distances to the seated listener.
 * 
 * Features:
 * - Dynamic color-coded row tinting based on speaker channel type (.row-front, .row-center, etc.)
 * - Informative header displaying room dimensions in centimeters and seated ear reference (110 cm)
 * - Empty state feedback when no speakers are selected
 * - Fully responsive table container with horizontal scroll capability
 */
function BlueprintTable({ activeSpeakers, room, settings }) {
  // Guard Clause: Handle empty selection state gracefully
  if (!activeSpeakers || activeSpeakers.length === 0) {
    return (
      <div className="blueprint-section">
        <h2>Speaker Placement Blueprint</h2>
        <p className="empty-message">No speakers selected. Please choose your speakers above to see the blueprint.</p>
      </div>
    );
  }

  return (
    <div className="blueprint-section">
      {/* Blueprint Section Header */}
      <div className="blueprint-header">
        <h2>Speaker Placement Blueprint</h2>
        <span className="room-info">
          Room Size: {room.length} cm (L) × {room.width} cm (W) × {room.height} cm (H) | Seated Ear Level: 110 cm
        </span>
      </div>

      {/* Responsive Table Container */}
      <div className="table-container">
        <table className="blueprint-table">
          <thead>
            <tr>
              <th>Speaker Channel</th>
              <th>Mounting Style</th>
              <th>Distance from Front Wall</th>
              <th>Distance from Side Wall</th>
              <th>Mounting Height</th>
              <th>Horizontal Angle</th>
              <th>Vertical Angle</th>
              <th>Distance to Listener</th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate over each active speaker and calculate spatial geometry */}
            {activeSpeakers.map((speaker) => {
              // Execute acoustic calculation engine
              const data = window.calculate_speaker_position(speaker, room, settings);

              return (
                <tr key={speaker.id} className={`row-${speaker.type}`}>
                  {/* Speaker Channel Identity Badge */}
                  <td>
                    <span className={`channel-badge badge-${speaker.type}`}>{speaker.id}</span>
                    <strong>{speaker.name}</strong>
                  </td>

                  {/* Physical Mounting Architecture */}
                  <td>{data.mountingStyle}</td>

                  {/* Tape-Measure Distance Metrics */}
                  <td>{data.fromFrontWall} cm</td>
                  <td>{data.fromSideWall} cm</td>
                  <td>{data.mountingHeight} cm</td>

                  {/* Trigonometric Aiming Angles */}
                  <td><span className="angle-tag">{data.horizontalAngle}</span></td>
                  <td><span className="angle-tag">{data.verticalAngle}</span></td>

                  {/* 3D Euclidean Distance to Seated Listener */}
                  <td><strong>{data.distanceToListener} cm</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Export component to global window object for browser runtime
window.BlueprintTable = BlueprintTable;
