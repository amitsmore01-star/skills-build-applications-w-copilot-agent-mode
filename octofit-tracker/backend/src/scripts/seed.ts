import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        fitnessGoal: 'Improve endurance',
        level: 'Intermediate',
      },
      {
        name: 'Liam Patel',
        email: 'liam.patel@example.com',
        fitnessGoal: 'Build strength',
        level: 'Advanced',
      },
      {
        name: 'Sofia Alvarez',
        email: 'sofia.alvarez@example.com',
        fitnessGoal: 'Lose weight',
        level: 'Beginner',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Northwind Runners',
        sport: 'Running',
        members: users.slice(0, 2).map((user) => user.name),
      },
      {
        name: 'Peak Power Cyclists',
        sport: 'Cycling',
        members: [users[2].name],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 410,
        date: new Date('2026-07-21T07:30:00.000Z'),
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength Training',
        durationMinutes: 60,
        caloriesBurned: 520,
        date: new Date('2026-07-22T18:00:00.000Z'),
      },
      {
        userId: users[2]._id.toString(),
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        date: new Date('2026-07-23T06:45:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), name: users[0].name, score: 980, rank: 1 },
      { userId: users[1]._id.toString(), name: users[1].name, score: 945, rank: 2 },
      { userId: users[2]._id.toString(), name: users[2].name, score: 900, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: 'Tempo Run',
        difficulty: 'Intermediate',
        durationMinutes: 40,
        focus: 'Cardio',
      },
      {
        name: 'Core Circuit',
        difficulty: 'Beginner',
        durationMinutes: 25,
        focus: 'Core',
      },
      {
        name: 'Hill Intervals',
        difficulty: 'Advanced',
        durationMinutes: 35,
        focus: 'Endurance',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
