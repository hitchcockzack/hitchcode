'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  Phone, Mail, Globe, Linkedin, Download, Share2,
  CreditCard, DollarSign, Calendar, MapPin, QrCode,
  Moon, Sun, Smartphone, ArrowLeft, Coffee, Github,
  Copy, CheckCircle, Box, Code, Zap, Star, Award,
  Briefcase, Flame, Users, Music, Heart, Sparkles,
  Layers, Terminal, Database, Layout, Camera
} from 'lucide-react';
import styles from './greeting3.module.css';
import { QRCodeCanvas } from 'qrcode.react';
import { Toaster, toast } from 'sonner';
// Import the AR component
import ARView from './components/ARView';

// Set to true to disable notifications during development
const TESTING_MODE = false;

// Define the profile data structure
const PROFILE_DATA = {
  name: 'Zack Hitchcock',
  title: 'Orchestrator',
  company: 'Hitchcode',
  photo: '/zack.png',
  location: 'Boston, MA',
  contact: {
    phone: '+1 (707) 656-4252',
    email: 'zack@hitchcode.net',
    website: 'https://www.hitchcode.net',
    linkedin: 'www.linkedin.com/in/zack-hitchcock-17841a219/',
    github: 'https://github.com/zhitchcock',
  },
  payment: {
    venmo: 'ballzack3',
    paypal: 'hitchcockzack',
    applePay: true,
    googlePay: true,
    crypto: 'ETH: 0x1234...'
  },
  // Add real-time availability status that could be updated from a backend
  availability: {
    status: 'Available for projects', // or 'Currently unavailable', etc.
    isBusy: false,
  },
  skills: [
    { name: 'JavaScript', level: 95, icon: <Code size={20} /> },
    { name: 'React', level: 90, icon: <Layers size={20} /> },
    { name: 'Node.js', level: 85, icon: <Terminal size={20} /> },
    { name: 'UI/UX', level: 80, icon: <Layout size={20} /> },
    { name: 'Databases', level: 75, icon: <Database size={20} /> },
  ],
  achievements: [
    '🏆 Lead Engineer on Starlink project',
    '🚀 Launched 3 successful startups',
    '📚 Speaker at React Summit 2023',
    '🌟 Open source contributor'
  ],
  // Refined color theme options with more subtle combinations
  themes: [
    { id: 'darkness', name: 'Darkness', primary: '#000000', secondary: '#111111' },
    { id: 'elegant', name: 'Elegant', primary: '#7367f0', secondary: '#8e9aaf' },
    { id: 'forest', name: 'Forest', primary: '#38a169', secondary: '#68d391' },
    { id: 'ocean', name: 'Ocean', primary: '#0EA5E9', secondary: '#7DD3FC' },
    { id: 'midnight', name: 'Midnight', primary: '#4B5563', secondary: '#9CA3AF' },
  ]
};

