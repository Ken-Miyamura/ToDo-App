
import { App } from './components/app';

const app = new App();
app.mount();




// // 呼び出し方によって受け取る引数の形式が変わる
// function stringRaw(strings, ...values) {
//     return strings.reduce((accumulator, currentValue, currentIndex) => {
//         console.log(accumulator + values[currentIndex - 1] + currentValue);
//         return accumulator + values[currentIndex - 1] + currentValue;
//     })
//     // stringsは文字列のパーツが${}で区切られた配列となる
//     console.log(strings); // => ["template "," literal ",""]
//     // valuesには${}の評価値が順番に入る
//     console.log(values); // => [0, 1]
// }
// // ()をつけずにテンプレートを呼び出す
// stringRaw`template ${0} literal ${1}`;