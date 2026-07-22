// Validation middleware. Parses and replaces req.body/query/params with the
// validated (and coerced) values, or forwards a ZodError to the error handler.
import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';

type Schemas = {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
};

export function validate(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query)
        Object.assign(req.query, schemas.query.parse(req.query));
      if (schemas.params)
        Object.assign(req.params, schemas.params.parse(req.params));
      next();
    } catch (err) {
      next(err);
    }
  };
}
