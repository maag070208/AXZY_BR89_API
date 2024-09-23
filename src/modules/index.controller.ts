import { createTResult } from '@src/core/mappers/tresult.mapper';
import path from 'path';
import { Request, Response } from 'express';
import { getConfig } from '@src/core/utils/config';

export const helloWorld = async (req: Request, res: Response) => {
  res.json(
    createTResult({
      message: 'Hello World',
    }),
  );
};

export const upload = async (req: Request, res: Response) => {
  try {
    console.log('req.files', req.files);
    const { file } = req.files as any;
    console.log('image', file);
    if (!file) {
      console.log('No se ha seleccionado un archivo');
      return res
        .status(400)
        .json({ error: 'No se ha seleccionado un archivo' });
    }

    const { mimetype } = file;

    if (!mimetype.includes('image')) {
      console.log('El archivo seleccionado no es una imagen');
      return res
        .status(400)
        .json({ error: 'El archivo seleccionado no es una imagen' });
    }

    const { name } = file;

    const nameSplit = name.split('.');
    const extension = nameSplit[nameSplit.length - 1];

    const validExtensions = ['png', 'jpg', 'jpeg'];

    if (!validExtensions.includes(extension)) {
      console.log('El archivo seleccionado no es una imagen');
      return res
        .status(400)
        .json({ error: 'El archivo seleccionado no es una imagen' });
    }

    const fileName = `${new Date().getTime()}.${extension}`;

    const uploadPath = path.join(__dirname, `../../public/${fileName}`);
    file.mv(uploadPath, (err: any) => {
      if (err) {
        return res.status(500).json({ error: 'Error al subir el archivo' });
      }
      const base_serve = getConfig('SERVE');
      res.json({
        message: 'Archivo subido correctamente',
        fileName: `${base_serve}/${fileName}`,
      });
    });
  } catch (error) {
    console.log('error', error);
    res.status(400).json({ error });
  }
};