export default function EnhancedGreeting() {
  // State management
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [activeTab, setActiveTab] = useState('contact');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [qrTitle, setQrTitle] = useState('');
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('elegant');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSkills, setShowSkills] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  // Add AR state
  const [showARView, setShowARView] = useState(false);

  // Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number | null>(null);

  // Effect for mobile detection and initialization
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Force dark mode
    document.documentElement.classList.add('dark-mode');

    // Initialize 3D mouse move effect for desktop
    if (!isMobile && containerRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current) return;

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        // Calculate mouse position relative to container
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Calculate tilt rotation (max 7 degrees - reduced from 10 for subtlety)
        const maxTilt = 7;
        const rotateY = maxTilt * (0.5 - x) * 2;
        const rotateX = maxTilt * (y - 0.5) * 2;

        // Apply transform to card
        cardRef.current.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale3d(1.02, 1.02, 1.02)
        `;

        // Track mouse for glow effect
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      const resetTilt = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      };

      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseleave', resetTilt);

      return () => {
        containerRef.current?.removeEventListener('mousemove', handleMouseMove);
        containerRef.current?.removeEventListener('mouseleave', resetTilt);
      };
    }

    sendNotification('✨ Welcome to the digital card');
    loadPhoto();

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [isMobile]);

  // Effect for animated background
  useEffect(() => {
    if (!canvasRef.current || isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas || !containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      const theme = PROFILE_DATA.themes.find(t => t.id === selectedTheme) || PROFILE_DATA.themes[0];

      for (let i = 0; i < 40; i++) { // Reduced from 50 for subtlety
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.2, // Smaller particles
          color: Math.random() > 0.5 ? theme.primary : theme.secondary,
          speedX: Math.random() * 0.3 - 0.15, // Slower movement
          speedY: Math.random() * 0.3 - 0.15,
          opacity: Math.random() * 0.4 + 0.2 // More transparent
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isMobile, selectedTheme]);

  // Effect for theme change
  useEffect(() => {
    if (!isMobile && canvasRef.current) {
      // Recreate particles with new theme colors
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      particlesRef.current = [];
      const theme = PROFILE_DATA.themes.find(t => t.id === selectedTheme) || PROFILE_DATA.themes[0];

      for (let i = 0; i < 40; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.2,
          color: Math.random() > 0.5 ? theme.primary : theme.secondary,
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.3 - 0.15,
          opacity: Math.random() * 0.4 + 0.2
        });
      }
    }

    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme, isMobile]);

  // Effect for explosion animation on special interaction
  useEffect(() => {
    if (!isExploding) return;

    if ('vibrate' in navigator) {
      navigator.vibrate([10, 20, 30, 40, 50, 40, 30, 20, 10]);
    }

    setTimeout(() => {
      setIsExploding(false);
    }, 1000);
  }, [isExploding]);

  // Effect for loading profile photo with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setProfileLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handler functions
  const loadPhoto = async () => {
    try {
      const response = await fetch('/zack.png');
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setPhotoData(base64data.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error loading photo:', error);
    }
  };

  const sendNotification = (message: string) => {
    if (TESTING_MODE) {
      console.log('Testing mode - notification suppressed:', message);
      return;
    }

    // Use sonner toast instead of custom notification
    toast(message);
  };

  const saveContact = () => {
    // Create vCard format
    const photoString = photoData ? `
