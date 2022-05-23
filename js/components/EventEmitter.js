export class EventEmitter {
    constructor() {
        // 登録する[イベント名、Set（リスナー関数）]を管理するMap
        this.listeners = new Map();
    }

    /**
     * 指定したイベントが実行された時に呼び出されるリスナー関数を登録
     * @param {String} type イベント名
     * @param {Function} listener イベントリスナー
     */
    addEventListener(type, listener) {
        // 指定したイベントに対応するSetを作成し、リスナー関数を登録
        if (!this.listeners.has(type)) this.listeners.set(type, new Set());
        const listenersSet = this.listeners.get(type);
        listenersSet.add(listener);
    }
    
    /**
     * 指定したイベントをディスパッチする
     * @param {String} type イベント名
     */
    emit(type) {
        // 指定したイベントに対応するSetを呼び出し、全てのリスナー関数を呼び出す
        const listenerSet = this.listeners.get(type);
        if (!listenerSet) return;
        listenerSet.forEach(listener => {
            listener.call(this);
        });
    }

    /**
     * 指定したイベントのイベントリスナーを解除
     * @param {String} type イベント名
     * @param {Function} listener イベントリスナー
     */
    removeEventListener(type, listener) {
        // 指定したイベントに対応するSetを呼び出し、該当するリスナー関数を解除する
        const listenerSet = this.listeners.get(type);
        if (!listenerSet) return;
        listenerSet.forEach((ownListener) => {
            if (ownListener === listener) listenerSet.delete(listener);
        })

    }
}