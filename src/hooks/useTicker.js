export default function useTicker(step = 10, delay = 100) {
    let interval = null;
    const startTicker = (cb) => {
        interval = setInterval(() => {
            cb(step);
            if ( step >= 80 ) {
                return;
            }
            step += 10;
        }, delay);
    }
    const completeTicker = (cb) => {
        cb();
        clearInterval(interval);
    }
    return [startTicker, completeTicker]
}