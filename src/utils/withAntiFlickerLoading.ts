export async function withAntiFlickerLoading(
  asyncFn: () => Promise<void>,
  startLoading: () => void,
  stopLoading: () => void,
  {
    delay = 500,
    minDuration = 300,
  }: { delay?: number; minDuration?: number } = {},
) {
  let loadingShown = false;
  let loadingStartTime = 0;

  const delayTimer = setTimeout(() => {
    loadingShown = true;
    loadingStartTime = Date.now();
    startLoading();
  }, delay);

  try {
    await asyncFn();
  } finally {
    clearTimeout(delayTimer);

    if (loadingShown) {
      const elapsed = Date.now() - loadingStartTime;
      const remaining = minDuration - elapsed;

      if (remaining > 0) {
        await new Promise((r) => setTimeout(r, remaining));
      }

      stopLoading();
    }
  }
}
