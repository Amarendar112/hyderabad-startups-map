import { NextResponse } from 'next/server';
import { AtsService } from '@/lib/atsService';
import { INITIAL_STARTUPS } from '@/data/startups';
import { Startup } from '@/types/startup';

/**
 * GET /api/ats/sync
 * Server-side API endpoint to sync ATS jobs for all configured startups (Greenhouse, Lever, Ashby)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetStartupId = searchParams.get('startupId');

    // Startup dataset
    let targetStartups: Startup[] = INITIAL_STARTUPS;
    if (targetStartupId) {
      targetStartups = INITIAL_STARTUPS.filter((s) => s.id === targetStartupId);
    }

    const syncResults: { startupId: string; startupName: string; provider?: string; count: number }[] = [];
    const allFetchedJobs = [];

    for (const startup of targetStartups) {
      if (startup.atsConfig && startup.atsConfig.enabled && startup.atsConfig.provider !== 'none') {
        const jobs = await AtsService.fetchJobsForStartup(startup);
        syncResults.push({
          startupId: startup.id,
          startupName: startup.name,
          provider: startup.atsConfig.provider,
          count: jobs.length,
        });
        allFetchedJobs.push(...jobs);
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      syncedStartupsCount: syncResults.length,
      totalActiveJobsCount: allFetchedJobs.length,
      details: syncResults,
      jobs: allFetchedJobs,
    });
  } catch (error: any) {
    console.error('Error in /api/ats/sync:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ats/sync
 * Sync ATS jobs for a specific startup payload sent by Admin Dashboard
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { startup, atsConfig } = body;

    if (!startup || !atsConfig) {
      return NextResponse.json({ success: false, error: 'Missing startup or atsConfig payload' }, { status: 400 });
    }

    const updatedStartup: Startup = {
      ...startup,
      atsConfig,
    };

    const jobs = await AtsService.fetchJobsForStartup(updatedStartup);

    return NextResponse.json({
      success: true,
      startupId: startup.id,
      provider: atsConfig.provider,
      boardId: atsConfig.boardId,
      activeJobsCount: jobs.length,
      jobs,
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in POST /api/ats/sync:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
