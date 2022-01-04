import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validInstructions } from './valid-instructions';
import { robot } from '../interfaces/robots';
export const validateFilterInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let robotObject: robot = {
    rectangleCordinates: 0,
    robots: [],
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send(errors);
  }
  const { input } = req.body;
  const notWhite = input.replace(/\s/g, '');
  const inputArray = notWhite.match(/[a-z]+|[^a-z]+/gi);
  if (inputArray.length % 2 !== 0) {
    res.status(400).send({ msg: 'invalid string' });
  }
  for (let i = 0; i < inputArray.length; i = i + 2) {
    if (i == 0) {
      if (inputArray[0].length !== 4) {
        res.send({ msg: 'invalid cordinates' });
      }
      const position = inputArray[0].split('');
      const rectangleCordinates = parseInt(position[0] + position[1]);
      const firstRobotCordniates = [position[2], position[3]];
      inputArray[1].split('').forEach((val: string) => {
        const filtered = validInstructions.filter((filterval) => {
          return filterval === val;
        });
        if (filtered.length === 0) {
          res.send({ msg: 'invalid cordinate' });
        }
      });
      robotObject['rectangleCordinates'] = rectangleCordinates;
      robotObject.robots.push({
        cordinates: firstRobotCordniates,
        instructions: inputArray[1].split(''),
      });
    } else {
      if (inputArray[i].length !== 2) {
        res.send({ msg: 'invalid cordinates' });
      }
      inputArray[i - 1].split('').forEach((val: string) => {
        const filtered = validInstructions.filter((filterval) => {
          return filterval === val;
        });

        if (filtered.length === 0) {
          res.send({ msg: 'invalid cordinate' });
        }
      });
      const position = inputArray[i].split('');
      robotObject.robots.push({
        cordinates: position,
        instructions: inputArray[i - 1].split(''),
      });
    }
  }

  req.body.filteredInformation = robotObject;

  next();
};
