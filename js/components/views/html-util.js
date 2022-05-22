// 特殊な記号に対するエスケープ処理
 export function escapeSpecialChars(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/**
 * HTML文字列から、elementを作成して返す
 * @param {string} html
 */
export function htmlToElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstElementChild;
}

/**
 * HTMl文字列から、DOM,Nodeを作成して返すタグ関数
 * @param {Element}
 */
export function element(strings, ...values) {
    const htmlString = strings.reduce((accumulator, currentValue, currentIndex) => {
        const value = values[currentIndex - 1];
        if (typeof value === "string") {
            return accumulator + escapeSpecialChars(value) + currentValue;
        } else {
            return accumulator + String(value) + str;
        }
    });

    return htmlToElement(htmlString);
}

/**
 * コンテナ要素(親の要素)の中身をHTML要素で上書きする
 * @param {element} bodyElement コンテナ要素の中身となる要素
 * @param {element} containerElement コンテナ要素
 */
export function render(bodyElement, containerElement) {
    // containerElementの中身を空にする
    containerElement.innerHTML = "";
    // containerElementの直下にbodyElementを追加する
    containerElement.appendChild(bodyElement);
}