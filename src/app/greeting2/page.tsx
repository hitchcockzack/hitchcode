'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  Phone, Mail, Globe, Linkedin, Download, Share2, Crown,
  CreditCard, DollarSign, Calendar, MapPin, QrCode,
  Moon, Sun, Smartphone, ClipboardCopy, ArrowLeft,
  BellRing, Coffee, Github, X, Copy, CheckCircle,
  Box
} from 'lucide-react';
import styles from './greeting2.module.css';
import { QRCodeCanvas } from 'qrcode.react';

// Set to true to disable notifications during development
const TESTING_MODE = true;

// Define the profile data structure
const PROFILE_DATA = {
  name: 'Zack Hitchcock',
  title: 'Software Engineer',
  company: 'Hitch Code',
  photo: '/zack.png',
  location: 'San Francisco, CA',
  contact: {
    phone: '+1 (707) 656-4252',
    email: 'zackhitchcock@gmail.com',
    website: 'https://www.hitchcode.com',
    linkedin: 'https://www.linkedin.com/in/zack-hitchcock',
  },
  payment: {
    venmo: '@zackhitchco',
    paypal: 'ZackHitchcock',
    applePay: true,
    googlePay: true,
  },
  // Add real-time availability status that could be updated from a backend
  availability: {
    status: 'Available for projects', // or 'Currently unavailable', etc.
    isBusy: false,
  }
};

