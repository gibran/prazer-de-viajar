import { Router } from "express";

export default (userController) => {
    const router = Router();

    router.post("/", (req, res) => userController.createUser(req, res));
    router.get("/", (req, res) => userController.listUsers(req, res));
    router.get("/:email", (req, res) => userController.getUserByEmail(req, res));
    router.delete("/:email", (req, res) => userController.deleteUserByEmail(req, res));

    return router;
};
