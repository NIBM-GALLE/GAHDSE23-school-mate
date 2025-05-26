const Announcement = require('../models/Announcement');

// f1: Create Announcement
exports.createAnnouncement = async (req, res) => {
  const { title, message, type, audience } = req.body;

  try {
    const announcement = new Announcement({
      title,
      message,
      type,
      audience,
      createdBy: req.user.id
    });

    const saved = await announcement.save();
    res.status(201).json({ msg: 'Announcement published', announcement: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f2: Read All Announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('createdBy', 'name email');
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f3: Update Announcement
exports.updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, message, type, audience } = req.body;

  try {
    const updated = await Announcement.findByIdAndUpdate(
      id,
      { title, message, type, audience },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: 'Announcement not found' });

    res.status(200).json({ msg: 'Announcement updated', announcement: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f4: Delete Announcement
exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ msg: 'Announcement not found' });

    res.status(200).json({ msg: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f5: Search by Date
exports.searchByDate = async (req, res) => {
  const { date } = req.query; // expected format: YYYY-MM-DD

  try {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const announcements = await Announcement.find({
      date: { $gte: start, $lte: end }
    });

    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f6: Search by Audience
exports.searchByAudience = async (req, res) => {
  const { audience } = req.query;

  try {
    const announcements = await Announcement.find({ audience });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f7: Get Announcement by ID
exports.getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findById(id).populate('createdBy', 'name email'); // Populate createdBy with selected fields

    if (!announcement) return res.status(404).json({ msg: 'Announcement not found' });

    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
