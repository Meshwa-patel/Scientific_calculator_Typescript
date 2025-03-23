// class for binary operators
class CalculateBinary{
    constructor(private number1:number, private number2:number) {
    }
    addition(){
        return this.number1 + this.number2;
    }
    substract(){
        return this.number1 - this.number2;
    }
    multiply(){
        return this.number1 * this.number2;
    }
    divide(){
        return this.number1 / this.number2;
    }
    power(){
        return Math.pow(this.number1,this.number2);
    }
    modulus(){
        return this.number1 % this.number2;
    }
}

// class for pi and e
class Calculate{
    pi(){
        return Math.PI;
    }
    e(){
        return Math.E;
    }
}

// class foe unary operators
class CalculateUnary{
    constructor(private number:number) {
    }
    factorial(){
        let number = this.number;
        let fac = 1;
        if(number === 0){
            return 1;
        }
        for(let i =1 ; i <= number ; i++){
            fac = fac*i;
        }
        return fac;
    }
    squareroot() {
        return Math.sqrt(this.number);
    }
    sin(){
        return Math.sin(this.number);
    }
    cos(){
        return Math.cos(this.number);
    }
    tan(){
        return Math.tan(this.number);
    }
    abs(){
        return Math.abs(this.number);
    }
    log(){
        return Math.log10(this.number);
    }
    ln(){
        return Math.log(this.number);
    }
    asin(){
        return Math.asin(this.number);
    }
    acos(){
        return Math.acos(this.number);
    }   
    atan(){
        return Math.atan(this.number);
    } 
    sinh(){
        return Math.sinh(this.number);
    }
    cosh(){
        return Math.cosh(this.number);
    }
    tanh(){
        return Math.tanh(this.number);
    }
    asinh(){
        return Math.asinh(this.number);
    }
    acosh(){
        return Math.acosh(this.number);
    }
    atanh(){
        return Math.atanh(this.number);
    }
}
export {Calculate,CalculateBinary,CalculateUnary}