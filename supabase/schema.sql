-- ============================================
-- AeroGuardian AI – Supabase Database Schema
-- ============================================
-- Copy this ENTIRE script and paste it in:
-- Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================

-- 1. User Profiles Table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'pilot' CHECK (role IN ('pilot', 'admin', 'operator')),
  organization TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Flights Table
CREATE TABLE IF NOT EXISTS public.flights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  flight_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT DEFAULT 'en-route' CHECK (status IN ('en-route', 'landed', 'delayed', 'emergency')),
  risk_score NUMERIC(5,2) DEFAULT 0,
  altitude NUMERIC(10,2),
  airspeed NUMERIC(10,2),
  lat NUMERIC(10,6),
  lng NUMERIC(10,6),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Telemetry Data Table
CREATE TABLE IF NOT EXISTS public.telemetry (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  flight_id UUID REFERENCES public.flights(id) ON DELETE CASCADE,
  engine_temp NUMERIC(8,2),
  fuel_consumption NUMERIC(8,2),
  altitude NUMERIC(10,2),
  airspeed NUMERIC(8,2),
  weather_risk NUMERIC(4,3),
  vibration NUMERIC(4,3),
  oil_pressure NUMERIC(6,2),
  cabin_pressure NUMERIC(4,2),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Anomaly Alerts Table
CREATE TABLE IF NOT EXISTS public.anomaly_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  flight_id UUID REFERENCES public.flights(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('engine_temp', 'altitude', 'fuel', 'vibration', 'weather')),
  severity TEXT NOT NULL CHECK (severity IN ('warning', 'critical')),
  message TEXT NOT NULL,
  value NUMERIC(10,2),
  threshold NUMERIC(10,2),
  acknowledged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Emergency Recommendations Table
CREATE TABLE IF NOT EXISTS public.emergency_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  flight_id UUID REFERENCES public.flights(id) ON DELETE CASCADE,
  risk_score NUMERIC(5,2),
  nearest_airport_code TEXT,
  nearest_airport_name TEXT,
  distance_nm NUMERIC(8,2),
  heading NUMERIC(5,2),
  actions JSONB,
  estimated_time_min INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Airports Reference Table
CREATE TABLE IF NOT EXISTS public.airports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  lat NUMERIC(10,6) NOT NULL,
  lng NUMERIC(10,6) NOT NULL,
  runway_length INTEGER,
  elevation INTEGER,
  country TEXT
);

-- ============================================
-- INSERT Default Airport Data
-- ============================================
INSERT INTO public.airports (name, code, lat, lng, runway_length, elevation, country) VALUES
  ('Los Angeles International', 'LAX', 33.9425, -118.4081, 12091, 125, 'US'),
  ('San Francisco International', 'SFO', 37.6213, -122.3790, 11870, 13, 'US'),
  ('Denver International', 'DEN', 39.8561, -104.6737, 16000, 5431, 'US'),
  ('Chicago O''Hare', 'ORD', 41.9742, -87.9073, 13000, 680, 'US'),
  ('Dallas/Fort Worth', 'DFW', 32.8998, -97.0403, 13401, 607, 'US'),
  ('John F. Kennedy', 'JFK', 40.6413, -73.7781, 14572, 13, 'US'),
  ('Seattle-Tacoma', 'SEA', 47.4502, -122.3088, 11901, 433, 'US'),
  ('Phoenix Sky Harbor', 'PHX', 33.4373, -112.0078, 11489, 1135, 'US'),
  ('Miami International', 'MIA', 25.7959, -80.2870, 13016, 8, 'US'),
  ('Atlanta Hartsfield', 'ATL', 33.6407, -84.4277, 12390, 1026, 'US'),
  ('London Heathrow', 'LHR', 51.4700, -0.4543, 12799, 83, 'UK'),
  ('Tokyo Narita', 'NRT', 35.7647, 140.3864, 13123, 141, 'JP'),
  ('Dubai International', 'DXB', 25.2532, 55.3657, 14764, 62, 'AE'),
  ('Singapore Changi', 'SIN', 1.3502, 103.9944, 13123, 22, 'SG')
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anomaly_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.airports ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own profile
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Flights: Users can CRUD their own flights
CREATE POLICY "Users can read own flights" ON public.flights
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flights" ON public.flights
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flights" ON public.flights
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flights" ON public.flights
  FOR DELETE USING (auth.uid() = user_id);

-- Telemetry: Access through flight ownership
CREATE POLICY "Users can read telemetry for own flights" ON public.telemetry
  FOR SELECT USING (
    flight_id IN (SELECT id FROM public.flights WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert telemetry for own flights" ON public.telemetry
  FOR INSERT WITH CHECK (
    flight_id IN (SELECT id FROM public.flights WHERE user_id = auth.uid())
  );

-- Anomaly Alerts: Users can read their own alerts
CREATE POLICY "Users can read own alerts" ON public.anomaly_alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own alerts" ON public.anomaly_alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts" ON public.anomaly_alerts
  FOR UPDATE USING (auth.uid() = user_id);

-- Emergency Recommendations: Access through flights
CREATE POLICY "Users can read emergency recs for own flights" ON public.emergency_recommendations
  FOR SELECT USING (
    flight_id IN (SELECT id FROM public.flights WHERE user_id = auth.uid())
  );

-- Airports: Everyone can read (public data)
CREATE POLICY "Anyone can read airports" ON public.airports
  FOR SELECT USING (true);

-- ============================================
-- AUTO-CREATE PROFILE on Signup (Trigger)
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Updated_at Auto-update Trigger
-- ============================================
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();

CREATE TRIGGER update_flights_modtime
  BEFORE UPDATE ON public.flights
  FOR EACH ROW EXECUTE FUNCTION public.update_modified_column();
