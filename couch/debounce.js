function debounce(proc, wait) {
    var timeout = null;
    var lastCall;
    return function () {
        lastCall = Date.now();
        function wrapped() {
            var napping = Date.now() - lastCall;
            if (napping < wait) {
                timeout = setTimeout(wrapped, wait - napping);
            }
            else {
                timeout = null;
                proc();
            }
        }
        if (!timeout) {
            timeout = setTimeout(wrapped, wait);
        }
    };
}
