import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_ROSTERCHOUINARD!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_ROSTERCHOUINARD!

export const supabase = createClient(supabaseUrl, supabaseKey)
