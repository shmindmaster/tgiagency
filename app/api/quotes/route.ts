import { quoteSubmissionSchema } from '@/lib/validations';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

// Rate limiting store (in-memory, resets on server restart)
// For production, consider Redis or a database-backed solution
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 5;

function getRateLimitKey(ip: string): string {
  return `ratelimit:${ip}`;
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // New window or expired window
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    const rateLimitResult = checkRateLimit(ip);
    if (!rateLimitResult.allowed) {
      const retryAfter = rateLimitResult.resetTime
        ? Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        : 3600;

      return NextResponse.json(
        {
          success: false,
          error: 'Too many quote requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Check honeypot (anti-spam measure)
    if (body.honeypot && body.honeypot.trim() !== '') {
      // Silently reject spam (don't reveal honeypot detection)
      return NextResponse.json(
        { success: true, message: 'Quote request submitted successfully' },
        { status: 200 }
      );
    }

    // Validate request data with Zod
    const validatedData = quoteSubmissionSchema.parse(body);

    // Initialize Supabase client with service role key for server-side operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    const { data, error: dbError } = await supabase
      .from('quotes')
      .insert([
        {
          insurance_type: validatedData.insuranceType,
          first_name: validatedData.firstName,
          last_name: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          address: validatedData.address,
          city: validatedData.city,
          state: validatedData.state,
          zip_code: validatedData.zipCode,
          property_type: validatedData.propertyType,
          year_built: validatedData.yearBuilt,
          vehicle_make: validatedData.vehicleMake,
          vehicle_model: validatedData.vehicleModel,
          vehicle_year: validatedData.vehicleYear,
          business_type: validatedData.businessType,
          employee_count: validatedData.employeeCount,
          annual_revenue: validatedData.annualRevenue,
          coverage_amount: validatedData.coverageAmount,
          deductible: validatedData.deductible,
          start_date: validatedData.startDate,
          additional_notes: validatedData.additionalNotes,
          consent: validatedData.consent,
        },
      ])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save quote request. Please try again.',
        },
        { status: 500 }
      );
    }

    // Optional: Send webhook notification
    if (process.env.QUOTE_WEBHOOK_URL) {
      try {
        await fetch(process.env.QUOTE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'quote_submitted',
            timestamp: new Date().toISOString(),
            data: validatedData,
          }),
        });
      } catch (webhookError) {
        // Log but don't fail the request if webhook fails
        console.error('Webhook error:', webhookError);
      }
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Quote request submitted successfully',
        data: { id: data?.[0]?.id },
      },
      { status: 201 }
    );

  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Quote submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const allowedOrigin = process.env.ALLOWED_CORS_ORIGIN || request.headers.get('origin') || '*';

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
