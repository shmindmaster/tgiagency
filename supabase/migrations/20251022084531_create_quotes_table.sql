/*
  # Create Quotes Table

  1. New Tables
    - `quotes`
      - `id` (uuid, primary key) - Unique identifier for each quote request
      - `insurance_type` (text) - Type of insurance requested
      - `first_name` (text) - Customer's first name
      - `last_name` (text) - Customer's last name
      - `email` (text) - Customer's email address
      - `phone` (text) - Customer's phone number
      - `address` (text) - Street address
      - `city` (text) - City name
      - `state` (text) - State abbreviation
      - `zip_code` (text) - ZIP postal code
      - `property_type` (text, optional) - Type of property for home/renters insurance
      - `year_built` (text, optional) - Year property was built
      - `vehicle_make` (text, optional) - Vehicle manufacturer
      - `vehicle_model` (text, optional) - Vehicle model name
      - `vehicle_year` (text, optional) - Vehicle year
      - `business_type` (text, optional) - Type of business
      - `employee_count` (text, optional) - Number of employees
      - `annual_revenue` (text, optional) - Annual business revenue range
      - `coverage_amount` (text, optional) - Desired coverage amount
      - `deductible` (text, optional) - Preferred deductible amount
      - `start_date` (text, optional) - Desired policy start date
      - `additional_notes` (text, optional) - Additional customer notes or questions
      - `status` (text) - Quote request status (default: 'pending')
      - `created_at` (timestamptz) - Timestamp when quote was submitted
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `quotes` table
    - Add policy for inserting new quotes (public access for form submissions)
    - Add policy for authenticated users to read all quotes (for admin/staff access)
*/

CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  insurance_type text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  property_type text,
  year_built text,
  vehicle_make text,
  vehicle_model text,
  vehicle_year text,
  business_type text,
  employee_count text,
  annual_revenue text,
  coverage_amount text,
  deductible text,
  start_date text,
  additional_notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quotes"
  ON quotes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all quotes"
  ON quotes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update quotes"
  ON quotes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
