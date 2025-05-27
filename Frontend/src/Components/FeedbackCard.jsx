import React from 'react';

const FeedbackCard = ({ feedback }) => {
  const { title, description, status } = feedback;

  return (
    <div className="bg-bg-light-gray border border-card-border-gray rounded-custom p-5 mb-4 shadow-custom-light">
      <h3 className="text-title-navy-blue text-xl font-semibold mb-2">{title}</h3>
      <p className="text-desc-steel-blue mb-3">{description}</p>
      <span className="font-bold text-status-coral-pink mb-4 inline-block">{status}</span>
      <div className="flex gap-3">
        <button className="bg-btn-open-bg text-btn-text-light px-4 py-2 rounded-md hover:opacity-90 transition">
          Open
        </button>
        <button className="bg-btn-download-bg text-btn-text-light px-4 py-2 rounded-md hover:opacity-90 transition">
          Download
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
