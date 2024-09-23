import { prismaClient } from '@src/core/config/database';

export const getActivesBoxCut = async () => {
  const boxCut = await prismaClient.boxCut.findMany({
    where: {
      active: true,
    },
  });

  return boxCut;
};

export const createBoxCut = async (userId: number, cashFund: number) => {
  const boxCut = await prismaClient.boxCut.create({
    data: {
      cashFund,
      userId,
    },
  });

  return boxCut;
};

export const completeBoxCut = async (id:number,boxCut:any) => {

  const mapTips = boxCut.tips.map((tip:any) => {
    return {
      ...tip,
      userId: Number(boxCut.userId),
      amount: Number(tip.amount),
    };
  })

  const mapBoxOut = boxCut.outs.map((box:any) => {
    return {
      ...box,
      userId: Number(boxCut.userId),
      amount: Number(box.amount),
    };
  })
  
  const boxCutCompleted = await prismaClient.boxCut.update({
    where: {
      id: id,
    },
    data: {
      card: Number(boxCut.card),
      cash: Number(boxCut.cash),
      cashUSD: Number(boxCut.cashUSD),
      btc: Number(boxCut.btc),
      image: boxCut.image,
      tips: {
        create: mapTips,
      },
      boxOut: {
        create: mapBoxOut,
      },
      status: 'completed',
    },
  });

  return boxCutCompleted;
}
