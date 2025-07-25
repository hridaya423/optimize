import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId parameter is required' }, { status: 400 });
  }

  if (!userId.match(/^U[A-Z0-9]+$/)) {
    return NextResponse.json({ error: 'Invalid Slack user ID format' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://slack.com/api/users.info?user=${userId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Slack API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.ok && data.user) {
      const displayName = data.user.profile?.display_name || data.user.profile?.real_name || data.user.name || userId;
      
      return NextResponse.json({ 
        success: true, 
        displayName,
        userId 
      });
    } else {
      console.warn(`Slack API returned error for ${userId}:`, data.error);
      return NextResponse.json({ 
        error: `Slack API error: ${data.error}` 
      }, { status: 400 });
    }
  } catch (error) {
    console.error(`Failed to resolve Slack username for ${userId}:`, error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
} 