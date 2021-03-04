import {
  appName, appDescription, appVersion, appEnv
} from '../config/app';

export const indexPage = (req, res) => res.status(200).json({
  name: appName,
  version: appVersion,
  description: appDescription,
  environment: appEnv,
  status: 'UP'
});
