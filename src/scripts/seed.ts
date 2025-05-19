import cuid from "cuid";
import readline from "readline/promises";
import { stdin, stdout } from "process";
import { execSync } from "child_process";

import client from "@/databases/prisma"
import { oneWayEncrypt, encrypt } from "@/services/encryptionServices";

async function seed() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    // Emmits a warning to the user before proceeding with the database deletion.
    console.warn("WARNING: the seed will delete ALL existing data and reseed the database!");
    const confirmation = await rl.question("Do you want to proceed? (y/n): ");

    if(confirmation.toLowerCase() !== 'y') {
      console.log("Seed cancelled.")
      return;
    }
    
    console.log("Initializing database seed...");

    console.log("Deleting all registers...");

    // Delete all registers related to user first, then delete all users.
    execSync("npx prisma migrate reset --force", { stdio: "inherit" })

    console.log("Creating default user 'testesilvasauro@email.com'...");

    // Create user first, then it's registered passwords.
    const userId = cuid();
    const password = "123456"

    await client.users.create({
      data: {
        id: userId,
        email: "testesilvasauro@email.com",
        password: oneWayEncrypt(password),
      },
    });

    //* ALWAYS encrypt all passwords and sensitive information (card number, security code, etc)
    await client.credentials.createMany({
      data: [
        {
          id: cuid(),
          title: "Github",
          url: "www.github.com",
          username: "testessauro13",
          password: encrypt("jack"),
          userId,
        },
        {
          id: cuid(),
          title: "Youtube",
          url: "www.youtube.com",
          username: "testesilvasauro@email.com",
          password: encrypt("abc123"),
          userId,
        },
        {
          id: cuid(),
          title: "LinkedIn",
          url: "www.linkedin.com",
          username: "testesilvasauro@email.com",
          password: encrypt("AAAAA"),
          userId,
        },
      ],
    });

    await client.wifis.createMany({
      data: [
        {
          id: cuid(),
          title: "Wifi do vizinho",
          name: "virus-gratis",
          password: encrypt("abcdef"),
          userId,
        },
        {
          id: cuid(),
          title: "Starbucks",
          name: "StarbucksAdm-0012",
          password: encrypt("starbonks0012"),
          userId,
        },
      ],
    });

    await client.cards.create({
      data: {
        id: cuid(),
        title: "Cartão do irmão",
        number: encrypt("4002892212345678"),
        securityCode: encrypt("456"),
        expirationDate: encrypt("12/54"),
        password: encrypt("9876"),
        isVirtual: false,
        type: "CREDIT",
        userId,
      },
    });

    console.log("User 'testesilvasauro@gmail.com' created sucessfully!");
  } catch (err) {
    console.error("An error occured during database seed...");
    console.error(err);
    
    console.warn("Resetting database for precaution...");
    execSync("npx prisma migrate reset --force");

    return -1
  }

  return 0;
}

seed();
