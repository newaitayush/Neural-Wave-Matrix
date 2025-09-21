import React, { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Zap, Settings, Cpu } from "lucide-react";
import Grid from "./Grid";

export default function GameUI() {
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(160);
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(20);
  const [cellSize, setCellSize] = useState(18);
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(100);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setScore(prev => prev + Math.floor(Math.random() * 10) + 1);
        setEnergy(prev => Math.max(0, prev - 0.1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [running]);

  const handleReset = () => {
    setScore(0);
    setEnergy(100);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #1e3a8a 50%, #581c87 100%)',
      padding: '1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    backgroundEffects: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.2,
      pointerEvents: 'none'
    },
    particle: {
      position: 'absolute',
      borderRadius: '50%',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#67e8f9',
      fontSize: '0.875rem',
      letterSpacing: '0.1em',
      opacity: 0.7
    },
    mainGrid: {
      maxWidth: '120rem',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem'
    },
    gridContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem'
    },
    gridWrapper: {
      position: 'relative'
    },
    gridHologram: {
      position: 'relative',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.5), rgba(17, 24, 39, 0.5))',
      backdropFilter: 'blur(4px)',
      borderRadius: '0.75rem',
      border: '1px solid rgba(6, 182, 212, 0.3)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    gridOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
      borderRadius: '0.75rem',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    },
    corner: {
      position: 'absolute',
      width: '1rem',
      height: '1rem'
    },
    cornerTL: {
      top: '-0.5rem',
      left: '-0.5rem',
      borderLeft: '2px solid #06b6d4',
      borderTop: '2px solid #06b6d4',
      borderTopLeftRadius: '0.25rem'
    },
    cornerTR: {
      top: '-0.5rem',
      right: '-0.5rem',
      borderRight: '2px solid #06b6d4',
      borderTop: '2px solid #06b6d4',
      borderTopRightRadius: '0.25rem'
    },
    cornerBL: {
      bottom: '-0.5rem',
      left: '-0.5rem',
      borderLeft: '2px solid #06b6d4',
      borderBottom: '2px solid #06b6d4',
      borderBottomLeftRadius: '0.25rem'
    },
    cornerBR: {
      bottom: '-0.5rem',
      right: '-0.5rem',
      borderRight: '2px solid #06b6d4',
      borderBottom: '2px solid #06b6d4',
      borderBottomRightRadius: '0.25rem'
    },
    controlPanel: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    panel: {
      background: 'linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(17, 24, 39, 0.8))',
      backdropFilter: 'blur(4px)',
      borderRadius: '0.5rem',
      padding: '1rem',
      border: '1px solid',
      transition: 'all 0.2s'
    },
    statusPanel: {
      borderColor: 'rgba(34, 197, 94, 0.3)'
    },
    controlsPanel: {
      borderColor: 'rgba(147, 51, 234, 0.3)'
    },
    settingsPanel: {
      borderColor: 'rgba(249, 115, 22, 0.3)'
    },
    infoPanel: {
      borderColor: 'rgba(59, 130, 246, 0.3)'
    },
    panelHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem'
    },
    panelTitle: {
      fontFamily: 'monospace',
      fontSize: '0.875rem'
    },
    statusGrid: {
      display: 'grid',
      gap: '0.5rem',
      fontSize: '0.875rem'
    },
    statusRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    energyBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    energyBarTrack: {
      width: '4rem',
      height: '0.5rem',
      backgroundColor: '#374151',
      borderRadius: '9999px',
      overflow: 'hidden'
    },
    energyBarFill: {
      height: '100%',
      background: 'linear-gradient(45deg, #22c55e, #eab308)',
      transition: 'width 0.3s'
    },
    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      border: '1px solid',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontFamily: 'monospace',
      fontSize: '0.75rem'
    },
    settingsGrid: {
      display: 'grid',
      gap: '0.75rem',
      fontSize: '0.75rem'
    },
    sliderGroup: {
      display: 'grid',
      gap: '0.25rem'
    },
    slider: {
      width: '100%',
      height: '0.25rem',
      borderRadius: '0.5rem',
      backgroundColor: '#374151',
      outline: 'none',
      cursor: 'pointer',
      appearance: 'none'
    },
    infoText: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Effects */}
      <div style={styles.backgroundEffects}>
        <div style={{...styles.particle, top: '2.5rem', left: '2.5rem', width: '0.5rem', height: '0.5rem', backgroundColor: '#06b6d4', animationDelay: '0s'}}></div>
        <div style={{...styles.particle, top: '8rem', right: '5rem', width: '0.25rem', height: '0.25rem', backgroundColor: '#22c55e', animationDelay: '0.7s'}}></div>
        <div style={{...styles.particle, bottom: '5rem', left: '25%', width: '0.375rem', height: '0.375rem', backgroundColor: '#a855f7', animationDelay: '1s'}}></div>
        <div style={{...styles.particle, bottom: '10rem', right: '33%', width: '0.25rem', height: '0.25rem', backgroundColor: '#ec4899', animationDelay: '0.5s'}}></div>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>NEURAL WAVE MATRIX</h1>
        <div style={styles.subtitle}>[ QUANTUM PULSE GENERATOR v2.1 ]</div>
      </div>

      {/* Grid Display */}
      <div style={styles.gridContainer}>
        <div style={styles.gridWrapper}>
          <div style={styles.gridHologram}>
            <div style={styles.gridOverlay}></div>
            <Grid rows={rows} cols={cols} speed={speed} running={running} cellSize={cellSize} />
          </div>
          
          <div style={{...styles.corner, ...styles.cornerTL}}></div>
          <div style={{...styles.corner, ...styles.cornerTR}}></div>
          <div style={{...styles.corner, ...styles.cornerBL}}></div>
          <div style={{...styles.corner, ...styles.cornerBR}}></div>
        </div>
      </div>

      {/* Control Panel */}
      <div style={styles.controlPanel}>
        
        {/* Status Display */}
        <div style={{...styles.panel, ...styles.statusPanel}}>
          <div style={styles.panelHeader}>
            <Cpu size={16} color="#22c55e" />
            <span style={{...styles.panelTitle, color: '#22c55e'}}>SYSTEM STATUS</span>
          </div>
          
          <div style={styles.statusGrid}>
            <div style={styles.statusRow}>
              <span style={{color: '#d1d5db'}}>Score:</span>
              <span style={{color: '#67e8f9', fontFamily: 'monospace'}}>{score.toLocaleString()}</span>
            </div>
            <div style={styles.statusRow}>
              <span style={{color: '#d1d5db'}}>Energy:</span>
              <div style={styles.energyBar}>
                <div style={styles.energyBarTrack}>
                  <div style={{...styles.energyBarFill, width: `${energy}%`}}></div>
                </div>
                <span style={{color: '#22c55e', fontFamily: 'monospace', fontSize: '0.75rem'}}>{Math.round(energy)}%</span>
              </div>
            </div>
            <div style={styles.statusRow}>
              <span style={{color: '#d1d5db'}}>State:</span>
              <span style={{fontFamily: 'monospace', color: running ? '#22c55e' : '#ef4444'}}>
                {running ? 'ACTIVE' : 'PAUSED'}
              </span>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div style={{...styles.panel, ...styles.controlsPanel}}>
          <div style={styles.panelHeader}>
            <Zap size={16} color="#a855f7" />
            <span style={{...styles.panelTitle, color: '#a855f7'}}>CONTROLS</span>
          </div>
          
          <div style={styles.buttonGrid}>
            <button
              onClick={() => setRunning(!running)}
              style={{
                ...styles.button,
                backgroundColor: running ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                borderColor: running ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.5)',
                color: running ? '#fca5a5' : '#86efac'
              }}
            >
              {running ? <Pause size={12} /> : <Play size={12} />}
              <span>{running ? 'PAUSE' : 'START'}</span>
            </button>
            
            <button
              onClick={handleReset}
              style={{
                ...styles.button,
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                borderColor: 'rgba(6, 182, 212, 0.5)',
                color: '#67e8f9'
              }}
            >
              <RotateCcw size={12} />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        <div style={{...styles.panel, ...styles.settingsPanel}}>
          <div style={styles.panelHeader}>
            <Settings size={16} color="#f97316" />
            <span style={{...styles.panelTitle, color: '#f97316'}}>PARAMETERS</span>
          </div>
          
          <div style={styles.settingsGrid}>
            <div style={styles.sliderGroup}>
              <label style={{color: '#d1d5db'}}>Speed: {speed}ms</label>
              <input
                type="range"
                min="50"
                max="500"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                style={styles.slider}
              />
            </div>
            
            <div style={styles.sliderGroup}>
              <label style={{color: '#d1d5db'}}>Rows: {rows}</label>
              <input
                type="range"
                min="10"
                max="25"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                style={styles.slider}
              />
            </div>
            
            <div style={styles.sliderGroup}>
              <label style={{color: '#d1d5db'}}>Cols: {cols}</label>
              <input
                type="range"
                min="15"
                max="30"
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                style={styles.slider}
              />
            </div>
            
            <div style={styles.sliderGroup}>
              <label style={{color: '#d1d5db'}}>Cell Size: {cellSize}px</label>
              <input
                type="range"
                min="12"
                max="30"
                value={cellSize}
                onChange={(e) => setCellSize(Number(e.target.value))}
                style={styles.slider}
              />
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div style={{...styles.panel, ...styles.infoPanel}}>
          <div style={{color: '#3b82f6', fontFamily: 'monospace', fontSize: '0.75rem', marginBottom: '0.5rem'}}>
            WAVE ANALYSIS
          </div>
          <div style={styles.infoText}>
            Neural patterns detected in quantum field. Wave propagation stable. 
            Energy levels within optimal range for sustained operation.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #a855f7);
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #a855f7);
          cursor: pointer;
          border: 2px solid #000;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        button:hover {
          transform: translateY(-1px);
          filter: brightness(1.1);
        }
      `}</style>
    </div>
  );
}