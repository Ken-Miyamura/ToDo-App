import { EventEmitter } from '../EventEmitter';

export class TodoListModel extends EventEmitter {
    
    /**
     * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
     */
    constructor(items = []) {
        super();
        this.items = items;
    }

    /**
     * Todoアイテムの合計個数を返す
     * @returns {Number}
     */
    getTotalCount() {
        return this.items.length;
    }

    /**
     * 表示できるTodoアイテムの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems() {
        return this.items;
    }

    /**
     * Todoリストの状態が更新された時に呼び出されるリスナー関数を登録
     * @param {Function} listener
     */
    onChange(listener) {
        this.addEventListener("change", listener);
    }

    /**
     * 状態が変更された時に、登録済みのリスナー関数を呼び出す
     */
    emitChange() {
        this.emit("change");
    }

    /**
     * Todoアイテムを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        this.items.push(todoItem);
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemのcompletedを更新する
     * @param {{id: number, completed: boolean}}
     */
    updateTodo({id, completed}) {
        // idが一致するtodoアイテムを見つけ、あるなら完了状態の値を更新
        const todoItem = this.items.find((todo) => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemを削除する
     * @param {{id}}
     */
    deleteTodo({id}) {
        this.items = this.items.filter((todo) => {
            return todo.id !== id;
        });
        this.emitChange();
    }
}