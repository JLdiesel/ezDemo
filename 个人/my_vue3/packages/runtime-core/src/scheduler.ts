const queue = new Set<() => unknown>();

let isFlushing = false;
const resolvePromise = Promise.resolve();
export function queueJob(job: () => void) {
  queue.add(job);
  if (!isFlushing) {
    isFlushing = true;
    resolvePromise.then(() => {
      isFlushing = false;

      const effectsToRun = new Set(queue);
      queue.clear();
      effectsToRun.forEach((cb) => cb());
      effectsToRun.clear();
    });
  }
}
