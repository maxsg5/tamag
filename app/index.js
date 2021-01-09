import { setup, next } from 'fitbit-views';
import view1 from './views/view1';
import document from "document";
//import view2 from './views/view-2';

setup({
	'view': null,
    'view1': view1,
	'view-2': view2,
});

let list = document.getElementById("myList");
let items = list.getElementsByClassName("list-item");



items.forEach((element, index) => {
    let touch = element.getElementById("touch");
    touch.addEventListener("click", (evt) => {
      console.log(`touched: ${index}`);
      next('view1');
    });
  });





