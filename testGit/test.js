
class Calculator {
  constructor(defaultText = "Биться головой больно") {
    this.defaultText = defaultText;
    this.stringForEval = "";
    this.text = this.createAnswerText();
    this.isReturnDouble = false;
    this.isReturnDoubleToogle = document.getElementById("isDoubleReturn");
    this.init();
    
  }
  init(){
    this.createButtons();
    this.activateAllButtons();
    this.isReturnDoubleToogle.addEventListener("change",()=>{
      this.isReturnDouble = (this.isReturnDoubleToogle.checked) ? true : false;
      this.updateResult();
      console.log(this.isReturnDouble);
    })
    }

  createAnswerText() {
    const text = document.createElement("p");
    text.innerHTML = this.defaultText;
    document.body.append(text);
    return text;
  }

  createButtons() {
    const table = document.createElement("table");
    document.body.append(table);
    
    const buttons = [["+", "-", "*", "="], ["7", "8", "9", "/"], ["4", "5", "6", "delete"], ["1", "2", "3", "DeleteAll"]]
    for (let tr of buttons) {
      let row = table.insertRow(-1);
      for (let i = 0; i < tr.length; i++) {
        const cell = row.insertCell(i);
        const button = document.createElement("button");

        button.innerHTML = tr[i];
        button.className = "Buttons";

        cell.appendChild(button);
      }
    }
  }

  activateAllButtons() {
    const buttons = document.getElementsByClassName("Buttons");
    for (let i = 0; i < buttons.length; i++) {
      switch (buttons[i].innerHTML) {
        case "delete":
          buttons[i].addEventListener("click", () => this.deleteLast());
          break;

        case "DeleteAll":
          buttons[i].addEventListener("click", () => this.deleteAll());
          break;

        case "=":
          buttons[i].addEventListener("click", () => this.returnValue());
          break;
        default:
          buttons[i].addEventListener("click", () => this.addToString(buttons[i]));

      }

    }
  }

  updateResult() {
    if(this.isReturnDouble){
      this.text.innerHTML = eval(this.stringForEval).toString(2);
      return;
    }
    this.text.innerHTML = this.stringForEval;
    if(this.text.innerHTML == ""){
      this.text.innerHTML = this.defaultText;
    }
  }

  addToString(target = undefined) {
    this.stringForEval += target.innerHTML;
    this.updateResult();
  }

  returnValue() {
    this.stringForEval = eval(this.stringForEval);
    this.updateResult();
  }

  deleteAll() {
    this.stringForEval = "";
    this.updateResult();
  }

  deleteLast() {
    this.stringForEval = this.stringForEval.slice(0, this.stringForEval.length - 1);
    this.updateResult();
  }
}

calc = new Calculator();


