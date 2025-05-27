import React, { useState } from "react";

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
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        padding: "16px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#6a7285",
          borderRadius: "30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          width: "500px",
          padding: "24px 32px",
          color: "#000000",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "20px", color: "#c4c4c4" }}>
          Feedback Form
        </h2>

        {error && (
          <p style={{ color: "#f74464", marginBottom: "16px" }}>
            {error}
          </p>
        )}

        <label
          htmlFor="className"
          style={{ color: "#c4c4c4", marginBottom: "6px", fontWeight: "600" }}
        >
          Select Class
        </label>
        <select
          id="className"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #c4c4c4",
            fontSize: "1rem",
          }}
        >
          <option value="">-- Select Class --</option>
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <label
          htmlFor="subject"
          style={{ color: "#c4c4c4", marginBottom: "6px", fontWeight: "600" }}
        >
          Select Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #c4c4c4",
            fontSize: "1rem",
          }}
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

        <label
          htmlFor="feedback"
          style={{ color: "#c4c4c4", marginBottom: "6px", fontWeight: "600" }}
        >
          Feedback
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          placeholder="Write your feedback..."
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #c4c4c4",
            fontSize: "1rem",
            resize: "vertical",
          }}
        ></textarea>

        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
          aria-label="rating"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              style={{
                fontSize: "2rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: star <= rating ? "#f74464" : "#c4c4c4",
                margin: "0 4px",
              }}
              aria-label={`${star} star`}
            >
              ★
            </button>
          ))}
        </div>

        <label
          style={{ display: "flex", alignItems: "center", marginBottom: "20px", color: "#c4c4c4" }}
        >
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            style={{ marginRight: "10px" }}
          />
          Submit anonymously
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: "#f74464",
            color: "#000000",
            border: "none",
            borderRadius: "20px",
            padding: "10px 24px",
            fontSize: "1rem",
            cursor: "pointer",
            alignSelf: "center",
            width: "120px",
            fontWeight: "600",
            boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
