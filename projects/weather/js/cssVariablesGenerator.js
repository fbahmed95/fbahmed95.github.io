const generateCSSVariable = (name, value) => {
    $("head").append(`<style>:root{ --${name} : ${value}}</style>`)
}