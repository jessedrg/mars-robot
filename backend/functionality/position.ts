import { PrismaClient } from '@prisma/client';
export const robotPositions = async (robots: any, x: number, y: number) => {
  const prisma = new PrismaClient();
  let positions: any = [];
  let counter = 0;
  for (let i = 0; i < robots.length; i++) {
    const val = robots[i];
    let robotX = parseInt(val.cordinates[0]);
    let robotY = parseInt(val.cordinates[1]);
    let lost1 = false;
    let pastX = 0;
    let pastY = 0;
    let orientation = val.instructions[0];
    for (let i = 1; i < val.instructions.length; i++) {
      if (lost1 === false) {
        if (orientation === 'N') {
          if (val.instructions[i] === 'L') {
            orientation = 'E';
          } else if (val.instructions[i] === 'R') {
            orientation = 'W';
          } else if (val.instructions[i] === 'F') {
            robotY = robotY + 1;
          }
        } else if (orientation === 'S') {
          if (val.instructions[i] === 'L') {
            orientation = 'W';
          } else if (val.instructions[i] === 'R') {
            orientation = 'E';
          } else if (val.instructions[i] === 'F') {
            robotY = robotY - 1;
          }
        } else if (orientation === 'E') {
          if (val.instructions[i] === 'L') {
            orientation = 'S';
          } else if (val.instructions[i] === 'R') {
            orientation = 'N';
          } else if (val.instructions[i] === 'F') {
            robotX = robotX - 1;
          }
        } else if (orientation === 'W') {
          if (val.instructions[i] === 'L') {
            orientation = 'N';
          } else if (val.instructions[i] === 'R') {
            orientation = 'S';
          } else if (val.instructions[i] === 'F') {
            robotX = robotX + 1;
          }
        }
        if (robotX > x || robotY > y || robotX < 0 || robotY < 0) {
          lost1 = true;
          const lost = await prisma.lostCordinates.findFirst({
            where: {
              x: robotX,
              y: robotY,
            },
          });
          if (lost !== null) {
            const entry = await positions.push({
              positions: { x: pastX, y: pastY, orientation: orientation },
              lost: false,
            });
          } else if (lost === null) {
            const entry = await prisma.lostCordinates.create({
              data: {
                x: robotX,
                y: robotY,
              },
            });
            await positions.push({
              positions: { x: robotX, y: robotY, orientation: orientation },
              lost: true,
            });
          }
        }

        pastX = robotX;
        pastY = robotY;
      }
    }
    if (
      robotX <= x &&
      robotY <= y &&
      positions.length < robots.length &&
      lost1 === false
    ) {
      await positions.push({
        positions: { x: robotX, y: robotY, orientation: orientation },
        lost: false,
      });
    }
  }
  return positions;
};
