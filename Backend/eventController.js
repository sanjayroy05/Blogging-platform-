// backend/controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
        const { title, type, description, location, startDate, endDate } = req.body;
        const event = await Event.create({ title, type, description, location, startDate, endDate, createdBy: req.user.id });
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name email role').sort({ createdAt: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if(!event) return res.status(404).json({ msg: 'Event not found' });
        if(event.createdBy.toString() !== req.user.id && req.user.role !== 'faculty') return res.status(403).json({ msg: 'Unauthorized' });

        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if(!event) return res.status(404).json({ msg: 'Event not found' });
        if(event.createdBy.toString() !== req.user.id && req.user.role !== 'faculty') return res.status(403).json({ msg: 'Unauthorized' });

        await event.remove();
        res.json({ msg: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