export default function EnhancedGreeting() {
  // State management
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [qrTitle, setQrTitle] = useState('');
  const [showARView, setShowARView] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [showAR, setShowAR] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [orientation, setOrientation] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const tiltWrapperRef = useRef<HTMLDivElement>(null);

  // Effect for mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Check for mobile features
    setIsMobile('share' in navigator);
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Check if device supports orientation
    if (window.DeviceOrientationEvent) {
      setOrientation('available');
    }

    sendNotification('📱 Enhanced card visited');
    loadPhoto();

    // Apply dark mode to document if needed
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    }

    // Vibration test for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    // Listen for dark mode changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    };

    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  // Update document class when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Effect for 3D tilt effect
  useEffect(() => {
    if (!isMobile || !tiltWrapperRef.current) return;

    const handleTilt = (e: DeviceOrientationEvent) => {
      if (e.beta && e.gamma) {
        const x = Math.min(Math.max(e.gamma, -10), 10) * 0.5;
        const y = Math.min(Math.max(e.beta - 45, -10), 10) * 0.5;

        setTiltValues({ x, y });
      }
    };

    window.addEventListener('deviceorientation', handleTilt);

    return () => window.removeEventListener('deviceorientation', handleTilt);
  }, [isMobile]);

  // Effect for haptic feedback on supported devices
  useEffect(() => {
    if (!isMobile) return;

    const buttons = document.querySelectorAll(`.${styles.button}, .${styles.contactItem}, .${styles.tabButton}`);

    const handleTouch = () => {
      if ('vibrate' in navigator) {
        navigator.vibrate(5); // Subtle vibration (5ms)
      }
    };

    buttons.forEach(button => {
      button.addEventListener('touchstart', handleTouch);
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('touchstart', handleTouch);
      });
    };
  }, [isMobile, activeTab]);

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

    setNotificationMessage(message);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
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
END:VCARD`;

    // Create a blob and download link
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${PROFILE_DATA.name.replace(' ', '_')}.vcf`;
    a.click();

    sendNotification('Contact saved to your device');
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${PROFILE_DATA.name} - ${PROFILE_DATA.title}`,
        text: `Connect with ${PROFILE_DATA.name}, ${PROFILE_DATA.title} at ${PROFILE_DATA.company}`,
        url: window.location.href,
      })
      .then(() => sendNotification('Thanks for sharing!'))
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
      LinkedIn: '💼 LinkedIn clicked'
    };
    sendNotification(messages[type] || `${type} clicked`);
  };

  const handlePayment = (method: string) => {
    setShowPaymentOptions(false);

    switch (method) {
      case 'venmo':
        window.open(`venmo://paycharge?txn=pay&recipients=${PROFILE_DATA.payment.venmo}`, '_blank');
        setTimeout(() => {
          window.open(`https://venmo.com/${PROFILE_DATA.payment.venmo}`, '_blank');
        }, 500);
        sendNotification('Venmo payment initiated');
        break;
      case 'paypal':
        window.open(`https://paypal.me/${PROFILE_DATA.payment.paypal}`, '_blank');
        sendNotification('PayPal payment initiated');
        break;
      case 'buy-coffee':
        window.open('https://www.buymeacoffee.com/zackhitchcock', '_blank');
        sendNotification('Coffee payment initiated');
        break;
      default:
        sendNotification(`${method} coming soon!`);
        break;
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleScheduleCall = (type: string) => {
    if (type === 'call') {
      window.open('https://calendly.com/zackhitchcock/30min', '_blank');
      sendNotification('Opening scheduling tool');
    } else {
      window.open('https://calendly.com/zackhitchcock/coffee', '_blank');
      sendNotification('Let\'s grab coffee soon!');
    }

    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        sendNotification(`${label} copied to clipboard`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if ('vibrate' in navigator) {
          navigator.vibrate([15, 30, 15]);
        }
      })
      .catch(() => {
        sendNotification('Failed to copy');
        setCopied(false);
      });
  };

  const activateAR = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 30, 30, 30, 100]);
    }

    setShowAR(true);
    sendNotification('🔮 AR mode activated');

    // In a real implementation, this would initialize AR.js or another AR library
    setTimeout(() => {
      setShowAR(false);
    }, 5000);
  };

  const getRealTimeAvailability = () => {
    // In a real app, this could check an API for real-time availability
    // For demo, we'll just toggle between available/busy
    setIsAvailable(!isAvailable);
    sendNotification(isAvailable ? '🔴 Status set to busy' : '🟢 Status set to available');
  };

  const generateQR = (value: string, title: string) => {
    setQrValue(value);
    setQrTitle(title);
    setShowQrCode(true);
  };

  const toggleARMode = () => {
    setShowARView(!showARView);
    if ('vibrate' in navigator) {
      navigator.vibrate([20, 40, 20]);
    }
  };

  const checkAvailability = () => {
    // This would ideally fetch real-time availability from an API
    sendNotification(PROFILE_DATA.availability.isBusy
      ? 'I\'m currently in a meeting or busy'
      : 'I\'m available now, feel free to reach out!');
  };

  // Card tilt effect calculation
  const getCardStyle = () => {
    if (isMobile) {
      return {
        transform: `rotateY(${tiltValues.x}deg) rotateX(${-tiltValues.y}deg)`,
      };
    }
    return {};
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
      <div ref={tiltWrapperRef} className={styles.tiltWrapper}>
        <div
          ref={cardRef}
          className={`${styles.card} ${(showPaymentOptions || showQrCode || showARView) ? styles.blurred : ''}`}
          style={getCardStyle()}
        >
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

          {/* Dark Mode Toggle */}
          <div className={styles.darkModeToggle} onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
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
                <span>{copied ? 'Copied!' : 'Copy'}</span>
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
                <span>Website QR</span>
              </div>
              {isMobile && (
                <div
                  className={styles.contactItem}
                  onClick={toggleARMode}
                >
                  <Box className={styles.icon} />
                  <span>View in AR</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className={styles.scheduleTab}>
              <div className={styles.availabilityBar}>
                <div className={`${styles.availabilityIndicator} ${isAvailable ? styles.isAvailable : styles.isBusy}`}>
                  <div className={styles.availabilityDot}></div>
                  <span>{isAvailable ? 'Available Now' : 'Currently Busy'}</span>
                </div>
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

          {/* Mobile Badge */}
          <div className={styles.mobileBadge}>
            <Smartphone size={12} />
            Mobile Optimized
          </div>
        </div>
      </div>

      {/* Payment Popup */}
      {showPaymentOptions && (
        <div className={styles.paymentPopup}>
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
              className={`${styles.paymentOption} ${styles.disabled}`}
            >
              <CreditCard className={styles.paymentIcon} />
              <div className={styles.disabledText}>
                <span>Card</span>
                <span className={styles.comingSoon}>Coming Soon</span>
              </div>
            </div>
          </div>

          <button
            className={styles.closeButton}
            onClick={() => setShowPaymentOptions(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* QR Code Popup */}
      {showQrCode && (
        <div className={styles.qrPopup}>
          <div className={styles.qrContent}>
            <h3>{qrTitle}</h3>
            <div className={styles.qrCodeContainer}>
              <QRCodeCanvas
                value={qrValue}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
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

      {/* AR View Overlay */}
      {showARView && (
        <div className={styles.arOverlay} onClick={() => setShowARView(false)}>
          <div className={styles.arContent} onClick={(e) => e.stopPropagation()}>
            <h3>AR Business Card</h3>
            <p>Experience your digital business card in augmented reality</p>

            <div className={styles.arCardPreview}>
              <div className={styles.arProfileImage}>
                <Image
                  src={PROFILE_DATA.photo}
                  alt={PROFILE_DATA.name}
                  width={60}
                  height={60}
                  className={styles.arProfileImg}
                />
              </div>
              <div className={styles.arInfo}>
                <h4>{PROFILE_DATA.name}</h4>
                <p>{PROFILE_DATA.title}</p>
              </div>
            </div>

            <p>Point your camera at a flat surface to place your business card in the real world</p>
            <button
              className={styles.closeButton}
              onClick={() => setShowARView(false)}
            >
              Close AR View
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`${styles.notification} ${showNotification ? styles.showNotification : ''}`}>
        <CheckCircle size={18} />
        {notificationMessage}
      </div>
    </div>
  );
}
