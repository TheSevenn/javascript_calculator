// variables 
let input=document.querySelector('.input');
let result=document.querySelector('#result');

//  keys and button
let clearAll=document.querySelector('.clear-All');
let clear=document.querySelector('.clear');
let number=document.querySelectorAll('.num');
let operator=document.querySelectorAll('.operator');
let equals=document.querySelector('.equals');

// variables and arrays
let newNum="";
let oldNum="";
let tempValue=""; // to store result from multiply and divide opeartion
let inputArray=[];
let operatorFlag=false; // keeps note of if operator is clicked 
let solvedResult="";
let display=""; // string varibale to store the complete expression
let afterResultFlag=false; // flag to prevent input after equal is pressed
let numFlag=false;


let underLine=document.querySelector(".under-line");
// let resultDisplay=document.querySelector(".result-display");

// when a number is clicked put it in a variable and append to this to an  string
// until an operator is pressed 
let num;
for(let i=0;i<number.length;i++)
{
    number[i].addEventListener('click',()=>{
        if(afterResultFlag==false){
        if(operatorFlag==true) // chechk if operator was clicked
       {
        oldNum=newNum;
        inputArray.push(oldNum); // if operaotr clicked place last input value to array
        oldNum=""; // reset the oldNum to empty string 
        newNum=number[i].getAttribute('data-val'); // get the value from attribute of number clicked
        operatorFlag=false;  // set flag to false since a number is clicked
       
        console.log('number pressed');
        console.log(inputArray);
       }
     else {
         newNum+=number[i].getAttribute('data-val');
         operatorFlag=false;
     }
       input.textContent=newNum;
        console.log(`${newNum} clicked`);

       updateExpression();
       input.textContent=display;
       numFlag=true;
       }  // end of block for afterresultFlag
    }); // end of call back function

}

// when operator is pressed put last input in different variable 
// and check for the precedence of operator and take next input
let opt;
let k;
for(let j=0;j<operator.length;j++)
{
    operator[j].addEventListener('click',()=>{
        if(afterResultFlag==false){
            if(numFlag==true){
            if(operatorFlag==false){
        oldNum=newNum; // store the last num enetered 
        inputArray.push(oldNum);
    if(inputArray.includes("/"))
    {
          k=inputArray.indexOf("/");
          console.log(k);
          (tempValue)=(inputArray[k-1])/(inputArray[k+1]);
          tempValue=tempValue.toString();
          console.log(inputArray[k-1]);
          console.log(inputArray[k]);
          console.log(inputArray[k+1]);
          for(let m=0;m<3;m++)
          inputArray.pop(); 
             
       
       
          console.log(`the value is ${tempValue};`);
          inputArray.push(tempValue);
    }
    if(inputArray.includes("*"))   
     {    
          k=inputArray.indexOf("*")   
          tempValue=parseFloat(inputArray[k-1])*parseFloat(inputArray[k+1]);
          tempValue=tempValue.toString();
          for(let m=0;m<3;m++)
          inputArray.pop(); 
       
          console.log(`the value is ${tempValue};`);
          inputArray.push(tempValue);
     }
       
    
        
        newNum=operator[j].getAttribute('data-opt'); // get the value of operator clicked
        operatorFlag=true;  // since an operator is clicked set flag to true
       
/* { code for case of multiply and divide}    */

        console.log('operator clicked');
        opt=operator[j].getAttribute('data-opt');
        console.log(`${opt} clicked`);


        // input.textContent=newNum;
        updateExpression();
        input.textContent=display;
    }
}
    }
    });
}

// when AllClear is clicked add event to clear in previous inputs.
clearAll.addEventListener('click',()=>{
    inputArray=[];
    newNum="";
    oldNum="";
    display="";
    input.textContent="";
    result.textContent="";
    console.log('All cleared');
    afterResultFlag=false;
    input.style.fontSize="6rem";
    input.style.color="rgb(0,0,0)";
    underLine.style.display="none";
    result.style.fontSize="0";
    // resultDisplay.style.border="3px solid rgba(0, 0, 0, 0.2)";
});


// when clear is clicked add event to delete last entered input
clear.addEventListener('click',()=>{
    if(afterResultFlag==false){
    newNum=newNum.slice(0,newNum.length-1);
    if(operatorFlag==true)
    operatorFlag=false;
    console.log(newNum);
    console.log('cleared once');
    // input.textContent=newNum;
    clearExp();
    input.textContent=display;
    }
});
//  when equals is clicked ,event for result  

equals.addEventListener('click',()=>{
    
    console.log('Result solved');
    // logic for calculation
inputArray.push(newNum);
if(afterResultFlag==false){
    if(numFlag==true){   // for preventing clicking of eqaul before any num is pressed
if(inputArray.length>0&&inputArray.length%2!=0){
console.log(inputArray);

// temp code

    if(inputArray.includes("/"))
        {
              k=inputArray.indexOf("/");
              console.log(k);
              (tempValue)=(inputArray[k-1])/(inputArray[k+1]);
              console.log(inputArray[k-1]);
              console.log(inputArray[k]);
              console.log(inputArray[k+1]);
              for(let m=0;m<3;m++)
              inputArray.pop(); 
                 
           
           
              console.log(`the value is ${tempValue};`);
              inputArray.push(tempValue);
        }
        if(inputArray.includes("*"))   
         {    
              k=inputArray.indexOf("*")   
              tempValue=parseFloat(inputArray[k-1])*parseFloat(inputArray[k+1]);
              for(let m=0;m<3;m++)
              inputArray.pop(); 
           
              console.log(`the value is ${tempValue};`);
              inputArray.push(tempValue);
         }
        
    // end of temp code

let i=1; // operator is alwways at odd place (1,3,5..)
while(inputArray.length!=1)  // until there is only one element in Array (Array is totally calculated)
{
    for(;i<inputArray.length;i+2){
        oldNum=parseFloat(inputArray[i-1]); // operand 1 ( one index before the operator)
        newNum=parseFloat(inputArray[i+1]); // operand 2 ( one index after the operator)
        if(inputArray[i]=="+") // if operator is "+"
        tempValue=oldNum+newNum;

        else if(inputArray[i]=="-") // if operator is "-"
        tempValue=(oldNum)-(newNum);
        
        for(let j=0;j<3;j++)
        inputArray.shift();  // delete the first 3 index that are solved now (2 operands and 1 operator)
        tempValue=tempValue.toString();
        inputArray.unshift(tempValue); // add the calculated value in start of the array
        newNum="";
        oldNum="";
      
    }
}

console.log(inputArray.length);
     console.log(inputArray);
     solvedResult=inputArray[0];
     inputArray=[];
     result.textContent=`= ${solvedResult}`;
     result.style.fontSize="6rem";
     input.style.fontSize="2.5rem";
     input.style.color="rgba(0,0,0,0.6)";
     underLine.style.display="inline";
    //  resultDisplay.style.border="3px solid rgba(60,179,113,0.5)";
}
     afterResultFlag=true;

}
}
});


/*
function updateInput(){
    let node=document.createElement('span');
    let text=document.createTextNode(newNum);
    node.appendChild(text);
    input.appendChild(node);
}

*/

// function for storing the complete updated expression string

function updateExpression(){
display+=newNum[newNum.length-1];
}

// function for deleting the last input when clear is clicked
function clearExp(){
    display=display.slice(0,newNum.length-1);
}
