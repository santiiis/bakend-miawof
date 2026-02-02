const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
 GET /api/pets
*/
exports.getPets = async (req, res) => {
  try {
    const dogs = await prisma.dog.findMany({
      include: {
        collar: true,
        vaccinations: {
          include: {
            vaccine: true
          },
          orderBy: {
            appliedAt: "desc"
          }
        }
      }
    });

    const result = dogs.map(d => {
      const last = d.vaccinations[0];

      return {
        id: d.id,
        name: d.name,
        breed: d.breed,
        ageYears: d.ageYears,
        collarSerial: d.collar?.serial || null,
        lastVaccine: last?.vaccine?.name || null,
        lastVaccineDate: last?.appliedAt || null,
        nextVaccineDate: last?.nextDueAt || null
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error pets" });
  }
};

/*
 GET /api/vaccinations
*/
exports.getVaccinations = async (req, res) => {
  try {
    const records = await prisma.vaccinationRecord.findMany({
      include: {
        dog: true,
        vaccine: true
      },
      orderBy: {
        appliedAt: "desc"
      }
    });

    const result = records.map(r => ({
      id: r.id,
      dogId: r.dogId,
      dogName: r.dog.name,
      vaccine: r.vaccine.name,
      appliedAt: r.appliedAt,
      nextDueAt: r.nextDueAt,
      notes: r.notes
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error vaccinations" });
  }
};

/*
 GET /api/events
*/
exports.getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        startsAt: "asc"
      }
    });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error events" });
  }
};

/*
 GET /api/collars
*/
exports.getCollars = async (req, res) => {
  try {
    const collars = await prisma.collar.findMany({
      include: {
        dog: true,
        pings: {
          orderBy: {
            timestamp: "desc"
          },
          take: 1
        }
      }
    });

    const result = collars.map(c => {
      const lastPing = c.pings[0];

      return {
        id: c.id,
        serial: c.serial,
        dogId: c.dogId,
        dogName: c.dog?.name || null,
        lat: lastPing?.lat || null,
        lng: lastPing?.lng || null,
        timestamp: lastPing?.timestamp || null,
        isActive: c.isActive
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error collars" });
  }
};
