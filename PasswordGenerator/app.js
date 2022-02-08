function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getRandomSymbol(){
    const symbols="!^+%&/()=?@£#${}[].,;<>";
    return symbols[Math.floor(Math.random()*symbols.length)];
}

const randomFuncs={
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol,
};

const generate=document.getElementById("generateBtn");

generate.addEventListener('click',()=>{
    const length=document.querySelector('#passwordLength').value;
    const hasUpper=document.querySelector('#uppercase').checked;
   const hasLower=document.querySelector('#lowercase').checked;
   const hasNumber=document.querySelector('#numbers').checked;
   const hasSpecial=document.querySelector('#specialChars').checked;
   const result=document.querySelector('#result');
   result.innerHTML=generatePassword(
            hasLower,
            hasUpper,
            hasNumber,
            hasSpecial,
            length
   );

});

function generatePassword(lower,upper,number,symbol,length){
    let generatedPassword="";
    const typeCount=lower+upper+symbol+number;
    const typesArr=[{lower},{upper},{number},{symbol}].filter(
        (item)=>Object.values(item)[0]
    );

    for(let i=0;i<length;i+=typeCount){
        typesArr.forEach((type)=>{
            const funcName=Object.keys(type)[0];
            generatedPassword+=randomFuncs[funcName]();
        });
    }

    const finalPassword=generatedPassword.slice(0,length);
    return finalPassword;
}

let button=document.querySelector('#clipboardBtn');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    let copyText=document.querySelector('#result');
    copyText.select();
    navigator.clipboard
        .writeText(copyText.value)        
        .then(()=>{
            alert("Successfully Copied!");
        })
        .catch(()=>{
            alert("Something went wrong.");
        });
});