'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Phone, Mail, Globe, Linkedin, Download, Share2 } from 'lucide-react';
import styles from './greeting.module.css';

// Set to true to disable notifications during development
const TESTING_MODE = false;

export default function Greeting() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('share' in navigator);
    sendNotification('📱 Page visited');
  }, []);

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
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Zack Hitchcock
N:Hitchcock;Zack;;;
TITLE:Software Engineer
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
            <p className={styles.title}>Software Engineer</p>
          </div>
        </div>

        <div className={styles.contactInfo}>
          <a
            href="tel:+16175865962"
            className={styles.contactItem}
            onClick={() => handleContactClick('Phone')}
          >
            <Phone className={styles.icon} />
            <span>(617) 586-5962</span>
          </a>
          <a
            href="mailto:zack@hitchcode.net"
            className={styles.contactItem}
            onClick={() => handleContactClick('Email')}
          >
            <Mail className={styles.icon} />
            <span>zack@hitchcode.net</span>
          </a>
          <a
            href="https://hitchcode.net"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
            onClick={() => handleContactClick('Website')}
          >
            <Globe className={styles.icon} />
            <span>hitchcode.net</span>
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
        </div>
      </div>
    </div>
  );
}
