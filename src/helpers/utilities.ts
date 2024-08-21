export const compareServer = (s1: any, s2: any): number => {
  if (s1.priority < s2.priority) return -1;
  if (s1.priority > s2.priority) return 1;
  return 0;
};