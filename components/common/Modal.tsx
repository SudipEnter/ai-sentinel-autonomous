import React, { Fragment } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  hasPadding?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, size = 'lg', hasPadding = true }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className={`relative bg-sentinel-bg-light border border-sentinel-border rounded-lg shadow-xl w-full ${sizeClasses[size]} mx-4`}>
        <div className="flex items-start justify-between p-4 border-b border-sentinel-border">
          <h3 className="text-lg font-semibold text-sentinel-text-primary" id="modal-title">
            {title}
          </h3>
          <button
            type="button"
            className="text-sentinel-text-secondary hover:text-sentinel-text-primary"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={hasPadding ? "p-6" : ""}>
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end p-4 border-t border-sentinel-border space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
