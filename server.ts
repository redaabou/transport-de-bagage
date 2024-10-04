import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./src/routes/auth";
import transportRoutes from "./src/routes/transportRoute";
import offerRoutes from "./src/routes/offers";
import reviewRoutes from "./src/routes/reviews";
import { errorHandler } from "./src/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/transports", transportRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});