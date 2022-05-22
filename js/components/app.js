import {element, render} from './views/html-util';

export class App {
    mount() {
        const formElement = document.getElementById('jsForm');
        const inputElement = document.getElementById('jsFormInput');
        const containerElement = document.getElementById('jsTodoList');
        const todoItemCountElement = document.getElementById('jsTodoCount');
        // todoアイテムをまとめるList要素
        const todoListElement = element`<ul />`;
        // 表示されているtodoアイテムの数
        let todoItemCount = 0;

        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(`入力値の値：${inputElement.value}`);
            // 追加するtodoアイテムの要素（li要素）を作成する
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            // todoアイテムをtodoListElementに追加
            todoListElement.appendChild(todoItemElement);
            // コンテナ要素の中身を、todoリストにまとめるリスト要素で上書き
            render(todoListElement, containerElement);
            // todoアイテムを+1し、表示されてるテキストを更新
            todoItemCount += 1;
            todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
            // 入力値を空文字にしてリセット
            inputElement.value = "";
        });
    }
}