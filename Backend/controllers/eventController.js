const Event = require('../models/Event');

const eventController = {
  // Create event
  async create(req, res) {
    try {
      const eventData = { ...req.body, createdBy: req.user?.id };
      const event = new Event(eventData);
      await event.save();
      await event.populate('createdBy', 'firstName lastName');
      res.status(201).json({ message: 'Event created', data: event });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all events
  async getAll(req, res) {
    try {
      const { eventType, date } = req.query;
      const filter = {};
      if (eventType) filter.eventType = eventType;
      if (date) filter.date = new Date(date);

      const events = await Event.find(filter)
        .populate('createdBy', 'firstName lastName')
        .populate('participants.userId', 'firstName lastName email role');
      
      res.json({ data: events });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get by ID
  async getById(req, res) {
    try {
      const event = await Event.findById(req.params.id)
        .populate('createdBy', 'firstName lastName')
        .populate('participants.userId', 'firstName lastName email role');
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json({ data: event });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update event
  async update(req, res) {
    try {
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate(['createdBy', 'participants.userId']);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json({ message: 'Event updated', data: event });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete event
  async delete(req, res) {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get participants
  async getParticipants(req, res) {
    try {
      const { eventId } = req.params;
      
      const event = await Event.findById(eventId)
        .populate('participants.userId', 'firstName lastName email role');
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json({ data: event.participants });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = eventController;