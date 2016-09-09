function debounce(proc: () => void, wait: number): () => void {
    let timeout: number | null = null
    let lastCall: number

    return function () {
        lastCall = Date.now()

        function wrapped() {
            const napping = Date.now() - lastCall

            if (napping < wait) {
                timeout = setTimeout(wrapped, wait - napping)
            }
            else {
                timeout = null
                proc()
            }
        }

        if (!timeout) {
            timeout = setTimeout(wrapped, wait)
        }
    }
}
