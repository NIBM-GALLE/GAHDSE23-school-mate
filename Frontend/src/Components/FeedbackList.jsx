// FeedbackList.jsx
const FeedbackList = ({ feedbacks, teacherClass, teacherSubject }) => {
  const filtered = feedbacks.filter(fb => 
    fb.className === teacherClass && fb.subject.includes(teacherSubject)
  );

  return (
    <div className="space-y-4">
      {filtered.length === 0 ? (
        <p>No feedback available for your class/subject.</p>
      ) : (
        filtered.map((fb, i) => (
          <div key={i} className="p-4 border rounded shadow">
            <p className="font-semibold">{fb.anonymous ? 'Anonymous' : 'Student'}</p>
            <p>Rating: {fb.rating} ⭐</p>
            <p>{fb.feedback}</p>
          </div>
        ))
      )}
    </div>
  );
};
