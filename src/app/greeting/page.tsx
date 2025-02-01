'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Phone, Mail, Globe, Linkedin, Download, Share2, Crown, CreditCard, DollarSign } from 'lucide-react';
import styles from './greeting.module.css';

// Set to true to disable notifications during development
const TESTING_MODE = true;

export default function Greeting() {
  const [isMobile, setIsMobile] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    setIsMobile('share' in navigator);
    sendNotification('📱 Page visited');
    loadPhoto();
  }, []);

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

  const sendNotification = async (message: string) => {
    if (TESTING_MODE) {
      console.log('Testing mode - notification suppressed:', message);
      return;
    }

    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: message }),
      });
    } catch (error) {
      // Silently fail in production
    }
  };

  const handleSaveContact = async () => {
    const photoString = photoData ? `
PHOTO;ENCODING=b;TYPE=JPEG:${photoData}` : '';

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Zack Hitchcock
N:Hitchcock;Zack;;;
TITLE:Software Engineer${photoString}
TEL:+16175865962
EMAIL:zack@hitchcode.net
URL:https://hitchcode.com
URL;type=LinkedIn:www.linkedin.com/in/zack-hitchcock-17841a219/
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'zack-hitchcock.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    await sendNotification('💾 Contact saved');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Zack Hitchcock',
          text: 'Connect with Zack Hitchcock - Software Engineer',
          url: window.location.href,
        });
        await sendNotification('✨ Contact shared');
      } catch (error) {
        // Silently ignore share cancellations
      }
    }
  };

  const handleContactClick = async (type: string) => {
    const messages = {
      Phone: '📞 Phone number clicked',
      Email: '📧 Email clicked',
      Website: '🌐 Website clicked',
      LinkedIn: '💼 LinkedIn clicked'
    };
    await sendNotification(messages[type as keyof typeof messages]);
  };

  const handlePayment = async (method: string) => {
    setShowPaymentOptions(false);

    switch (method) {
      case 'venmo':
        window.location.href = 'https://venmo.com/code?user_id=2307831361437696227&created=1738446665.6013&printed=1';
        await sendNotification('💸 Venmo payment initiated');
        break;
      case 'paypal':
        // Check if user is on mobile
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobileDevice) {
          window.location.href = 'https://www.paypal.com/qrcodes/p2pqrc/9A93YHT7DDLFY';
        } else {
          window.location.href = 'https://paypal.me/hitchcockzack';
        }
        await sendNotification('💰 PayPal payment initiated');
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.imageWrapper}>
            <Image
              src="/zack.png"
              alt="Zack Hitchcock"
              width={180}
              height={180}
              className={styles.profileImage}
              priority
            />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.name}>Zack Hitchcock</h1>
            <div className={styles.titleWrapper}>
              <p className={styles.title}>Software Engineer</p>
              <div className={styles.company}>
                <Crown className={styles.buildingIcon} />
                <span>hitchcode</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contactGrid}>
          <a
            href="tel:+16175865962"
            className={styles.contactItem}
            onClick={() => handleContactClick('Phone')}
          >
            <Phone className={styles.icon} />
            <span>Call</span>
          </a>
          <a
            href="mailto:zack@hitchcode.net"
            className={styles.contactItem}
            onClick={() => handleContactClick('Email')}
          >
            <Mail className={styles.icon} />
            <span>Email</span>
          </a>
          <a
            href="https://hitchcode.net"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
            onClick={() => handleContactClick('Website')}
          >
            <Globe className={styles.icon} />
            <span>Website</span>
          </a>
          <a
            href="https://www.linkedin.com/in/zack-hitchcock-17841a219/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
            onClick={() => handleContactClick('LinkedIn')}
          >
            <Linkedin className={styles.icon} />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className={styles.actions}>
          <button onClick={handleSaveContact} className={`${styles.button} ${styles.primary}`}>
            <Download className={styles.buttonIcon} />
            Save Contact
          </button>

          {isMobile && (
            <button onClick={handleShare} className={`${styles.button} ${styles.secondary}`}>
              <Share2 className={styles.buttonIcon} />
              Share
            </button>
          )}

          <button
            onClick={() => setShowPaymentOptions(true)}
            className={`${styles.button} ${styles.secondary}`}
          >
            <DollarSign className={styles.buttonIcon} />
            Pay
          </button>
        </div>

        {showPaymentOptions && (
          <div className={styles.paymentPopup}>
            <div className={styles.paymentOptions}>
              <button
                onClick={() => handlePayment('venmo')}
                className={styles.paymentOption}
              >
                <img src="/venmo.svg" alt="Venmo" className={styles.paymentIcon} />
                Venmo
              </button>
              <button
                onClick={() => handlePayment('paypal')}
                className={styles.paymentOption}
              >
                <img src="/paypal.svg" alt="PayPal" className={styles.paymentIcon} />
                PayPal
              </button>
              <button
                className={`${styles.paymentOption} ${styles.disabled}`}
                disabled
              >
                <CreditCard className={styles.paymentIcon} />
                <div className={styles.disabledText}>
                  <span>Card</span>
                  <span className={styles.comingSoon}>coming soon</span>
                </div>
              </button>
            </div>
            <button
              onClick={() => setShowPaymentOptions(false)}
              className={styles.closeButton}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
