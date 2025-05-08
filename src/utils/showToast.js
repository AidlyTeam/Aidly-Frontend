import toast from 'react-hot-toast'

// return rejectWithValue(error.response.data.code);

const getToastStyle = (type) => {
  const baseStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '16px',
    color: '#2C3E50',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    animation: 'pulse 2s infinite',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      backgroundSize: '200% 200%',
      animation: 'glow 3s ease infinite',
    }
  }

  const typeStyles = {
    success: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 255, 255, 0.95))',
      '&::before': {
        background: 'linear-gradient(90deg, #00F0FF, #72F088, #00F0FF)',
      }
    },
    error: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 240, 0.95))',
      '&::before': {
        background: 'linear-gradient(90deg, #FF3D00, #FF6B6B, #FF3D00)',
      }
    },
    warning: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 240, 0.95))',
      '&::before': {
        background: 'linear-gradient(90deg, #FFB300, #FFD54F, #FFB300)',
      }
    },
    info: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 248, 255, 0.95))',
      '&::before': {
        background: 'linear-gradient(90deg, #00F0FF, #4FC3F7, #00F0FF)',
      }
    }
  }

  return {
    ...baseStyle,
    ...typeStyles[type]
  }
}

const getIcon = (type) => {
  const icons = {
    success: '✨',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }
  return icons[type] || '✨'
}

const showToast = (type, message, position, customStyle) => {
  let duration = 2000
  if (message?.length > 15) {
    duration += (message?.length - 15) * 25
  }

  if (message && message !== '') {
    const icon = getIcon(type)
    const style = getToastStyle(type)
    
    toast[type]?.(`${icon} ${message}`, {
      position: position ?? 'bottom-right',
      duration: duration,
      style: {
        ...style,
        ...customStyle
      },
      className: 'web3-toast',
    })
  } else {
    if (type === 'dismiss') toast[type]()
  }
}

// Add global styles for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.2);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(0, 240, 255, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(0, 240, 255, 0);
      }
    }

    @keyframes glow {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .web3-toast {
      animation: pulse 2s infinite;
      font-weight: 500;
      letter-spacing: 0.3px;
    }

    .web3-toast::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background-size: 200% 200%;
      animation: glow 3s ease infinite;
    }

    .web3-toast:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease;
    }
  `
  document.head.appendChild(style)
}

export { showToast }