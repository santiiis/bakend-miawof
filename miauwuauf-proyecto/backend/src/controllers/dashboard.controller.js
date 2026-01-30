const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getDashboardDog = async (req, res) => {
  try {
    const dog = await prisma.dog.findUnique({
      where: { id: req.params.id },
      include: { collar: true },
    });

    if (!dog) return res.status(404).json({ message: "Dog not found" });

    const vaccinations = await prisma.vaccinationRecord.findMany({
      where: { dogId: dog.id },
      include: { vaccine: true },
    });

    res.json({ dog, vaccinations });
  } catch {
    res.status(500).json({ message: "Error interno" });
  }
};

module.exports = { getDashboardDog };
