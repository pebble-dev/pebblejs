import { PebbleJS } from "./pebblejs";


Pebble.addEventListener("ready", () => {
    const pebbleJS = new PebbleJS();
    const ui = pebbleJS.UI();
    
    let card = ui.Card("Hello World", "This is a subtitle", "This is the body text");
    card.show();


   
});
