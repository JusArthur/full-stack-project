import express from "express";
import cors from "cors";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import communityPostRoutes from "./routes/communityPostRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow all origins in production serverless environment, restrict to localhost in dev
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? "*" : "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/communityPosts", communityPostRoutes);
// Vercel serverless functions do not use app.listen.
// We only start the server manually if we are running locally.
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Back-end server running on port http://localhost:${PORT}`);
  });
}

// Export the app for Vercel's serverless Node builder
export default app;
