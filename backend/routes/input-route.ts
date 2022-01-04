import express, { Request, Response } from 'express';
import { validateFilterInput } from '../middlewares/validate-filter-input';
import { check, validationResult } from 'express-validator';
import { isConstructorDeclaration } from 'typescript';
import { robotPositions } from '../functionality/position';
import { PrismaClient } from '@prisma/client';

export const app = express.Router();
const prisma = new PrismaClient();
app.post(
  '/input',
  [check('input', 'must be a string').isString()],
  validateFilterInput,
  async (req: Request, res: Response) => {
    const positions: any = [];
    const { robots, rectangleCordinates } = req.body.filteredInformation;
    const x = parseInt(String(rectangleCordinates).charAt(0));
    const y = parseInt(String(rectangleCordinates).charAt(1));
    const result = await robotPositions(robots, x, y);
    res.send(result);
  }
);

app.get('/lost-robots', async (req: Request, res: Response) => {
  const lostRobots = await prisma.lostCordinates.findMany();
  res.send(lostRobots);
});
