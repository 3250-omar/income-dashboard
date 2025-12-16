-- Create table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text CHECK (type IN ('income', 'expense')) NOT NULL,
  amount numeric(12,2) NOT NULL,
  category text,
  description text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy
CREATE POLICY "Users manage their transactions"
ON transactions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Index
CREATE INDEX idx_transactions_user_date
ON transactions (user_id, date);

-- RPC function
CREATE FUNCTION get_financial_summary()
RETURNS TABLE (income numeric, expenses numeric)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0)
  FROM transactions
  WHERE user_id = auth.uid();
$$;
