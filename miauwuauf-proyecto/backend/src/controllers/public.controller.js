const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findDogByQR = async (req, res) => {
  try {
    const collar = await prisma.collar.findUnique({
      where: { qrToken: req.params.qrToken },
      include: { dog: true },
    });

    if (!collar || !collar.dog)
      return res.status(404).json({ message: "QR inválido" });

    res.json({
      dog: collar.dog,
      serial: collar.serial,
    });
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const reportFoundDog = async (req, res) => {
  try {
    const { message, lat, lng } = req.body;

    const report = await prisma.foundReport.create({
      data: {
        qrToken: req.params.qrToken,
        message: message ?? null,
        lat: lat ?? null,
        lng: lng ?? null,
      },
    });

    res.status(201).json(report);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

module.exports = { findDogByQR, reportFoundDog };
