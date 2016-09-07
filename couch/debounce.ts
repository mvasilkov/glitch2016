function debounce(proc: () => void, wait: number): () => void {
    let timeout: number | undefined = undefined
    let lastCall: number

    return function () {
        lastCall = Date.now()

        function wrapped() {
            const napping = Date.now() - lastCall

            if (napping < wait) {
                timeout = setTimeout(wrapped, wait - napping)
            }
            else {
                timeout = undefined
                proc()
            }
        }

        if (!timeout) {
            timeout = setTimeout(wrapped, wait)
        }
    }
}
