let ids = 0;

export class TodoItemModel {
    /**
     * @param {String} title Todoアイテムのタイトル
     * @param {Boolean} completed Todoアイテムが完了か否か
     */
    constructor({title, completed}) {
        this.id = ids++;
        this.title = title;
        this.completed = completed;
    }
}