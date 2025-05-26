const TimetableCard = ({ timetable, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">
            {typeof timetable.moduleId === 'object' ? timetable.moduleId.name : timetable.moduleId}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(timetable)}
            className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(timetable._id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(timetable.date)}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{timetable.startTime} - {timetable.endTime}</span>
        </div>
        
        {timetable.note && (
          <div className="bg-gray-50 rounded-lg p-3 mt-3">
            <p className="text-sm text-gray-700">{timetable.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};