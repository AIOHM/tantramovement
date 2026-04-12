-- Create consultation_requests table for discovery call bookings
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  timezone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a consultation request
CREATE POLICY "Anyone can submit consultation requests"
ON public.consultation_requests
FOR INSERT
WITH CHECK (true);

-- Authenticated users can view consultation requests
CREATE POLICY "Authenticated users can view consultation requests"
ON public.consultation_requests
FOR SELECT
USING (true);

-- Authenticated users can update consultation requests
CREATE POLICY "Authenticated users can update consultation requests"
ON public.consultation_requests
FOR UPDATE
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultation_requests_updated_at
BEFORE UPDATE ON public.consultation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();