import { Router } from 'express';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';

const router = Router();

router.get('/api/users', async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

router.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().sort({ createdAt: -1 });
  res.json(teams);
});

router.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().sort({ date: -1 });
  res.json(activities);
});

router.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
  res.json(leaderboard);
});

router.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.json(workouts);
});

export default router;
