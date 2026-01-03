-- Add balance column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'accounts' AND column_name = 'balance') THEN
        ALTER TABLE accounts ADD COLUMN balance numeric(12,2) DEFAULT 0 NOT NULL;
    END IF;
END $$;

-- Function to update account balance
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT
    IF (TG_OP = 'INSERT') THEN
        IF NEW.account_id IS NOT NULL THEN
            UPDATE accounts
            SET balance = balance + CASE WHEN NEW.type = 'income' THEN NEW.amount ELSE -NEW.amount END
            WHERE id = NEW.account_id;
        END IF;
    
    -- Handle UPDATE
    ELSIF (TG_OP = 'UPDATE') THEN
        -- 1. Revert old balance (if old.account_id existed)
        IF OLD.account_id IS NOT NULL THEN
            UPDATE accounts
            SET balance = balance - CASE WHEN OLD.type = 'income' THEN OLD.amount ELSE -OLD.amount END
            WHERE id = OLD.account_id;
        END IF;
        
        -- 2. Apply new balance (if new.account_id exists)
        IF NEW.account_id IS NOT NULL THEN
            UPDATE accounts
            SET balance = balance + CASE WHEN NEW.type = 'income' THEN NEW.amount ELSE -NEW.amount END
            WHERE id = NEW.account_id;
        END IF;
        
    -- Handle DELETE
    ELSIF (TG_OP = 'DELETE') THEN
        IF OLD.account_id IS NOT NULL THEN
            UPDATE accounts
            SET balance = balance - CASE WHEN OLD.type = 'income' THEN OLD.amount ELSE -OLD.amount END
            WHERE id = OLD.account_id;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS tr_update_account_balance ON transactions;
CREATE TRIGGER tr_update_account_balance
AFTER INSERT OR UPDATE OR DELETE ON transactions
FOR EACH ROW EXECUTE FUNCTION update_account_balance();

-- Recalculate all balances once to ensure they are in sync
UPDATE accounts a
SET balance = (
    SELECT COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE -t.amount END), 0)
    FROM transactions t
    WHERE t.account_id = a.id
);
