/*
  # Initial Schema for StressLess App

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `name` (text)
      - `pseudonym` (text, optional)
      - `avatar` (text)
      - `mood` (enum: positive, neutral, negative)
      - `stress_type` (enum: fatigue, anxiety, overwhelm, general)
      - `music_preference` (enum: nature, classical, ambient, none)
      - `level` (integer, default 1)
      - `xp` (integer, default 0)
      - `streak_days` (integer, default 0)
      - `calm_points` (integer, default 0)
      - `subscription_plan` (enum: free, premium, pro)
      - `subscription_status` (enum: active, inactive, cancelled)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `tasks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `subject` (text)
      - `due_date` (date)
      - `priority` (enum: high, medium, low)
      - `estimated_time` (integer, minutes)
      - `completed` (boolean, default false)
      - `created_at` (timestamp)
    
    - `mood_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `date` (date)
      - `mood` (integer, 1-10)
      - `stress_level` (integer, 1-10)
      - `notes` (text, optional)
      - `created_at` (timestamp)
    
    - `calm_notes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `text` (text)
      - `color` (text)
      - `category` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create custom types
CREATE TYPE mood_type AS ENUM ('positive', 'neutral', 'negative');
CREATE TYPE stress_type AS ENUM ('fatigue', 'anxiety', 'overwhelm', 'general');
CREATE TYPE music_preference AS ENUM ('nature', 'classical', 'ambient', 'none');
CREATE TYPE priority_type AS ENUM ('high', 'medium', 'low');
CREATE TYPE subscription_plan AS ENUM ('free', 'premium', 'pro');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL DEFAULT '',
  pseudonym text,
  avatar text NOT NULL DEFAULT '🧑‍🎓',
  mood mood_type NOT NULL DEFAULT 'neutral',
  stress_type stress_type NOT NULL DEFAULT 'general',
  music_preference music_preference NOT NULL DEFAULT 'none',
  level integer NOT NULL DEFAULT 1,
  xp integer NOT NULL DEFAULT 0,
  streak_days integer NOT NULL DEFAULT 0,
  calm_points integer NOT NULL DEFAULT 0,
  subscription_plan subscription_plan NOT NULL DEFAULT 'free',
  subscription_status subscription_status NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  subject text NOT NULL,
  due_date date NOT NULL,
  priority priority_type NOT NULL DEFAULT 'medium',
  estimated_time integer NOT NULL DEFAULT 60,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Mood entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  mood integer NOT NULL CHECK (mood >= 1 AND mood <= 10),
  stress_level integer NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Calm notes table
CREATE TABLE IF NOT EXISTS calm_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text text NOT NULL,
  color text NOT NULL DEFAULT 'blue',
  category text NOT NULL DEFAULT 'libre',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE calm_notes ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Tasks policies
CREATE POLICY "Users can manage own tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Mood entries policies
CREATE POLICY "Users can manage own mood entries"
  ON mood_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Calm notes policies
CREATE POLICY "Users can manage own calm notes"
  ON calm_notes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();