import React, { useState } from 'react';

const classOptions = ['12A', '12B', '12C', '12D', '13A', '13B', '13C', '13D'];

const subjectsByStream = {
  Science: ['Biology', 'Chemistry', 'Physics', 'Applied Mathematics', 'Pure Mathematics', 'Agriculture'],
  Commerce: ['Business Studies', 'Political Science', 'Accounting', 'Economics'],
  Arts: ['History', 'Sinhala', 'Tamil', 'English', 'Geography', 'Logic'],
};

const FeedbackForm = ({ onSubmit }) => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!className || !subject || feedback.trim().length < 10 || rating < 1) {
      setError('All fields must be filled correctly.');
      return;
    }
    setError('');
    const feedbackData = {
      className,
      subject,
      feedback: feedback.trim(),
      rating,
      anonymous,
      date: new Date().toISOString(),
    };
    onSubmit(feedbackData);
    setClassName('');
    setSubject('');
    setFeedback('');
    setRating(0);
    setAnonymous(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Student Feedback Form</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <label className="block mb-2 font-medium">Select Class</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      >
        <option value="">-- Select Class --</option>
        {classOptions.map((cls) => (
          <option key={cls} value={cls}>{cls}</option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Select Subject</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">-- Select Subject --</option>
        {Object.entries(subjectsByStream).map(([stream, subjects]) => (
          <optgroup label={stream} key={stream}>
            {subjects.map((sub) => (
              <option key={sub} value={`${stream} - ${sub}`}>{sub}</option>
            ))}
          </optgroup>
        ))}
      </select>

      <label className="block mb-2 font-medium">Feedback</label>
      <textarea
        className="w-full mb-4 p-2 border rounded"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={4}
        placeholder="Write your feedback..."
      ></textarea>

      <label className="block mb-2 font-medium">Rating</label>
      <div className="flex items-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>

      <label className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
        />
        <span>Submit anonymously</span>
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;