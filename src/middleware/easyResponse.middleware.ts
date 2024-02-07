
export const easyResponse = async (
    req: any,
    res: any,
    next: any
  ): Promise<void> => {
    res.ok = (data: any) => {
      res.status(200);
      res.json(data);
      return;
    };

    res.badRequest = (error: any) => {
      res.status(400);
      res.json(error);
      return;
    };

    res.unauthorized = (error: any) => {
      res.status(401);
      res.json(error);
      return;
    };

    return next();
  };
