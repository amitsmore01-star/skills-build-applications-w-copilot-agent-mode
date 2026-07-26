"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const router = (0, express_1.Router)();
router.get('/api/users', async (_req, res) => {
    const users = await user_1.User.find().sort({ createdAt: -1 });
    res.json(users);
});
router.get('/api/teams', async (_req, res) => {
    const teams = await team_1.Team.find().sort({ createdAt: -1 });
    res.json(teams);
});
router.get('/api/activities', async (_req, res) => {
    const activities = await activity_1.Activity.find().sort({ date: -1 });
    res.json(activities);
});
router.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find().sort({ rank: 1 });
    res.json(leaderboard);
});
router.get('/api/workouts', async (_req, res) => {
    const workouts = await workout_1.Workout.find().sort({ createdAt: -1 });
    res.json(workouts);
});
exports.default = router;
