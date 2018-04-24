import express from "express";
import unitRoutes from "./home/unit.route";

const api = express.Router();

api.use("/unit", unitRoutes);

export default api;