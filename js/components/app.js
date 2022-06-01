import { TodoListModel } from './model/TodoListModel';
import { TodoItemModel } from './model/TodoItemModel';
import { element, render } from './view/html-util';

export class App {
    
    constructor() {
        // 開始時、todoリストの中身が空の状態に合わせるため初期化
        this.TodoListModel = new TodoListModel();
    }

    mount() {
        const formElement = document.getElementById('jsForm');
        const inputElement = document.getElementById('jsFormInput');
        const containerElement = document.getElementById('jsTodoList');
        const todoItemCountElement = document.getElementById('jsTodoCount');

        this.TodoListModel.onChange(() => {
            // todoアイテムをまとめるList要素
            const todoListElement = element`<ul />`;

            // それぞれのtodoItem要素をtodoListElement以下に追加する
            const todoItems = this.TodoListModel.getTodoItems();
            todoItems.forEach((item) => {
                // 追加するtodoアイテムの要素（li要素）を作成する
                // 完了済みならcheck要素をつけ、未完了なら外す
                const todoItemElement = item.completed
                ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s><button class="delete">x</button></li>`
                : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></li>`;
                // チェックボックスがトグルした時のイベントリスナー関数を登録
                const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
                // checkboxのチェックが変更された時に呼ばれるイベントリスナーを登録
                inputCheckboxElement.addEventListener('change', () => {
                    // 指定したTodoアイテムの完了状態を反転させる
                    this.TodoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    })
                });

                // buttonクラスがクリックされた時に、TodoListModelからアイテムを削除する
                const deleteButtonElement = todoItemElement.querySelector('.delete');
                deleteButtonElement.addEventListener('click', () => {
                    this.TodoListModel.deleteTodo({
                        id: item.id
                    });
                });

                todoListElement.appendChild(todoItemElement);
            });

            // コンテナ要素の中身を、todoリストにまとめるリスト要素で上書き
            render(todoListElement, containerElement);

            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.TodoListModel.getTotalCount()}`;
        });

        formElement.addEventListener('submit', (e) => {
            e.preventDefault();

            // 新しいtodoアイテムをtodoリストに追加する
            this.TodoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));

            // 入力値を空文字にしてリセット
            inputElement.value = "";
        });
    }
}