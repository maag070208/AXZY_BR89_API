import { Request, Response } from 'express';
import { completeBoxCut, createBoxCut, getActivesBoxCut } from './boxcut.service';

export const getBoxCut = async (req: Request, res: Response) => {
  const resbox = await getActivesBoxCut();
  res.status(200).json(resbox);
};

export const openTurn = async (req: Request, res: Response) => {
  const { userId, cashFund } = req.body;
  const resbox = await createBoxCut(Number(userId), Number(cashFund));
  res.status(200).json(resbox);
};

export const closeTurn = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  const resbox = await completeBoxCut(Number(id), body);
  res.status(200).json(resbox);
}
