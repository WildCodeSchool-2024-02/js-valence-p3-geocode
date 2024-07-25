const { faker } = require("@faker-js/faker");
const fs = require("fs");

const escapeString = (str) => {
  str.replace(/'/g, "''");
};

const generateSQLInsertStatements = (count) => {
  let sql = `
    CREATE SCHEMA IF NOT EXISTS geocode;
    CREATE TABLE IF NOT EXISTS geocode."user" (
      user_id SERIAL PRIMARY KEY,
      role VARCHAR(20),
      gender VARCHAR(10),
      firstName VARCHAR(50),
      lastName VARCHAR(50),
      birthDate DATE,
      postalCode VARCHAR(20),
      email VARCHAR(100) UNIQUE,
      city VARCHAR(100),
      password VARCHAR(100)
    );

    INSERT INTO geocode."user" (role, gender, firstName, lastName, birthDate, postalCode, email, city, password) VALUES\n`;

  for (let i = 0; i < count; i += 1) {
    const user = {
      role: escapeString(faker.helpers.arrayElement(["User"])),
      gender: escapeString(faker.helpers.arrayElement(["Male", "Female"])),
      firstName: escapeString(faker.person.firstName()),
      lastName: escapeString(faker.person.lastName()),
      birthDate: faker.date
        .past({ years: 30, refDate: new Date("2000-01-01") })
        .toISOString()
        .split("T")[0],
      postalCode: escapeString(faker.location.zipCode()),
      email: escapeString(faker.internet.email()),
      city: escapeString(faker.location.city()),
      password: escapeString(faker.internet.password()),
    };

    sql += `('${user.role}', '${user.gender}', '${user.firstName}', '${user.lastName}', '${user.birthDate}', '${user.postalCode}', '${user.email}', '${user.city}', '${user.password}')`;

    if (i < count - 1) {
      sql += ",\n";
    } else {
      sql += ";\n";
    }
  }

  return sql;
};

const sql = generateSQLInsertStatements(100);
fs.writeFileSync("seed-users.sql", sql);

console.info("SQL seed script generated: seed-users.sql");
