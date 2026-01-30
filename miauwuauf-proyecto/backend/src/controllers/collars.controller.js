const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

const createCollar = async (req, res) => {
  try {
    const { serial } = req.body;
    if (!serial) return res.status(400).json({ message: "serial required" });

    const qrToken = crypto.randomBytes(16).toString("hex");

    const collar = await prisma.collar.create({
      data: { serial, qrToken },
    });

    res.status(201).json(collar);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const linkCollar = async (req, res) => {
  try {
    const { serial, dogId } = req.body;

    const updated = await prisma.collar.update({
      where: { serial },
      data: { dogId },
    });

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const pingCollar = async (req, res) => {
  try {
    const { lat, lng, accuracy } = req.body;

    const collar = await prisma.collar.findUnique({
      where: { serial: req.params.serial },
    });

    if (!collar || !collar.isActive)
      return res.status(404).json({ message: "Collar not found" });

    const ping = await prisma.locationPing.create({
      data: {
        collarId: collar.id,
        lat,
        lng,
        accuracy: accuracy ?? null,
      },
    });

    res.status(201).json(ping);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

module.exports = { createCollar, linkCollar, pingCollar };
