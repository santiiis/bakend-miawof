const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createDog = async (req, res) => {
  try {
    const { name, breed, ageYears } = req.body;
    if (!name) return res.status(400).json({ message: "name is required" });

    const dog = await prisma.dog.create({
      data: {
        name,
        breed: breed ?? null,
        ageYears: typeof ageYears === "number" ? ageYears : null,
      },
    });

    res.status(201).json(dog);
  } catch (error) {
    console.error("ERROR REAL:", error);
    res.status(500).json({
      message: "Error interno",
      error: error.message
    });
  }
};


const getDogs = async (req, res) => {
  try {
    const dogs = await prisma.dog.findMany({
      include: { collar: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(dogs);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const getDogById = async (req, res) => {
  try {
    const dog = await prisma.dog.findUnique({
      where: { id: req.params.id },
      include: { collar: true },
    });

    if (!dog) return res.status(404).json({ message: "Dog not found" });

    res.json(dog);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const getLastLocation = async (req, res) => {
  try {
    const dog = await prisma.dog.findUnique({
      where: { id: req.params.id },
      include: { collar: true },
    });

    if (!dog || !dog.collar)
      return res.status(404).json({ message: "Dog or collar not found" });

    const last = await prisma.locationPing.findFirst({
      where: { collarId: dog.collar.id },
      orderBy: { timestamp: "desc" },
    });

    res.json(last);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const addVaccination = async (req, res) => {
  try {
    const { vaccineId, appliedAt, nextDueAt, notes } = req.body;

    const record = await prisma.vaccinationRecord.create({
      data: {
        dogId: req.params.id,
        vaccineId,
        appliedAt: new Date(appliedAt),
        nextDueAt: nextDueAt ? new Date(nextDueAt) : null,
        notes: notes ?? null,
      },
      include: { vaccine: true },
    });

    res.status(201).json(record);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

const getVaccinations = async (req, res) => {
  try {
    const records = await prisma.vaccinationRecord.findMany({
      where: { dogId: req.params.id },
      include: { vaccine: true },
      orderBy: { appliedAt: "desc" },
    });

    res.json(records);
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

module.exports = {
  createDog,
  getDogs,
  getDogById,
  getLastLocation,
  addVaccination,
  getVaccinations,
};
