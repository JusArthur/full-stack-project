import { Request, Response, NextFunction } from "express";

export function validateCurrentOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { customerName, pickupNotes, items } = req.body;

  if (typeof customerName !== "string") {
    return res.status(400).json({
      error: "customerName must be a string",
    });
  }

  if (typeof pickupNotes !== "string") {
    return res.status(400).json({
      error: "pickupNotes must be a string",
    });
  }

  if (!Array.isArray(items)) {
    return res.status(400).json({
      error: "items must be an array",
    });
  }

  for (const item of items) {
    if (typeof item !== "object" || item === null) {
      return res.status(400).json({
        error: "Each item must be an object",
      });
    }

    if (typeof item.menuItemId !== "number") {
      return res.status(400).json({
        error: "Each item must include a numeric menuItemId",
      });
    }

    if (typeof item.name !== "string") {
      return res.status(400).json({
        error: "Each item must include a string name",
      });
    }

    if (typeof item.price !== "number") {
      return res.status(400).json({
        error: "Each item must include a numeric price",
      });
    }
  }

  next();
}