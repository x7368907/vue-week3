const { createApp } = Vue;
const url = "https://vue3-course-api.hexschool.io/v2";
const path = "lee-ren";
let productModal = null;

const app = {
    data(){
        return{
            products:[],
            tempProduct:{
                imageUrl:[],
            },
            isNew: false,//確認是編輯或新增所使用
        }
    },
    methods: {
        checkLogin(){
            axios.post(`${url}/api/user/check`)
            .then((res) => {
                this.getData();
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                window.location = 'login.html';
            })
        },
        getProduct(){
            axios.get(`${url}/api/${path}/admin/products/all`)
            .then((res) => {
                this.products = res.data.products;
                console.log(this.products);
            })
            .catch((err) => {
                alert(err.res.data.message);
            })
        },
        openModal(status,item){
           if(status === "new"){
            productModal.show();
            this.isNew = true;
            //會帶入初始化資料
            this.tempProduct = {
                imageUrl: [],
            }
           }else if(status === "edit"){
            productModal.show();
            this.isNew = false;
            //會帶入當前要編輯的資料
            this.tempProduct = { ...item};
           }else if(status === "delete"){
            this.tempProduct = { ...item};
            delProductModal.show();
           }
            console.log(status);
        },
        updateProduct(){
            let site = `${url}/api/${path}/admin/product`;
            //用this.isNew判斷API如何運行
            let http = 'post';

            if(!this.isNew) {
                site = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
                http = 'put'
            }

            axios[http](site,{ data: this.tempProduct})
            .then((res) => {
                console.log(res);
                this.getProduct();
                productModal.hide();

            })
            .catch((err) => {
                console.log(err);
            })
        },
       delProduct(){
        const webSite = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
            axios.delete(webSite)
            .then((res) => {
                delProductModal.hide();
                this.getData();
              })
            .catch((err) => {
              })
        },
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
          },
        
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common["Authorization"] = token;
        this.getProduct();

        //bootstrap 方法
        productModal = new bootstrap.Modal('#productModal');
        // productModal.show();//確保他會動
        delProductModal = new bootstrap.Modal('#delProductModal');
    },
}

createApp(app).mount('#app')
