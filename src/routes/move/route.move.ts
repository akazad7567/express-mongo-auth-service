import express from 'express';

import { ConfigService } from '../../services/service.config';
import { ServiceDataHandler } from '../../services/files/service.dataHandler';

const config = ConfigService.getInstance().getConfig();
const dataHandler = ServiceDataHandler.getInstance();
const moveRoutes = express.Router();

moveRoutes.post('/save', (req, res, next) => {
  const state = req.body.data;
  console.log(state);

  dataHandler.writeData(JSON.stringify(state)).then((saveRes) => {
    res.send(saveRes);
  });
});

moveRoutes.get('/get', (req, res, next) => {
  dataHandler.getData().then((data) => {
    res.send(data);
  });
});

export = moveRoutes;
