const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createEvent = async (req, res) => {
  try {
    const { title, description, location, startsAt } = req.body;

    const event = await prisma.event.create({
      data: { title, description, location, startsAt: new Date(startsAt) },
    });

    res.status(201).json(event);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startsAt: "asc" },
    });
    res.json(events);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
    });

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

module.exports = { createEvent, getEvents, getEventById };
