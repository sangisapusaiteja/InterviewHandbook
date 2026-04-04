export const PROGRESS_KEY_SEPARATOR = ":";

export function getTopicProgressKey(sectionSlug: string, topicSlug: string) {
  return `${sectionSlug}${PROGRESS_KEY_SEPARATOR}${topicSlug}`;
}

export function parseTopicProgressKey(key: string) {
  const separatorIndex = key.indexOf(PROGRESS_KEY_SEPARATOR);

  if (separatorIndex <= 0 || separatorIndex === key.length - 1) {
    return null;
  }

  return {
    sectionSlug: key.slice(0, separatorIndex),
    topicSlug: key.slice(separatorIndex + 1),
  };
}

export function getSectionSlugFromBasePath(basePath: string) {
  return basePath.replace(/^\/+/, "");
}

export function countCompletedTopicsForSection(
  completedTopics: string[],
  sectionSlug: string
) {
  const prefix = `${sectionSlug}${PROGRESS_KEY_SEPARATOR}`;

  return completedTopics.filter((topicKey) => topicKey.startsWith(prefix))
    .length;
}

export type DailyActivityCount = {
  date: string;
  count: number;
};

export function recordProgressActivity(
  activityLog: string[] | undefined,
  at = new Date().toISOString()
) {
  const next = [...(activityLog ?? []), at];

  return next.slice(-365);
}

export function buildDailyActivity(activityLog: string[] | undefined) {
  const counts = new Map<string, number>();

  for (const entry of activityLog ?? []) {
    const date = new Date(entry);

    if (Number.isNaN(date.getTime())) {
      continue;
    }

    const key = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, count]) => ({ date, count }));
}

export function getProgressStreaks(dailyActivity: DailyActivityCount[]) {
  const activeDates = dailyActivity
    .map((entry) => new Date(`${entry.date}T00:00:00`))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((left, right) => left.getTime() - right.getTime());

  if (activeDates.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  let bestStreak = 1;
  let currentRun = 1;

  for (let index = 1; index < activeDates.length; index += 1) {
    const previous = activeDates[index - 1];
    const current = activeDates[index];
    const differenceInDays = Math.round(
      (current.getTime() - previous.getTime()) / 86_400_000
    );

    if (differenceInDays === 1) {
      currentRun += 1;
      bestStreak = Math.max(bestStreak, currentRun);
    } else if (differenceInDays > 1) {
      currentRun = 1;
    }
  }

  const today = new Date();
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = [
    yesterday.getFullYear(),
    String(yesterday.getMonth() + 1).padStart(2, "0"),
    String(yesterday.getDate()).padStart(2, "0"),
  ].join("-");

  const activeDateKeys = dailyActivity.map((entry) => entry.date);
  const lastActiveKey = activeDateKeys[activeDateKeys.length - 1];

  if (lastActiveKey !== todayKey && lastActiveKey !== yesterdayKey) {
    return { currentStreak: 0, bestStreak };
  }

  let currentStreak = 1;

  for (let index = activeDateKeys.length - 1; index > 0; index -= 1) {
    const current = new Date(`${activeDateKeys[index]}T00:00:00`);
    const previous = new Date(`${activeDateKeys[index - 1]}T00:00:00`);
    const differenceInDays = Math.round(
      (current.getTime() - previous.getTime()) / 86_400_000
    );

    if (differenceInDays === 1) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  return { currentStreak, bestStreak };
}

export function isSupportedThemePreference(
  value: string
): value is "light" | "dark" | "system" {
  return value === "light" || value === "dark" || value === "system";
}
