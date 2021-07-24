Vue.createApp({
    data(){
        return{
            record: [],
            operator: '',
            num1: '',
            num1Over:false,
            //flase:num1;true:num2
            num2: '',
            result: 0,
        };
    },
    methods: {
        getLocalStorageData(){
            //取出local Storage資料存入record
            this.record = JSON.parse(localStorage.getItem('record')) || [];
        },
        deleteRecord(index){
            //移除第index行
            this.record.splice(index,1);
            //儲存到local Storage
            localStorage.setItem('record', JSON.stringify(this.record));
        },
        addNum(item){
            if(this.num1Over){
                //如果num1輸入結束，則現在處理num2的值
                this.num2=this.num2*10+item;
            }
            else{
                //如果num1未輸入結束，則現在處理num1的值
                this.num1=this.num1*10+item;
            }
        },
        addOperator(operator){
            if(!this.num1) this.num1=0; //自動帶0
            if(!this.num2){ //num2未填，儲存operator，設定num1結束
                this.operator=operator;
                this.num1Over=true;
            }
            else {
                //num1 num2 operator皆有值，則計算
                this.calculate(false); 
                this.operator=operator;
            }
        },
        //計算結果：over=true=>按下計算圖案；false=false=>按下運算元，要繼續運算
        calculate(over){
            //先全部改為數字
            this.num1=Number(this.num1);
            this.num2=Number(this.num2);
            switch(this.operator){
                case "+":
                    this.result = (this.num1 + this.num2);
                    break;
                case "-":
                    this.result = (this.num1 - this.num2);
                    break;
                case "*":
                    this.result = (this.num1 * this.num2);
                    break;
                case "/":
                    if(!this.num1) 
                    {
                        alert("被除數不能為0");
                        return;
                    }
                    this.result = (this.num1 / this.num2).toFixed(2);
                    break;
                default: break;
            }
            //計入到record
            this.addRecord(over);
            if(over) 
            { //計算完成歸零
                this.num1 = '';
                this.num2 = '';
                this.num1Over=false;
                this.operator = '';
            }
            else{ //未完成，將結果存到num1，繼續運算
                this.num1=this.result;
                this.num2 = '';
            } 
        },
        //添加紀錄：over=true=>按下計算圖案；false=false=>按下運算元，要繼續運算
        addRecord: function(over){
            if(over){
                if(!this.num2 || !this.operator){
                    alert("資料不全");
                    return;
                }
            }
            else{
                if(!this.num1||!this.num2 || !this.operator) return;
            }   
            let str = `${this.num1} ${this.operator} ${this.num2} = ${this.result}`;
            this.record.unshift(str);
            //存入local Storage
            localStorage.setItem('record', JSON.stringify(this.record));
        },
        clearn(){ //清除所有待運算的資料
            this.num1='';
            this.num2='';
            this.num1Over=false;
            this.operator='';
        },
    },
    mounted(){
        this.getLocalStorageData();
    }
}).mount("#app");