PHOTO;ENCODING=b;TYPE=JPEG:${photoData}` : '';

    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${PROFILE_DATA.name}
N:Hitchcock;Zack;;;
TITLE:${PROFILE_DATA.title}${photoString}
TEL:${PROFILE_DATA.contact.phone}
EMAIL:${PROFILE_DATA.contact.email}
URL:${PROFILE_DATA.contact.website}
URL;type=LINKEDIN:${PROFILE_DATA.contact.linkedin}
URL;type=GITHUB:${PROFILE_DATA.contact.github}
END:VCARD`;

    // Create a blob and download link
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${PROFILE_DATA.name.replace(' ', '_')}.vcf`;
    a.click();

    // Visual and haptic feedback
    setIsExploding(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]);
    }

    sendNotification('✅ Contact saved to your device');
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${PROFILE_DATA.name} - ${PROFILE_DATA.title}`,
        text: `Connect with ${PROFILE_DATA.name}, ${PROFILE_DATA.title} at ${PROFILE_DATA.company}`,
        url: window.location.href,
      })
      .then(() => sendNotification('🙏 Thanks for sharing!'))
      .catch(() => sendNotification('Sharing cancelled'));
    } else {
      // Show QR code if share API is not available
      generateQR(window.location.href, 'Share My Profile');
    }
  };

  const handleContactClick = (type: string) => {
    const messages: {[key: string]: string} = {
      Phone: '📞 Phone number clicked',
      Email: '📧 Email clicked',
      Website: '🌐 Website clicked',
      LinkedIn: '💼 LinkedIn clicked',
      GitHub: '💻 GitHub clicked'
    };
    sendNotification(messages[type] || `${type} clicked`);

    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  };

  const handlePayment = (method: string) => {
    setShowPaymentOptions(false);

    switch (method) {
      case 'venmo':
        window.open(`venmo://paycharge?txn=pay&recipients=${PROFILE_DATA.payment.venmo}`, '_blank');
        setTimeout(() => {
          window.open(`https://venmo.com/${PROFILE_DATA.payment.venmo}`, '_blank');
        }, 500);
        sendNotification('💸 Venmo payment initiated');
        break;
      case 'paypal':
        window.open(`https://paypal.me/${PROFILE_DATA.payment.paypal}`, '_blank');
        sendNotification('💳 PayPal payment initiated');
        break;
      case 'buy-coffee':
        window.open('https://www.buymeacoffee.com/hitchcockzack', '_blank');
        sendNotification('☕ Coffee payment initiated');
        break;
      case 'crypto':
        copyToClipboard(PROFILE_DATA.payment.crypto, 'Crypto address');
        sendNotification('🪙 Crypto address copied');
        break;
      default:
        sendNotification(`${method} coming soon!`);
        break;
    }
  };

  const toggleThemePicker = () => {
    setShowThemePicker(!showThemePicker);
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const selectTheme = (themeId: string) => {
    setSelectedTheme(themeId);
    setShowThemePicker(false);
    sendNotification(`Theme changed to ${themeId}`);
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 20, 10]);
    }
  };

  const handleScheduleCall = (type: string) => {
    if (type === 'call') {
      window.open('https://calendly.com/zackhitchcock/30min', '_blank');
      sendNotification('📅 Opening scheduling tool');
    } else {
      window.open('https://calendly.com/zackhitchcock/coffee', '_blank');
      sendNotification('☕ Let\'s grab coffee soon!');
    }

    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        sendNotification(`📋 ${label} copied to clipboard`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if ('vibrate' in navigator) {
          navigator.vibrate([15, 30, 15]);
        }
      })
      .catch(() => {
        sendNotification('❌ Failed to copy');
        setCopied(false);
      });
  };

  const toggleSkills = () => {
    setShowSkills(!showSkills);
    sendNotification(showSkills ? '🔍 Hiding skills' : '🔍 Showing skills & achievements');
    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
  };

  const getRealTimeAvailability = () => {
    // In a real app, this could check an API for real-time availability
    setIsAvailable(!isAvailable);
    sendNotification(isAvailable ? '🔴 Status set to busy' : '🟢 Status set to available');
  };

  const generateQR = (value: string, title: string) => {
    setQrValue(value);
    setQrTitle(title);
    setShowQrCode(true);
  };

  const checkAvailability = () => {
    // This would ideally fetch real-time availability from an API
    sendNotification(PROFILE_DATA.availability.isBusy
      ? 'I\'m currently in a meeting or busy'
      : 'I\'m available now, feel free to reach out!');
  };

  // Get current theme colors
  const getThemeColors = () => {
    return PROFILE_DATA.themes.find(theme => theme.id === selectedTheme) || PROFILE_DATA.themes[0];
  };

  // Dynamic style for glow effect
  const getGlowStyle = () => {
    const theme = getThemeColors();
    if (isMobile) return {};

    return {
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
                   ${theme.primary}08 0%, transparent 50%)`, // Reduced opacity
    };
  };

  // Toggle AR view
  const toggleARView = () => {
    console.log("AR button clicked, current state:", showARView);
    setShowARView(!showARView);
    sendNotification(showARView ? '🔙 Exiting AR Mode' : '🎥 Entering AR Mode');

    if ('vibrate' in navigator) {
      navigator.vibrate([20, 40, 20]);
    }

    // Log after state update
    setTimeout(() => {
      console.log("AR state updated to:", !showARView);
    }, 100);
  };

  return (
    <div ref={containerRef} className={`${styles.container} ${styles.darkMode} ${styles[selectedTheme]}`}>
      {/* Sonner Toaster */}
      <Toaster position="bottom-center" theme="dark" closeButton richColors />

      {/* AR View overlay */}
      {showARView && (
        <ARView
          profile={PROFILE_DATA}
          onClose={() => {
            setShowARView(false);
            sendNotification('🔙 Exited AR Mode');
          }}
        />
      )}

      {/* Animated background canvas for desktop */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className={styles.backgroundCanvas}
        />
      )}

      {/* Glow effect layer */}
      <div
        className={styles.glowEffect}
        style={getGlowStyle()}
      />

      {/* Main card */}
      <div
        ref={cardRef}
        className={`${styles.card} ${(showPaymentOptions || showQrCode || showThemePicker) ? styles.blurred : ''} ${isExploding ? styles.exploding : ''}`}
      >
        {/* Theme selector button */}
        <button
          className={styles.themeButton}
          onClick={toggleThemePicker}
        >
          <Sparkles size={18} />
        </button>

        {/* Status Indicator */}
        <div
          className={`${styles.statusIndicator} ${PROFILE_DATA.availability.isBusy ? styles.busy : ''}`}
          onClick={checkAvailability}
        >
          <div className={styles.statusDot}></div>
          <div className={styles.statusText}>
            {PROFILE_DATA.availability.status}
          </div>
        </div>

        {/* Profile Header */}
        <header className={styles.header}>
          <div className={styles.imageWrapper}>
            <Image
              src={PROFILE_DATA.photo}
              alt={PROFILE_DATA.name}
              width={180}
              height={180}
              className={styles.profileImage}
              priority
            />
            <div className={styles.imageGlow}></div>
          </div>

          <div className={styles.headerContent}>
            <h1 className={styles.name}>{PROFILE_DATA.name}</h1>

            <div className={styles.titleWrapper}>
              <p className={styles.title}>{PROFILE_DATA.title}</p>
              <div className={styles.company}>
                <Github className={styles.buildingIcon} />
                {PROFILE_DATA.company}
              </div>
              <a
                href={`https://maps.google.com/?q=${PROFILE_DATA.location}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.location}
              >
                <MapPin size={14} />
                {PROFILE_DATA.location}
              </a>
            </div>
          </div>
        </header>

        {/* Skills Toggle Button */}
        <button
          className={styles.skillsToggle}
          onClick={toggleSkills}
        >
          {showSkills ? 'Hide Skills' : 'Show Skills'}
          <Flame size={18} className={styles.skillsIcon} />
        </button>

        {/* Skills and Achievements Section */}
        {showSkills && (
          <div className={styles.skillsSection}>
            <h3 className={styles.skillsTitle}>Professional Skills</h3>

            <div className={styles.skillsBars}>
              {PROFILE_DATA.skills.map((skill, index) => (
                <div key={index} className={styles.skillBar}>
                  <div className={styles.skillInfo}>
                    <div className={styles.skillIcon}>{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                  <div className={styles.skillBarOuter}>
                    <div
                      className={styles.skillBarInner}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <h3 className={styles.achievementsTitle}>
              <Award size={18} />
              Achievements
            </h3>

            <ul className={styles.achievementsList}>
              {PROFILE_DATA.achievements.map((achievement, index) => (
                <li key={index} className={styles.achievementItem}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button
            className={`${styles.tabButton} ${activeTab === 'contact' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <Phone size={18} />
            <span>Contact</span>
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'social' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <Globe size={18} />
            <span>Social</span>
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'schedule' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Calendar size={18} />
            <span>Schedule</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'contact' && (
          <div className={styles.contactGrid}>
            <a
              href={`tel:${PROFILE_DATA.contact.phone}`}
              className={styles.contactItem}
              onClick={() => handleContactClick('Phone')}
            >
              <Phone className={styles.icon} />
              <span>Call</span>
            </a>
            <a
              href={`sms:${PROFILE_DATA.contact.phone}`}
              className={styles.contactItem}
              onClick={() => handleContactClick('SMS')}
            >
              <svg
                className={styles.icon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Text</span>
            </a>
            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className={styles.contactItem}
              onClick={() => handleContactClick('Email')}
            >
              <Mail className={styles.icon} />
              <span>Email</span>
            </a>
            <div
              className={styles.contactItem}
              onClick={() => copyToClipboard(PROFILE_DATA.contact.email, 'Email')}
            >
              <Copy className={styles.icon} />
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className={styles.contactGrid}>
            <a
              href={PROFILE_DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              onClick={() => handleContactClick('LinkedIn')}
            >
              <Linkedin className={styles.icon} />
              <span>LinkedIn</span>
            </a>
            <a
              href={PROFILE_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              onClick={() => handleContactClick('GitHub')}
            >
              <Github className={styles.icon} />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE_DATA.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              onClick={() => handleContactClick('Website')}
            >
              <Globe className={styles.icon} />
              <span>Website</span>
            </a>
            <div
              className={styles.contactItem}
              onClick={() => generateQR(PROFILE_DATA.contact.website, 'Scan for Website')}
            >
              <QrCode className={styles.icon} />
              <span>QR Code</span>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className={styles.scheduleTab}>
            <div className={styles.availabilityBar}>
              <div className={`${styles.availabilityIndicator} ${isAvailable ? styles.isAvailable : styles.isBusy}`}>
                <div className={styles.availabilityDot}></div>
                <span>{isAvailable ? 'Available Now' : 'Currently Busy'}</span>
              </div>
              <button
                className={styles.toggleAvailability}
                onClick={getRealTimeAvailability}
              >
                Toggle
              </button>
            </div>

            <button
              className={styles.scheduleButton}
              onClick={() => handleScheduleCall('call')}
            >
              <Calendar className={styles.calendarIcon} />
              <div>
                <span className={styles.scheduleTitle}>Schedule a Call</span>
                <span className={styles.scheduleSubtitle}>30 min · Virtual Meeting</span>
              </div>
            </button>

            <button
              className={`${styles.scheduleButton} ${styles.coffeeButton}`}
              onClick={() => handleScheduleCall('coffee')}
            >
              <Coffee className={styles.calendarIcon} />
              <div>
                <span className={styles.scheduleTitle}>Coffee Chat</span>
                <span className={styles.scheduleSubtitle}>45 min · In Person</span>
              </div>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={saveContact}
          >
            <Download className={styles.buttonIcon} />
            Save Contact
          </button>

          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={shareProfile}
          >
            <Share2 className={styles.buttonIcon} />
            Share
          </button>

          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => setShowPaymentOptions(true)}
          >
            <CreditCard className={styles.buttonIcon} />
            Pay
          </button>
        </div>
      </div>

      {/* AR View floating button */}
      <button
        className={styles.arControlsButton}
        onClick={toggleARView}
        aria-label="AR View"
      >
        <Camera size={32} />
        <span className={styles.arButtonLabel}>AR View</span>
      </button>

      {/* Payment Popup */}
      {showPaymentOptions && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Select Payment Method</h3>

            <div className={styles.paymentOptions}>
              <div
                className={styles.paymentOption}
                onClick={() => handlePayment('venmo')}
              >
                <Image
                  src="/venmo.svg"
                  alt="Venmo"
                  width={32}
                  height={32}
                  className={styles.paymentIcon}
                />
                Venmo
              </div>

              <div
                className={styles.paymentOption}
                onClick={() => handlePayment('paypal')}
              >
                <Image
                  src="/paypal.svg"
                  alt="PayPal"
                  width={32}
                  height={32}
                  className={styles.paymentIcon}
                />
                PayPal
              </div>

              <div
                className={styles.paymentOption}
                onClick={() => handlePayment('buy-coffee')}
              >
                <Coffee className={styles.paymentIcon} />
                Buy Coffee
              </div>

              <div
                className={styles.paymentOption}
                onClick={() => handlePayment('crypto')}
              >
                <Zap className={styles.paymentIcon} />
                Crypto
              </div>
            </div>

            <button
              className={styles.closeButton}
              onClick={() => setShowPaymentOptions(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* QR Code Popup */}
      {showQrCode && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>{qrTitle}</h3>
            <div className={styles.qrCodeContainer}>
              <QRCodeCanvas
                value={qrValue}
                size={200}
                bgColor={"#000000"}
                fgColor={"#ffffff"}
                level={"H"}
                includeMargin={true}
              />
            </div>
            <p>Scan with your camera app</p>
            <button
              className={styles.closeButton}
              onClick={() => setShowQrCode(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Theme Picker Popup */}
      {showThemePicker && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Select Theme</h3>
            <div className={styles.themeGrid}>
              {PROFILE_DATA.themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`${styles.themeOption} ${selectedTheme === theme.id ? styles.selectedTheme : ''}`}
                  onClick={() => selectTheme(theme.id)}
                  style={{
                    background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
                  }}
                >
                  <span>{theme.name}</span>
                  {selectedTheme === theme.id && (
                    <CheckCircle className={styles.themeCheckmark} />
                  )}
                </div>
              ))}
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setShowThemePicker(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Explosion Effect SVG */}
      {isExploding && (
        <div className={styles.explosionContainer}>
          {Array.from({ length: 15 }).map((_, i) => ( // Reduced from 20 particles
            <div
              key={i}
              className={styles.particle}
              style={{
                '--angle': `${Math.random() * 360}deg`,
                '--distance': `${Math.random() * 80 + 40}px`, // Reduced distance
                '--size': `${Math.random() * 8 + 3}px`, // Reduced size
                '--speed': `${Math.random() * 0.8 + 0.4}s`, // Faster animation
                '--color': getThemeColors().primary
              } as any}
            />
          ))}
        </div>
      )}
    </div>
  );
}
