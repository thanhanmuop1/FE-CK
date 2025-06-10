// src/utils/priorityScore.ts

// Bảng điểm cộng theo khu vực
const areaScoreMap: Record<string, number> = {
    'kv1': 0.75,
    'kv2-nt': 0.5,
    'kv2': 0.25,
    'kv3': 0,
  };
  
  // Bảng điểm cộng theo đối tượng
  const groupScoreMap: Record<string, number> = {
    '01': 2,
    '02': 2,
    '03': 2,
    '04': 2,
    '05': 1,
    '06': 1,
    '07': 1,
    'none': 0,
  };
  
  export function getPriorityScore(priorityArea?: string, priorityGroup?: string): number {
    const areaScore = areaScoreMap[priorityArea || ''] || 0;
    const groupScore = groupScoreMap[priorityGroup || ''] || 0;
    return areaScore + groupScore;
  }
  
  