import React, { useEffect, useRef, useState } from 'react';
import { Camera, ArrowLeft } from 'lucide-react';
import styles from '../greeting3.module.css';

// Define the profile type for proper type-checking
type ProfileType = {
  name: string;
  title: string;
  company: string;
  photo: string;
  contact: {
    phone: string;
    email: string;
    website: string;
    linkedin: string;
  }
};

interface ARViewProps {
  profile: ProfileType;
  onClose: () => void;
}

export default function ARView({ profile, onClose }: ARViewProps) {
  console.log("ARView component mounted");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isARSupported, setIsARSupported] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const animationRef = useRef<number | null>(null);
  const [profileImage, setProfileImage] = useState<HTMLImageElement | null>(null);

  // Load profile image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = profile.photo;
    img.onload = () => setProfileImage(img);
    img.onerror = () => console.error("Failed to load profile image");
  }, [profile.photo]);

  useEffect(() => {
    console.log("ARView camera initialization effect running");
    // Check for AR/camera compatibility
    const checkARSupport = () => {
      console.log("Checking AR support, navigator.mediaDevices:", !!navigator.mediaDevices);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("AR not supported - missing mediaDevices API");
        setIsARSupported(false);
        setErrorMessage('AR is not supported in this browser');
        return false;
      }
      return true;
    };

    // Initialize AR experience if supported
    const startAR = async () => {
      if (!checkARSupport()) return;

      try {
        console.log("Requesting camera access...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        console.log("Camera access granted!");

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraActive(true);
          console.log("Video element initialized");

          // Start rendering AR content once video is playing
          videoRef.current.onloadedmetadata = () => {
            console.log("Video metadata loaded, starting AR rendering");
            startARRendering();
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setIsARSupported(false);
        setErrorMessage('Could not access camera. Please grant camera permissions.');
      }
    };

    // Clean up function
    const stopAR = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      setIsCameraActive(false);
    };

    startAR();

    // Clean up on component unmount
    return () => {
      stopAR();
    };
  }, []);

  // Function to start AR rendering loop
  const startARRendering = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Animation loop for AR rendering
    const render = () => {
      if (!ctx || !videoRef.current || !canvasRef.current) return;

      // Draw the video frame first
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Draw the AR business card overlay
      drawBusinessCard(ctx, canvas.width, canvas.height);

      // Continue animation loop
      animationRef.current = requestAnimationFrame(render);
    };

    render();
  };

  // Draw the AR business card overlay on the canvas
  const drawBusinessCard = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Calculate card position (center of screen, slightly tilted)
    const cardWidth = width * 0.8;  // 80% of screen width
    const cardHeight = cardWidth * 0.6;  // business card proportions
    const x = (width - cardWidth) / 2;
    const y = (height - cardHeight) / 2;

    // Save current context state
    ctx.save();

    // Apply 3D perspective transform
    ctx.translate(x + cardWidth/2, y + cardHeight/2);
    ctx.rotate(Math.PI * 0.05); // Slight rotation
    ctx.translate(-(x + cardWidth/2), -(y + cardHeight/2));

    // Draw card background with gradient
    const gradient = ctx.createLinearGradient(x, y, x + cardWidth, y + cardHeight);
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#1a1a1a');

    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.fillRect(x, y, cardWidth, cardHeight);

    // Add a border glow effect
    ctx.strokeStyle = '#7367f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, cardWidth, cardHeight);

    // Draw profile photo if loaded
    const photoSize = cardHeight * 0.5;
    const photoX = x + cardWidth * 0.15;
    const photoY = y + (cardHeight - photoSize) / 2;

    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    if (profileImage) {
      // Draw circular photo with clipping
      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(profileImage, photoX, photoY, photoSize, photoSize);
      ctx.restore();

      // Draw circle for profile image border
      ctx.beginPath();
      ctx.arc(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 0, Math.PI * 2);
      ctx.strokeStyle = '#7367f0';
      ctx.lineWidth = 3;
      ctx.stroke();
    } else {
      // Draw placeholder circle if image not loaded
      ctx.beginPath();
      ctx.arc(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 0, Math.PI * 2);
      ctx.strokeStyle = '#7367f0';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Add text content
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${cardHeight * 0.1}px Arial`;
    ctx.fillText(profile.name, x + cardWidth * 0.4, y + cardHeight * 0.3);

    ctx.fillStyle = '#cccccc';
    ctx.font = `${cardHeight * 0.08}px Arial`;
    ctx.fillText(profile.title, x + cardWidth * 0.4, y + cardHeight * 0.45);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = `${cardHeight * 0.07}px Arial`;
    ctx.fillText(profile.company, x + cardWidth * 0.4, y + cardHeight * 0.6);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = `${cardHeight * 0.06}px Arial`;
    ctx.fillText(profile.contact.email, x + cardWidth * 0.4, y + cardHeight * 0.75);

    // Restore context state
    ctx.restore();
  };

  return (
    <div className={styles.arContainer}>
      {!isARSupported ? (
        <div className={styles.arErrorMessage}>
          <p>{errorMessage || 'AR view is not supported on your device'}</p>
          <button onClick={onClose} className={styles.arBackButton}>
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className={styles.arVideo}
            playsInline
            muted
          />

          <canvas
            ref={canvasRef}
            className={styles.arCanvas}
          />

          <button onClick={onClose} className={styles.arBackButton}>
            <ArrowLeft size={18} />
            Exit AR View
          </button>

          {!isCameraActive && (
            <div className={styles.arLoading}>
              <p>Starting camera...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
