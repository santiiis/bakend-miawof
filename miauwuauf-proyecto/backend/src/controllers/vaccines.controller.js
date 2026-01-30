const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createVaccine = async (req, res) => {
  try {
    const { name, description } = req.body;

    const vaccine = await prisma.vaccine.create({
      data: { name, description: description ?? null },
    });

    res.status(201).json(vaccine);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const getVaccines = async (req, res) => {
  try {
    const vaccines = await prisma.vaccine.findMany({
      orderBy: { name: "asc" },
    });

    res.json(vaccines);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

module.exports = { createVaccine, getVaccines };
