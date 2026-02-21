import { db, drivers, fuelLogs, maintenanceLogs, roles, trips, users, vehicles } from "./index.js";

function assertDefined<T>(value: T | undefined, name: string): T {
  if (value === undefined) {
    throw new Error(`Expected ${name} to be defined`);
  }
  return value;
}

async function seed() {
  console.log("Seeding database...");

  await db.delete(fuelLogs);
  await db.delete(maintenanceLogs);
  await db.delete(trips);
  await db.delete(drivers);
  await db.delete(vehicles);
  await db.delete(users);
  await db.delete(roles);

  const seededRoles = await db
    .insert(roles)
    .values([
      { name: "admin", description: "Administrator with full access" },
      {
        name: "fleet_manager",
        description: "Fleet manager with operational access",
      },
      { name: "driver", description: "Driver with limited access" },
    ])
    .returning();
  const role1 = assertDefined(seededRoles[0], "role1");
  const role2 = assertDefined(seededRoles[1], "role2");
  console.log("Created roles:", role1.id, role2.id);

  const seededUsers = await db
    .insert(users)
    .values([
      {
        roleId: role1.id,
        username: "admin",
        passwordHash: "hashed_password_admin",
        fullName: "System Admin",
        email: "admin@fleetflow.com",
        phone: "+1234567890",
      },
      {
        roleId: role2.id,
        username: "fleet_manager",
        passwordHash: "hashed_password_manager",
        fullName: "Fleet Manager",
        email: "manager@fleetflow.com",
        phone: "+1234567891",
      },
    ])
    .returning();
  const user1 = assertDefined(seededUsers[0], "user1");
  const user2 = assertDefined(seededUsers[1], "user2");
  console.log("Created users:", user1.id, user2.id);

  const seededVehicles = await db
    .insert(vehicles)
    .values([
      {
        nameModel: "Volvo FH16",
        licensePlate: "ABC-1234",
        maxCapacity: "25000.00",
        currentOdometer: 150000,
        status: "available",
        acquisitionCost: "150000.00",
      },
      {
        nameModel: "Scania R500",
        licensePlate: "XYZ-5678",
        maxCapacity: "30000.00",
        currentOdometer: 85000,
        status: "on_trip",
        acquisitionCost: "180000.00",
      },
      {
        nameModel: "Mercedes Actros",
        licensePlate: "DEF-9012",
        maxCapacity: "28000.00",
        currentOdometer: 200000,
        status: "in_shop",
        acquisitionCost: "165000.00",
      },
    ])
    .returning();
  const vehicle1 = assertDefined(seededVehicles[0], "vehicle1");
  const vehicle2 = assertDefined(seededVehicles[1], "vehicle2");
  const vehicle3 = assertDefined(seededVehicles[2], "vehicle3");
  console.log("Created vehicles:", vehicle1.id, vehicle2.id, vehicle3.id);

  const seededDrivers = await db
    .insert(drivers)
    .values([
      {
        fullName: "John Smith",
        licenseCategory: "CE",
        licenseExpiry: new Date("2026-05-15"),
        safetyScore: "4.85",
        status: "off_duty",
      },
      {
        fullName: "Maria Garcia",
        licenseCategory: "CE",
        licenseExpiry: new Date("2025-11-20"),
        safetyScore: "4.92",
        status: "on_trip",
      },
      {
        fullName: "Bob Johnson",
        licenseCategory: "C",
        licenseExpiry: new Date("2027-02-10"),
        safetyScore: "4.50",
        status: "on_duty",
      },
    ])
    .returning();
  const driver1 = assertDefined(seededDrivers[0], "driver1");
  const driver2 = assertDefined(seededDrivers[1], "driver2");
  const driver3 = assertDefined(seededDrivers[2], "driver3");
  console.log("Created drivers:", driver1.id, driver2.id, driver3.id);

  const seededTrips = await db
    .insert(trips)
    .values([
      {
        vehicleId: vehicle2.id,
        driverId: driver2.id,
        cargoWeight: "18000.00",
        startOdometer: 85000,
        status: "dispatched",
        revenue: "5500.00",
      },
      {
        vehicleId: vehicle1.id,
        driverId: driver1.id,
        cargoWeight: "22000.00",
        startOdometer: 150000,
        endOdometer: 150450,
        status: "completed",
        revenue: "4200.00",
      },
    ])
    .returning();
  const trip1 = assertDefined(seededTrips[0], "trip1");
  const trip2 = assertDefined(seededTrips[1], "trip2");
  console.log("Created trips:", trip1.id, trip2.id);

  await db.insert(fuelLogs).values([
    {
      vehicleId: vehicle1.id,
      tripId: trip2.id,
      liters: "350.00",
      cost: "525.00",
      logDate: new Date("2026-02-18"),
    },
    {
      vehicleId: vehicle2.id,
      tripId: trip1.id,
      liters: "280.00",
      cost: "420.00",
      logDate: new Date("2026-02-19"),
    },
    {
      vehicleId: vehicle3.id,
      liters: "400.00",
      cost: "600.00",
      logDate: new Date("2026-02-15"),
    },
  ]);
  console.log("Created fuel logs");

  await db.insert(maintenanceLogs).values([
    {
      vehicleId: vehicle3.id,
      serviceType: "Engine Overhaul",
      cost: "8500.00",
      serviceDate: new Date("2026-02-20"),
    },
    {
      vehicleId: vehicle1.id,
      serviceType: "Oil Change",
      cost: "350.00",
      serviceDate: new Date("2026-02-10"),
    },
    {
      vehicleId: vehicle2.id,
      serviceType: "Tire Replacement",
      cost: "2200.00",
      serviceDate: new Date("2026-02-05"),
    },
  ]);
  console.log("Created maintenance logs");

  console.log("Seeding completed!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
