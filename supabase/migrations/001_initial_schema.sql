-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create personality_types table
CREATE TABLE IF NOT EXISTS personality_types (
  type_number INTEGER PRIMARY KEY CHECK (type_number >= 1 AND type_number <= 9),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  strengths TEXT NOT NULL,
  growth_areas TEXT NOT NULL,
  characteristics JSONB NOT NULL DEFAULT '{}'
);

-- Create test_results table
CREATE TABLE IF NOT EXISTS test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  answers INTEGER[] NOT NULL,
  personality_type INTEGER NOT NULL REFERENCES personality_types(type_number),
  scores JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  article_id UUID REFERENCES articles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE personality_types ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for test_results
CREATE POLICY "Users can view own test results" ON test_results
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert test results" ON test_results
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- RLS Policies for articles (public read)
CREATE POLICY "Anyone can view published articles" ON articles
  FOR SELECT USING (published = true);

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- RLS Policies for personality_types (public read)
CREATE POLICY "Anyone can view personality types" ON personality_types
  FOR SELECT USING (true);

-- RLS Policies for bookmarks
CREATE POLICY "Users can view own bookmarks" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON personality_types TO anon, authenticated;
GRANT SELECT ON articles TO anon, authenticated;
GRANT SELECT ON categories TO anon, authenticated;
GRANT SELECT, INSERT ON test_results TO anon, authenticated;
GRANT ALL PRIVILEGES ON profiles TO authenticated;
GRANT ALL PRIVILEGES ON bookmarks TO authenticated;

-- Insert initial personality types data
INSERT INTO personality_types (type_number, title, description, strengths, growth_areas, characteristics) VALUES
(1, 'The Perfectionist', 'Principled, purposeful, self-controlled, and perfectionistic', 'Idealistic, principled, orderly, hardworking', 'Criticism, impatience, rigidity', '{"core_motivation": "To be good, right, and perfect", "basic_fear": "Being corrupt, evil, or defective"}'),
(2, 'The Helper', 'Generous, demonstrative, people-pleasing, and possessive', 'Caring, interpersonal, generous, people-pleasing', 'Pride, flattery, manipulation', '{"core_motivation": "To feel loved", "basic_fear": "Being unloved or unwanted"}'),
(3, 'The Achiever', 'Adaptive, excelling, driven, and image-conscious', 'Adaptable, driven, ambitious, energetic', 'Vanity, deception, workaholism', '{"core_motivation": "To feel valuable and worthwhile", "basic_fear": "Being worthless or without value"}'),
(4, 'The Individualist', 'Expressive, dramatic, self-absorbed, and temperamental', 'Expressive, dramatic, self-aware, sensitive', 'Envy, melancholy, self-absorption', '{"core_motivation": "To find themselves and their significance", "basic_fear": "Having no identity or personal significance"}'),
(5, 'The Investigator', 'Perceptive, innovative, secretive, and isolated', 'Perceptive, innovative, objective, curious', 'Avarice, stinginess, isolation', '{"core_motivation": "To be capable and competent", "basic_fear": "Being useless, helpless, or incapable"}'),
(6, 'The Loyalist', 'Engaging, responsible, anxious, and suspicious', 'Engaging, responsible, committed, practical', 'Anxiety, suspicion, reactivity', '{"core_motivation": "To have security and support", "basic_fear": "Being without support or guidance"}'),
(7, 'The Enthusiast', 'Spontaneous, versatile, acquisitive, and scattered', 'Spontaneous, versatile, optimistic, playful', 'Gluttony, impulsiveness, superficiality', '{"core_motivation": "To maintain happiness and satisfaction", "basic_fear": "Being trapped in pain or deprivation"}'),
(8, 'The Challenger', 'Self-confident, decisive, willful, and confrontational', 'Self-confident, decisive, protective, resourceful', 'Lust, vengeance, domination', '{"core_motivation": "To be self-reliant and in control", "basic_fear": "Being controlled or vulnerable"}'),
(9, 'The Peacemaker', 'Receptive, reassuring, complacent, and resigned', 'Receptive, reassuring, supportive, harmonious', 'Sloth, stubbornness, complacency', '{"core_motivation": "To maintain inner and outer peace", "basic_fear": "Loss of connection and fragmentation"}');

-- Insert initial categories
INSERT INTO categories (name, slug, description) VALUES
('Personality Types', 'personality-types', 'Articles about the nine personality types'),
('Self-Development', 'self-development', 'Personal growth and development articles'),
('Relationships', 'relationships', 'Understanding relationships through the Enneagram'),
('Workplace', 'workplace', 'Applying Enneagram in professional settings');

-- Insert sample articles
INSERT INTO articles (title, slug, content, excerpt, category_id, published) VALUES
('Understanding Type 1: The Perfectionist', 'understanding-type-1-perfectionist', 'Type 1 personalities are driven by a desire to be good, right, and perfect...', 'Learn about the core motivations and characteristics of Type 1 personalities.', (SELECT id FROM categories WHERE slug = 'personality-types'), true),
('How to Grow as a Type 2', 'how-to-grow-type-2', 'Type 2 personalities can grow by learning to recognize their own needs...', 'Growth strategies specifically designed for Type 2 personalities.', (SELECT id FROM categories WHERE slug = 'self-development'), true),
('Enneagram in Relationships', 'enneagram-relationships', 'Understanding your partner''s Enneagram type can transform your relationship...', 'Discover how the Enneagram can improve your relationships.', (SELECT id FROM categories WHERE slug = 'relationships'), true);

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();