Vue.createApp({
    data(){
        return{
            data:[],
            //值由Ajax抓取，故設為空陣列。
            ImgType:2
            //0:模糊，1:中等，2:清楚
        };
    },
    mounted(){
        //由methods:createData掛載資料
        this.createData();
    },
    methods: {
        createData(){
            //使用axios套件，記得引入CDN
            /*根據資料How to use的說明：
                url: 'https://randomuser.me/api/',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                }
                得知url。axios回傳參數為data，並在Results中得知要娶的項目為results*/
            axios.get('https://randomuser.me/api?results=9')//get URL 且帶入參數
                //success時，設定data為回傳值.data.results
                .then((response)=>{this.data=response.data.results;})
                .catch((error) => {console.log(error.response)});//失敗回傳
        },
        changeResolution(){
            if(this.ImgType<0) this.ImgType=2;
            else this.ImgType--;
        }
    }
}).mount("#app");