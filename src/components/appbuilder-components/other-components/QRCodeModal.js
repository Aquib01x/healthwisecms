import React from 'react';
import QRCode from 'qrcode.react';
import './QRCodeModal.css';

/**
 * Displays a modal with a QR code for previewing the app on mobile devices.
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.showQRModal - Controls the visibility of the QR code modal.
 * @param {Function} props.toggleQRModal - Function to toggle the QR code modal's visibility.
 * @param {string} props.appId - The ID of the app to be viewed
 */
const QRCodeModal = ({ showQRModal, toggleQRModal, appId }) => {
  if (!showQRModal) return null;
  //URL of the app, all apps are found at the "mobile/{appId}" path
  const appUrl = `https://devweb2023.cis.strath.ac.uk/~fqb19176/healthwisecms/build/index.html#/mobile/${appId}`;
  return (
    <div className="modal">
      <div>
        <span onClick={toggleQRModal}>&times;</span>
        <h2>Scan QR Code to Preview</h2>
        <QRCode value={appUrl} size={256} level={"H"} includeMargin={true} />
        <p>Scan this QR code with your mobile device to preview the app.</p>
      </div>
    </div>
  );
};

export default QRCodeModal;