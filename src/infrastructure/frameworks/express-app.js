import express from "express";

export default (routes) => {
    const app = express();
    app.use(express.json());
    app.use("/api/users", routes);

    return app;
};
