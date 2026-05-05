import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://hfbygjlpnjyzrwyzsffq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmYnlnamxwbmp5enJ3eXpzZmZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MjUwMjIsImV4cCI6MjA5MzUwMTAyMn0.EtToW8fYW7NnDBoTeVRmKC5ZcRyrgmiI6fENhQZn-og'
)
