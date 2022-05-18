export class App {
    mount() {
        const formElement = document.getElementById('jsForm');
        const inputElement = document.getElementById('jsFormInput');
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(`入力値の値：${inputElement.value}`);
        })
    }
}