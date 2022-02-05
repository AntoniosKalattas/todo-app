const { spawn } = require('child_process');
const fs = require('fs')

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})